## Flask micro server to run the context_search app
import base64
import yaml
import json
import os
from flask import Flask, Response, jsonify, request
from flask_cors import CORS, cross_origin
from flasgger import Swagger
from pymongo.errors import ServerSelectionTimeoutError

## custom imports
from searchBackend.embeddings import EmbeddingDatabase
from searchBackend.entites import MongoData, StructuredEntites
from searchBackend.faissIndexer import Indexer
from searchBackend.parallelSearch import (DistributedPortSearch,
                                          DistributedURLSearch,
                                          DistributedCustomSearch)

from searchBackend.parallelGrammar import DistributedGrammar
from searchBackend.queryEmbedder import QueryEmbedder
from searchBackend.utils import sort_response

## Load configuration
current_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(current_dir, "config.json")
with open(config_path, "r") as f:
    config = json.load(f)


## Initialize the flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, allow_headers="Content-Type") 
app.debug = config.get("flask", {}).get("debug", False)


# Initialize Swagger
swagger = Swagger(app)

EMBED_QUERY = QueryEmbedder()

####### Connecting to mongo database #####

ANNOTATION_DATABASE = MongoData(url=config.get("mongodb", {}).get("url",),
                                db=config.get("mongodb", {}).get("db",),
                                collection=config.get("mongodb", {}).get("collection",))
####### xxxxxxxxxxxxxxxxxxxxxxxxxxxxx #####

def get_annotation(response: dict,grouped=True):
    """
        Send request to database to reterive the annotation
        
    """

    ## get unique doc ids
    doc_id = list(set(map(lambda x: x["documentId"], response["total_hits"])))

    ## send request of these doc ids to database
    entites_result = ANNOTATION_DATABASE.reterieve_to_send(id_list=doc_id)

    ## Sending entites to be structured
    if grouped:
        print("grouped")
        entites_result = StructuredEntites().structure_data(docs=entites_result)
    
    return entites_result

####### Distributed search config ######

DISTRIBUTED_SEARCH = DistributedCustomSearch(config=config.get("distributed_custom_search",
                                                                {}))

DISTRIBUTED_GRAMMAR_SEARCH = DistributedGrammar(config=config.get("distributed_custom_search"))

####### xxxxxxxxxxxxxxxxxxxxxxxxxxxxx #####


## Get request to check the status 
@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "success"}), 200

## Request for context
@app.route("/context", methods=["POST"])
def context():
    """
    This method returns the scores of abstracts based on the context provided by the user
    ---
    tags:
    - Information extraction
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - name: context
      in: body
      required: true
      schema:
        type: object
        properties:
          doc_id:
            type: array
            items:
              type: string
            description: An array of document ids to be scored
            example: ["doc1", "doc2"]
          query:
            type: string
            description: The context used for scoring
            example: "This is the context for scoring"
    responses:
      200:
        description: A successful response
        schema:
          type: object
          properties:
            status:
              type: string
              description: The status of the request
            scores:
              type: object
              description: The scores of the documents
      400:
        description: Bad request
      500:
        description: Internal server error
    """

    assert request.method == "POST", "Request method mismatch"
    data = request.get_json()

    ## Parsing input
    document_ids = data.get("doc_id")
    query = data.get("query") ## TODO: Put backend validation to check if query is valid
    

    print(" Inputs,received")

    ## For each request we are building the connection with the database
    ## TODO: Query information from database in batches, casue issue, To to create safe batching.

    try:
        
        EMBEDDING_DATABASE = EmbeddingDatabase(db_path=config.get("embed_db",{}).get("path",))
        reterived_embeddings = EMBEDDING_DATABASE.retrieve_embeddings_in_batch(
            doc_list=document_ids, batch_size=5
        )

        print("embeddings reterived")

        ## Index the embedding in FAISS
        faiss_index = Indexer()
        faiss_index.create_index(embeddings=reterived_embeddings)

        print("Index created")

        ## send the query to get converted into embedding
        embedded_query = EMBED_QUERY.embed(query=query)

        print("Query embedded")

        ## Pass the embedded query to search
        top_results = faiss_index.search_index(query_embedding=embedded_query,
                                                return_all=True)

        ## sort the scores and send
        sorted_scores = dict(sorted(top_results.items(),
                                     key=lambda item: item[1],
                                     reverse=True))

        print("Result extracted")

        return  jsonify({"status": "successful",
                          "scores": sorted_scores,
                          "type":"context"})
    
    except ValueError as e:
        print(e)
        return jsonify({"status": "unsuccessful",
                        "scores": {}}),500

