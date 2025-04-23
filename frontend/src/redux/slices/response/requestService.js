// requestService.js

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;
const API_ENDPOINT = BACKEND_ENDPOINT;
const CONTEXT_API_ENDPOINT = BACKEND_ENDPOINT;
const ENTITIES_API_ENDPOINT = BACKEND_ENDPOINT;

export const request = async (input) => {

    console.log(input)

    let baseURL, method, headers;

    if (input.type === "basic") {
        baseURL = API_ENDPOINT + "search";
        method = "POST";
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        return $request(baseURL, method, headers, input.request);
    } else if (input.type === "grammar") {
        baseURL = API_ENDPOINT + "grammar";
        method = "POST";
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        return $request(baseURL, method, headers, input.request);

        // Process the information as per grammar endpoint
    } else if (input.type === "context") {
        baseURL = CONTEXT_API_ENDPOINT + "context";
        method = "POST";
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        return $request(baseURL, method, headers, input.request);
    } else if (input.type === "entities") {
        baseURL = ENTITIES_API_ENDPOINT + "entities";
        method = "POST";
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        return $request(baseURL, method, headers, input.data);
    } else if (input.type === "load") {
        baseURL = API_ENDPOINT + "search";
        method = "POST";
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        return $request(baseURL, method, headers, input.data);
    }
};

// Asynchronous function to handle request to backend
const $request = async (url, method, headers, jsonData = null) => {
    try {
        const options = {
            method: method,
            headers: headers,
        };

        if (jsonData) {
            options.body = JSON.stringify(jsonData);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("Request was not successful");
        }

        // sending response to the component
        const data = await response.json();
        return data;

    } catch (error) {
        return { error: error.message };
    }
};
