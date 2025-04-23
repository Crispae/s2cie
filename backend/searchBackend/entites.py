## module to handle the entites distribution
import pymongo
import math


class StructuredEntites:
    """
    
    class deals with structured the entites in 
    
    """
    def __init__(self) -> None:
        pass


    def reverse_mapping(self,docs,entity_type):
        """
        Handles reverse mapping of ids to terms.

        Parameters
        ----------
        docs : dict
            The documents in the form of a dictionary
        key : str
            The key of the documents to be mapped

        Returns
        -------
        id_map : dict
            The mapping of ids to terms
        
        """
        id_map = {}
        for key, value in docs.get(entity_type, {}).items():
            # Set of ids, which are unique
            id_set = list(set(value.get("id", [])))

            ## TODO: Add custom strategy for handling multiple ids and optimize the

            if len(id_set) == 1:
            
                id_str = id_set[0]
                value["term"] = key
                if id_str in id_map:
                    id_map[id_str].append(value)
                else:
                    id_map[id_str] = [value]

            else:
                ## Handling two ids in similar way as above
                ## TODO: Add custom strategy for handling multiple ids and optimize the 
                id_str = id_set[0]
                value["term"] = key
                if id_str in id_map:
                    id_map[id_str].append(value)
                else:
                    id_map[id_str] = [value]

        return id_map


    def representative_term(self,mapping):
        """
        Handles reverse mapping of ids to terms.

        Parameters
        ----------
        docs : dict
            The documents in the form of a dictionary
        key : str
            The key of the documents to be mapped
            
        """
        
        rep_terms = {}
        for key,value in mapping.items():

            ## representative term
            rep = {"total_count":0,"doc_list":[],"terms":[]} ## representative term
            highest_count = 0 ## highest count of a term

            for terms in value:
                if terms["count"] > highest_count:
                    highest_count = terms["count"] ## Most repeated term
                    rep["reprensentative_term"] = terms["term"] ## making it as rep term

                rep["total_count"] += terms["count"] ## calculating total count
                rep["doc_list"].extend(list(set(terms["docs"])))
                rep["terms"].append(terms["term"])

                ## NOTE:
                ## Adding terms cause duplication of data, it's better to just 
                ## add names of the terms

            rep_terms[key] = rep

        return rep_terms
    

    def structure_data(self,docs):
        """
        Handles reverse mapping of ids to terms.

        Parameters
        ----------
        docs : dict
            The documents in the form of a dictionary
        key : str
            The key of the documents to be mapped
            
        """
        
        structured_docs = {}
        for entity_type in docs:

            ## Here all the term with common id will be gropped
            reverse_mapped = self.reverse_mapping(docs,entity_type)

            ## Representative term selection
            grouped_terms = self.representative_term(reverse_mapped)

            ## structured docs
            structured_docs[entity_type] = grouped_terms

        return structured_docs


## module to handle the entites distribution
import pymongo


class MongoData:

    def __init__(self, url, db, collection):

        client = pymongo.MongoClient(url)
        self.db = client[db]
        self.collection = self.db[collection]
        self.results = None

    def _reterieve(self, id_list):

        ## Query database for documents matching
        query = {"_id": {"$in": id_list}}
        self.results = self.collection.find(query)

        ## annotated documents
        return list(self.results)

    def reterieve_to_send(self, id_list):
        """reterive document to send directly."""
        docs = self._reterieve(id_list=id_list)  ## reterive doc_ids

        return self._generate_entity_distribution(docs=docs)

    from collections import defaultdict

    def _generate_entity_distribution(self, docs):
        """Structure the annotation in parsable format."""

        entity_distribution = {}

        for doc in docs:
            anno = doc.get("annotations")  # extract annotation
            doc_id = doc.get("pmid")  # extract doc ids

            if anno:
                for ann in anno:  # Loop through annotation

                    ## TODO: Add a step of filtering of annotations,if probability is less than threshold
                    ## And doesn't have any identifier

                    _type = ann.get("obj")  # entity type
                    entity_mention = ann.get("mention")  # entity name
                    entity_id = ann.get("id",[])
                    entity_prob = ann.get("prob",) ## entity 

                    ## Entity probability is nan for some elements
                    if math.isnan(entity_prob):
                        entity_prob = 0
                    
                    ## selection of entity term for same identifier will be done based on their occurence
                    if (
                        _type in entity_distribution
                    ):  # check if entity type is available in distribution
                        selected_entity_type = entity_distribution.get(_type)
                        if entity_mention in selected_entity_type:
                            selected_entity_type[entity_mention]["docs"].add(doc_id)
                            selected_entity_type[entity_mention]["count"] += 1
                            selected_entity_type[entity_mention]["id"].extend(entity_id)
                            selected_entity_type[entity_mention]["prob"].add(entity_prob)
                        else:
                            selected_entity_type[entity_mention] = {
                                "docs": {doc_id},
                                "count": 1,
                                "id": entity_id,
                                "prob": {entity_prob}
                            }
                    else:
                        entity_distribution[_type] = {
                            entity_mention: {"docs": {doc_id},
                                            "count": 1,
                                            "id": entity_id,
                                            "prob": {entity_prob}
                                            },
                        }

        # Convert sets to lists before returning
        for entity_type, entity_mentions in entity_distribution.items():
            for entity_mention, values in entity_mentions.items():
                values["docs"] = list(values["docs"])
                values["prob"] = list(values["prob"])

        return entity_distribution
    

if __name__ == "__main__":

    ## TODO: configuration of database
    url = "mongodb://localhost:27017"
    db = "AOP"
    collection = "Bern2"

    ## Reterive documents from database
    mongo = MongoData(url=url, db=db, collection=collection)
    docs = mongo.reterieve_to_send(id_list=["33132", "13332", "313212"])
    print(docs)