@app.route("/entities", methods=["POST"])
def entities():
    """
    This method retrieves and processes entity annotations based on provided IDs.
    ---
    tags:
    - Information extraction
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - name: body
      in: body
      required: true
      schema:
        type: object
        properties:
          ids:
            type: array
            items:
              type: string
            description: An array of document IDs for which to retrieve entities
            example: ["id1", "id2"]
    responses:
      200:
        description: A successful response
        schema:
          type: object
          properties:
            result:
              type: string
              description: The status of the request
              example: "successful"
            annotations:
              type: array
              description: The list of entity annotations
              items:
                type: object
                properties:
                  id:
                    type: string
                    description: The ID of the entity
                  type:
                    type: string
                    description: The type of the entity
                  value:
                    type: string
                    description: The value of the entity
      400:
        description: Bad request
      500:
        description: Internal server error
    """

    assert request.method == "POST", "Request method mismatch"
    data = request.get_json()

    try:
        ## fetching entites from database
        entites_result = ANNOTATION_DATABASE.reterieve_to_send(id_list=data.get("ids"))

        ## structure it in normalized format
        structured_entites_result = StructuredEntites().structure_data(docs=entites_result)

        return jsonify({"result":"successful","annotations":structured_entites_result}) ## serialization issue (use List)
    except Exception as e:
        print(e)
        return jsonify({"result":"unsuccessful","annotations":[]}),500

@app.route("/search", methods=["POST"])
def search():
    """
    This method performs a search operation based on the provided query.
    ---
    tags:
    - Information extraction
    consumes:
    - application/json
    produces:
    - application/json
    parameters:
    - name: odinsonQuery
      in: body
      required: true
      schema:
        type: object
        properties:
          odinsonQuery:
            type: string
            description: The query string for search
            example: "Your search query goes here"
          prevDoc:
            type: array
            items:
              type: object
              description: Previous documents data
              properties:
                doc_id:
                  type: string
                  description: The ID of the previous document
                  example: "doc1"
                content:
                  type: string
                  description: The content of the previous document
                  example: "Previous document content goes here"
      description: Search query parameters
    responses:
      200:
        description: A successful response
        schema:
          type: object
          properties:
            result:
              type: string
              description: The status of the request
            response:
              type: object
              description: The search response
      400:
        description: Bad request
      500:
        description: Internal server error
    """
    assert request.method == "POST", "Request method mismtach"
    data = request.get_json()

    ## In request with port other search request will also come
    ## query string
    query = data.get("odinsonQuery")  ## direct query
    previous_docs = data.get("prevDoc")

    if previous_docs:
        print("with prevDoc")
        
        ## pass previous docs in search query
        response = DISTRIBUTED_SEARCH.search(query_string=query,
                                              prevData=previous_docs)  
        
        ## insert annotation result in response as well
        response["annotation"] = get_annotation(response=response,
                                                grouped=True)

    else:
        response = DISTRIBUTED_SEARCH.search(query_string=query)

        ## Insert annotation as well
        response["annotation"] = get_annotation(response=response,
                                                grouped=True)

    return jsonify({"result": "successful",
                     "response": response,
                     "type":"basic"})


@app.route("/grammar", methods=["POST"])
def grammar():
    """
    This endpoint deals with grammar based information extraction.

    """
    assert request.method == "POST", "Request method mismtach"
    data = request.get_json()

    ## extract content from request
    query = data.get("grammar")  ## direct query
    count = data.get("maxDocs")
    triggerOverlap = data.get("allowTriggerOverlaps")
    
    ## pass previous docs in search query
    response = DISTRIBUTED_GRAMMAR_SEARCH.search(query_string=query,
                                                 maxDocs=int(count),
                                                 triggerOverlap=True)  
        
    ## insert annotation result in response as well
    response["annotation"] = get_annotation(response=response,
                                                grouped=True)
    
    
    return jsonify({"result": "successful",
                     "response": response,
                      "type":"grammar"})


if __name__ == "__main__":
    app.run(port=config.get("flask", {}).get("port", 5000), 
            debug=config.get("flask", {}).get("debug", False),
            host=config.get("flask", {}).get("host", "0.0.0.0"))
