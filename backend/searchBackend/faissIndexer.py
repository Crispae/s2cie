""" Index embeddings with FAISS Index. """

import faiss
import numpy as np


class Indexer:

    def __init__(self):

        self.embeddings_for_faiss = None
        self.index_id_mapping = None

    def _index_mapper(self, embeddings):
        """Create a mapping between FAISS indices and original document IDs"""

        self.index_id_mapping = {}  # Dictionary to store mapping

        for idx, item in enumerate(embeddings):
            doc_id = item["id"]
            self.index_id_mapping[idx] = doc_id

    def _convert_embedding_for_faiss(self, embeddings):
        """Convert embeddings format to store in FAISS."""

        embeddings_without_id = [item["embedding"] for item in embeddings]
        self.embeddings_for_faiss = np.array(embeddings_without_id).astype("float32")
        return self.embeddings_for_faiss

    def create_index(self, embeddings):
        """Initialize FAISS index and store it."""

        ## Map the ids
        self._index_mapper(embeddings=embeddings)

        faiss_input_embeddings = self._convert_embedding_for_faiss(
            embeddings=embeddings
        )

        dimension = faiss_input_embeddings.shape[1]  # Dimension of the embeddings
        self.index = faiss.IndexFlatIP(dimension)  # Using IndexFlatL2 for L2 distance

        # Add embeddings to FAISS index
        self.index.add(faiss_input_embeddings)

    def search_index(self, query_embedding, number_of_documents=5, return_all=False):
        """Similarity search over the index.

        TODO: 1. Check, number_of_documents must not be higher the total documents it self
              2. if number_of_documents is mentioed retural_all must be false and return_all is true
                 number_of_documents should be null

        """

        if return_all:
            number_of_documents = self.embeddings_for_faiss.shape[0]

        distances, indices = self.index.search(
            np.array(query_embedding), number_of_documents
        )

        # Mapping the indices with orginal id
        nearest_document_ids = [
            self.index_id_mapping[vect_index] for vect_index in indices[0]
        ]

        ## assigning documents with score
        documents_with_score = dict(zip(nearest_document_ids, distances.tolist()[0]))

        return documents_with_score


if __name__ == "__main__":

    ## Embeddings with ID
    embeddings_with_id = {}

    ## create instance of indexer
    embedding_indexer = Indexer()

    ## Index the embeddings
    embedding_indexer.create_index(embeddings=embeddings_with_id)

    ## Define query embeddings
    query_embedding = None

    ## Query over the embeddings
    tok_k_result = embedding_indexer.search_index(
        query_embedding=query_embedding, number_of_documents=100
    )
