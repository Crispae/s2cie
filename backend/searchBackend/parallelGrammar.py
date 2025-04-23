"""
Module handles the parallel grammar based information extraction

"""

import concurrent
import requests

from searchBackend.parallelSearch import DistributedSearch


        
class DistributedGrammar(DistributedSearch):
    """
        Send request to multiple index server parallely

    """
    def __init__(self,config) -> None:
        self.grammar_endpoint = "api/execute/grammar"
        
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
        
        self.headers = {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                        }

    def response_processor(self, response):
        """
            Transforming the response in the format of search api endpoint

        """

        duration = response.get("total_hits_duration")
        query = response.get("query")
        count = response.get("total_hits_count")
        complete = True
        total_hits = [item for key,value in response.get("total_hits").items() for item in value] ## Here they have match not matches
     

        ##TODO: Fix match/matches in frontend

        return {"complete":complete,
                "query":query,
                "count":count,
                "duration":duration,
                "scores":None,
                "total_hits":total_hits,
                "is_error":response.get("is_error"),
                "error_message":response.get("error_messages")
                }

    


        pass
        
    def query(self, url, search_query,maxDocs,triggerOverlap):
        """
            Pass Grammar query to this single endpoint

        """

        try:
            encoded_search_query = {
                        "grammar": search_query,
                        "maxDocs": maxDocs,
                        "allowTriggerOverlaps":triggerOverlap}
            
            search_url = f"{url}{self.grammar_endpoint}"  ## Final encoded query for search

            ## no encoding of response required
            response = requests.post(search_url,
                                     json=encoded_search_query,
                                     headers=self.headers)

            ## error in response.json will be catched by exception
            return {"status":"success","response":response.json()}

        except Exception as e:
            return {"status":"fail","response":{},"error_message": str(e)}
        
    def parallel_search(self, query_string,maxDocs,triggerOverlap):
        """
        Send reqest to multiple endpoints parallely and reterive the result from there.
        """

        total_hits = {}  ## key will be port and value as list of hit document
        total_duration = 0
        total_hits_count = 0
        error_messages = None
        is_error = False

        with concurrent.futures.ThreadPoolExecutor() as executor:

            ### TODO: Provide flexible option for Variable URL as well
            futures = {
                    executor.submit(self.query,
                                    url,
                                    query_string,
                                    maxDocs,
                                    triggerOverlap): url for url in self.urlList
                }

            for future in concurrent.futures.as_completed(futures):
                port = futures[future]

                try:
                    response = future.result()

                    if response.get("status") == "success":

                        response = response.get("response",{})
                        ## Total time taken
                        duration = response.get("duration") ## Time taken for the search
                        total_duration += duration

                        ## Total hits count
                        mentions = response.get("mentions")

                        ## Total number of hits
                        hits = len(mentions)
                        total_hits_count += hits
                        
                        total_hits[port] = mentions
                        
                        print(
                            f"Search on endpoint {port} completed. Hits: {hits}, Duration: {duration}"
                        )
                    
                    else:
                        error_messages = response.get("error_message")
                        is_error = True

                except Exception as e:
                    print(f"Error processing results from endpoint {port}: {e}")

        return {"total_hits": total_hits,
                "query": query_string,
                "total_hits_count": total_hits_count,
                "total_hits_duration":total_duration,
                "error_messages":error_messages,
                "is_error":is_error}
    
    def search(self, query_string,maxDocs,triggerOverlap):
        """
        public facing interface

        """
        return self.response_processor(self.parallel_search(query_string,maxDocs,triggerOverlap))
