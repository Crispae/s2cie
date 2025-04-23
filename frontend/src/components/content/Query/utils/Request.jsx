/***
 * 
 * Variable backend port captured from environment variable
 * 
 */
const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

/** 
 * 
 * FIXME: Improve this refrencing
 */
const API_ENDPOINT = BACKEND_ENDPOINT
const CONTEXT_API_ENDPOINT =  BACKEND_ENDPOINT
const ENTITIES_API_ENDPOINT =  BACKEND_ENDPOINT

export default function request(input) {

    let baseURL, method, headers;

    if (input["type"]=== "basic") {
        baseURL = API_ENDPOINT + "search"
        method = "POST"
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        /**
         * Request to backend for search
         * 
         */
        return $request(baseURL,
                        method,
                        headers,
                        input["request"],)



        /* It will a post method
        var queryParams = `odinsonQuery=${encodeURIComponent(input["odinsonQuery"])}`
        var method = "GET"
        var headers = {Accept:"application/json"}
        var url = `${baseURL}?${queryParams}`
        */

        /*return $request(url=url,method=method,headers=headers)*/

    }if(input["type"] === "grammar"){
        // Grammar endpoint
        baseURL = API_ENDPOINT +"grammar/"
        
        //let data = JSON.stringify({"odinsonQuery":input["odinsonQuery"]})
        // Process the information as per grammar endpoint

    }if(input["type"]=== "context"){

        // context endpoint
        baseURL = CONTEXT_API_ENDPOINT + "context"
        method = "POST"
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
        return $request(baseURL,
                        method,
                        headers,
                        input["request"],)

    }if(input["type"] === "entities"){
        baseURL = ENTITIES_API_ENDPOINT +"entities"
        method = "POST"
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };

        return $request(baseURL,
            method,
            headers,
            input["data"],)


        /***
         *  Send Post request to backend with list of document Ids
         *  Extract annotation
         *  Return annotation
         * 
         * 
         */

    }if(input["type"] === "load"){

    baseURL = API_ENDPOINT + "search"
    method = "POST"
    headers = {
            Accept: "application/json",
            "Content-Type": "application/json"
        };

        /**
         * Request to backend for search
         * 
         */
        return $request(baseURL,
                        method,
                        headers,
                        input["data"],)


    }
    

}


// Asynchronous function to handle request to backend
async function $request(url,method,headers,jsonData=null){

    try {

            const options = {
                method: method,
                headers: headers
            };

            if(jsonData){

                options.body = JSON.stringify(jsonData)
            }

            const response = await fetch(url,options);

            if (!response.ok){
                throw new Error("Request was not successful")
            }
            
            // sending response to the component
            const data = await response.json()
            

            console.log(data)
            return data

    }
    catch (error) {

        console.log("Error",error);
        return {error:error.message}

    }

}
