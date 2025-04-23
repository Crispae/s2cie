import concurrent.futures
from urllib.parse import urlencode
import requests


class DistributedSearch:

    def __init__(self) -> None:

        self.health_check_endpoint = "api/healthcheck"
        self.search_endpoint = "api/execute/pattern" ## For basic search
        self.urlList = []

    def health_check(
        self,
    ):
        """Check the status of each sharded endpoint."""
        ## URLList as config
        for endpoint in self.urlList:
            health_endpoint = f"{endpoint}{self.health_check_endpoint}"
            try:
                response = requests.get(health_endpoint)
                response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
                print(f"{endpoint} status code: {response.status_code}")
            except requests.RequestException as e:
                print(f"{endpoint} failed with exception: {e}")

    def response_processor(self, response):
        """
        process the response to according to api
        """

        ## Handle the case, when the there is no response lef
        #print(response)

        ## respose
        last_score = {}  ## port as key
        total_hits = []
        for key, value in response.items():

            ## If th length of response is zero then continue
            if len(value) == 0:
                continue
            ## total
            total_hits.extend(value)
            last_score[key] = {
                "sentenceId": value[-1].get("sentenceId"),
                "score": value[-1].get("score"),
            }

        ## send the response
        return {"scores": last_score, "total_hits": total_hits}

    def query(self, url, search_query, prevData=None):
        """
        search query at single endpoint.

        """

        if prevData:  ## handles pagination
            encoded_search_query = urlencode(
                {
                    "odinsonQuery": search_query,
                    "prevDoc": prevData.get(
                        "sentenceId"
                    ),  ## extract info from last response
                    "prevScore": prevData.get("score"),
                }
            )

        else:  ## first and direct search
            encoded_search_query = urlencode({"odinsonQuery": search_query})

        search_url = f"{url}{self.search_endpoint}?{encoded_search_query}"  ## Final encoded query for search

        try:
            ## FIXME: Add timeout- of around 600sec
            response = requests.get(search_url)

            if response.status_code == 200:
                return response.json()
        except Exception as e:
            print(f"Error querying endpoint {url}: {e}")

    def parallel_search(self, query_string, prevData=None):
        """
        Send reqest to multiple endpoints parallely and reterive the result from there.
        """

        total_hits = {}  ## key will be port and value as list of hit document
        total_duration = 0
        total_hits_count = 0

        with concurrent.futures.ThreadPoolExecutor() as executor:

            ### TODO: Provide flexible option for Variable URL as well
            if prevData:
                ## pass the prevData
                ## TO also include the Variable
                futures = {
                    executor.submit(self.query, url, query_string, prevData[url]): url
                    for url in prevData.keys()
                }
            else:
                ## Just pass the port number
                futures = {
                    executor.submit(self.query, url, query_string): url
                    for url in self.urlList
                }

            for future in concurrent.futures.as_completed(futures):
                port = futures[future]
                try:
                    response = future.result()

                    if response:
                        duration = round(response.get("duration"), 2)
                        total_duration += duration
                        hits = response.get("totalHits")
                        total_hits_count += hits
                        score_docs = response.get("scoreDocs")
                        total_hits[port] = score_docs
                        print(
                            f"Search on endpoint {port} completed. Hits: {hits}, Duration: {duration}"
                        )
                except Exception as e:
                    print(f"Error processing results from endpoint {port}: {e}")

        return total_hits, total_hits_count, total_duration

    def search(self, query_string, prevData=None):
        """
        Direct interface for public endpoint

        """

        if prevData:
            ## exract the result from multiple endpoints
            resp, count, duration = self.parallel_search(
                query_string=query_string, prevData=prevData
            )
        else:
            ## exract the result from multiple endpoints
            resp, count, duration = self.parallel_search(query_string=query_string)

        ## Processing the information for output
        processed_response = self.response_processor(response=resp)

        processed_response["count"] = count
        processed_response["duration"] = duration
        processed_response["query"] = query_string

        ## Also add the key: value pair to show, if all the data are loaded or not
        ## Instead of reloading option, we can setup of
        if (
            len(processed_response["scores"]) == 0
            and len(processed_response["total_hits"]) == 0
        ):
            processed_response["complete"] = True
        else:
            processed_response["complete"] = False

        return processed_response


class DistributedPortSearch(DistributedSearch):
    """
    class handles the distributed search if instance are running on single instance with multiple ports.

    """

    def __init__(self, config) -> None:
        super().__init__()

        if not config:
            raise ValueError("Config not provided")
        self.config = config
        self.urlList = [
            self.config["baseURL"] + f"{port}/" for port in self.config["portList"]
        ]


class DistributedURLSearch(DistributedSearch):
    """
    Class handles the distributed search if index are running on multiple servers

    """

    def __init__(self, config) -> None:
        super().__init__()

        if not config:
            raise ValueError("Config not provided")
        self.config = config

        ## Assigning default port of each instance
        if self.config.get("defaultPort"):
            self.deafult_port = self.config.get("defaultPort")
        else:
            self.deafult_port = 9000

        ## If need we can also add Default port id
        self.urlList = [
            f"http://{url}:{self.deafult_port}/" for url in self.config["urlList"]
        ]


class DistributedCustomSearch(DistributedSearch):
    """
    Class Handles the distributed search if index are running on multiple servers

    """

    def __init__(self, config) -> None:
        super().__init__()

        if not config:
            raise ValueError("Config not provided")
        self.config = config

        ## Loading array of IP and ports of index server
        if self.config.get("serverAddressList"):
            self.urlList = [
                f"http://{url}/" for url in self.config.get("serverAddressList")
            ]
        else:
            raise ValueError("serverAddressList not provided")


if __name__ == "__main__":

    ## Configuration
    config = {
        "urlList": ["127.0.0.1", "127.0.0.1", "127.0.0.1"],
        "defaultPort": 9000,
        "serverAddressList": ["127.0.0.1:400", "127.0.0.1:500", "127.0.0.1:5000"],
    }

    ## Testing
    searchSystem = DistributedCustomSearch(config)
    searchSystem.health_check() ## Check the reachability to the server

