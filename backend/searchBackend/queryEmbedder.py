import torch
from transformers import AutoModel, AutoTokenizer


class QueryEmbedder:
    def __init__(
        self,
    ):
        """Generate embedding for query"""
        self.model = AutoModel.from_pretrained("ncbi/MedCPT-Query-Encoder")
        self.tokenizer = AutoTokenizer.from_pretrained("ncbi/MedCPT-Query-Encoder")

    def embed(self, query):
        """Embed query"""
        with torch.no_grad():
            encoded = self.tokenizer(
                query,
                truncation=True,
                padding=True,
                return_tensors="pt",
                max_length=64,
            )
            query_embedding = self.model(**encoded).last_hidden_state[:, 0, :]

            return query_embedding


if __name__ == "__main__":

    query = "AHR activation leads to immunotoxicity"

    ## Object Instance
    query_embedder_model = QueryEmbedder()

    ## Embed query
    query_embedding = query_embedder_model.embed(query=query)

    ## print embeddings
    print(query_embedding)
