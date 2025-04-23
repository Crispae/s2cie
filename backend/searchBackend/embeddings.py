import io
import json
import os
import sqlite3
from collections.abc import Iterable

import numpy as np
from tqdm import tqdm


class EmbeddingDatabase:

    def __init__(self, db_path):
        """Intialize the embedding database with database path"""

        self.db_path = db_path
        self.unavailable_documents = []

        if not self.db_path:
            raise ValueError("Database path must be provided")

        if os.path.isfile(self.db_path):
            self.conn = sqlite3.connect(self.db_path)  ## make connection with database
            self.cursor = (self.conn.cursor())  ## build cursor to execute query over database
        else:
            raise ValueError("Database path does not exist")
            
    def _byte_converter(self, embeddings):
        """Convert embeddings into blob, for storing in sqlite3"""

        if isinstance(embeddings, np.ndarray):
            buffer = io.BytesIO()
            np.save(buffer, embeddings)
            return buffer.getvalue()
        else:
            raise ValueError("Embedding must be numpy array")

    def _convert_to_sql_format(self, document_ids: list, document_embeddings: list):
        """Convert embedding and document ID in the format to store in SQLite database."""

        if not isinstance(document_ids, Iterable) or not isinstance(
            document_embeddings, Iterable
        ):
            raise ValueError(
                "Both document_ids and document_embeddings must be iterable"
            )

        embedding_blob_array = [
            self._byte_converter(embed) for embed in document_embeddings
        ]
        embedding_ids = [int(emb_id) for emb_id in document_ids]

        assert len(embedding_ids) == len(
            embedding_blob_array
        ), "len mismatch for embeddings"

        return (embedding_ids, embedding_blob_array)

    def insert_embedding_to_database(self, document_ids, embeddings_bytes, cursor):
        """Insert  document id as integar and embeddings as byte blobs to database."""

        # Insert multiple arrays with corresponding custom IDs into the table
        data_to_insert = [
            (document_ids[i], sqlite3.Binary(data_bytes))
            for i, data_bytes in enumerate(embeddings_bytes)
        ]

        ## inserting the data
        try:
            cursor.executemany(
                "INSERT OR REPLACE INTO cpt_array (custom_id, array_data) VALUES (?, ?)",
                data_to_insert,
            )
        except BaseException as e:
            print(e)

    def retrieve_embeddings_in_batch(self, doc_list, batch_size):
        """
        Retrieve multiple embeddings using batch fetching with streaming.
        """
        embeddings_list = []

        ## check doclist len is higher than batch_size

        if len(doc_list) >= batch_size:
            # Split doc_list into chunks to fetch in batches
            for i in range(0, len(doc_list), batch_size):
                current_batch = doc_list[i : i + batch_size]
                placeholders = ",".join(["?"] * len(current_batch))  ## Dynamic batching
                query = f"SELECT custom_id, array_data FROM cpt_array WHERE custom_id IN ({placeholders})"
                self.cursor.execute(query, doc_list[i : i + batch_size])

                # Fetch results in batches and process them
                while True:
                    results = self.cursor.fetchmany(batch_size)
                    if not results:
                        break

                    for result in results:
                        retrieved_id = result[0]
                        array_blob = result[1]

                        ## converting bytes into array
                        buffer = io.BytesIO(array_blob)
                        retrieved_array = np.array(np.load(buffer))

                        embeddings_list.append(
                            {"id": retrieved_id, "embedding": retrieved_array}
                        )

            ## extracting unavailable documents.
            id_of_retrived_docs = [doc["id"] for doc in embeddings_list]
            self.unavailable_documents = list(
                set(doc_list).difference(set(id_of_retrived_docs))
            )  ## updating the list of unavailable documents.

            return embeddings_list
        else:
            raise ValueError(
                " Batch size lenght is greater than length of document is list."
            )

    def close_connection(
        self,
    ):
        """close connection of the database safely."""
        self.conn.commit()  ## commit if any changes were made
        self.conn.close()  ## close the connection


if __name__ == "__main__":

    doc_id_list = ["33132", "13332", "313212","3421","34232"]
    db_path = "E:\\PubmedCPT\\sql\\cpt.db"  ## database path

    ## make connection with database
    db_connect = EmbeddingDatabase(db_path=db_path)  

    retrived_embeddings = db_connect.retrieve_embeddings_in_batch(
        doc_id_list, batch_size=3
    )

    print(retrived_embeddings)