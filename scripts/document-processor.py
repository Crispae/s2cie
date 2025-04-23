import spacy
from spacy.tokens import Doc
from spacy.language import Language
import pymongo
import sys
from typing import List, Tuple, Dict, Any


class CustomNer:
    def __init__(self, nlp: Language, annotations: Dict):
        self.annotations = annotations

    def __call__(self, doc) -> Doc:
        doc_id = doc._.doc_id
        text, entities = self.annotations.get(doc_id)
        for start, end, label in entities:
            span = doc.char_span(start, end, label=label)
            if span is not None:
                doc.ents = list(doc.ents) + [span]
        return doc


def setup_mongodb() -> Tuple[pymongo.MongoClient, pymongo.collection.Collection]:
    """Setup MongoDB connection"""
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["AOP"]
    return client, db["Bern2"]


def remove_overlapping_spans(spans: List[Tuple]) -> List[Tuple]:
    """Remove overlapping spans from the annotations"""
    sorted_spans = sorted(spans, key=lambda x: x[0])
    non_overlapping_spans = []

    for span in sorted_spans:
        if not non_overlapping_spans:
            non_overlapping_spans.append(span)
        else:
            prev_span = non_overlapping_spans[-1]
            if span[0] >= prev_span[1]:
                non_overlapping_spans.append(span)

    return non_overlapping_spans


def format_converter(result: Dict) -> Tuple[str, List[Tuple]]:
    """Convert database results into format for pipeline ingestion"""
    annotations = result.get("annotations")
    if annotations:
        spans = [
            (
                annot.get("span").get("begin"),
                annot.get("span").get("end"),
                annot.get("obj"),
            )
            for annot in annotations
        ]
        text = result.get("text")
        non_overlapping_spans = remove_overlapping_spans(spans)
        return (text, non_overlapping_spans)
    return None


@Language.factory("BERN2", default_config={"annotations": None})
def bern2_ner(nlp: Language, name: str, annotations: Dict) -> CustomNer:
    """Factory function for custom NER component"""
    return CustomNer(nlp, annotations)


def setup_nlp_pipeline(annotation_list: Dict) -> Language:
    """Setup spaCy pipeline with custom components"""
    nlp = spacy.load("en_core_sci_scibert")
    if "ner" in nlp.pipe_names:
        nlp.remove_pipe("ner")
    nlp.add_pipe("BERN2", last=True)
    return nlp


def process_documents(nlp: Language, annotation_list: Dict) -> List[Doc]:
    """Process documents through the NLP pipeline"""
    docs = []
    for key in annotation_list:
        if annotation_list[key] is not None:
            raw_text = annotation_list[key][0]
            doc = nlp.make_doc(raw_text)
            doc._.doc_id = key
            docs.append(doc)

    return list(nlp.pipe(docs, batch_size=200))


def convert_to_clu_documents(result_docs: List[Doc]) -> Tuple[List, List]:
    """Convert spaCy docs to CLU documents"""
    sys.path.append("clu-bridge")
    from clu.bridge.conversion import ConversionUtils

    clu_docs = []
    error_docs = []

    for idx, doc_ in enumerate(result_docs):
        try:
            clu_doc = ConversionUtils.spacy.to_clu_document(doc_)
            clu_docs.append(clu_doc)
        except:
            error_docs.append(doc_)
            print(f"Error in CLU conversion at index {idx}")

    return clu_docs, error_docs


def convert_to_odinson_documents(clu_docs: List) -> Tuple[List, List]:
    """Convert CLU documents to Odinson documents"""
    odinson_docs = []
    odinson_error_docs = []

    for idx, doc_ in enumerate(clu_docs):
        try:
            odinson_doc = ConversionUtils.processors.to_odinson_document(doc_)
            odinson_doc.Config.arbitrary_types_allowed = True
            odinson_docs.append(odinson_doc)
        except:
            odinson_error_docs.append(doc_)
            print(f"Error in Odinson conversion at index {idx}")

    return odinson_docs, odinson_error_docs


def main():
    # Setup document ID extension
    Doc.set_extension("doc_id", default=None)

    # Setup MongoDB and get documents
    client, collection = setup_mongodb()
    ids_range = [str(ids) for ids in range(100, 1000)]
    query = {"pmid": {"$in": ids_range}}
    results = collection.find(query)
    results_in_list = list(results)

    # Convert documents to required format
    annotation_list = {
        result["_id"]: format_converter(result) for result in results_in_list
    }

    # Setup and run NLP pipeline
    nlp = setup_nlp_pipeline(annotation_list)
    result_docs = process_documents(nlp, annotation_list)

    # Convert to different document formats
    clu_docs, clu_error_docs = convert_to_clu_documents(result_docs)
    odinson_docs, odinson_error_docs = convert_to_odinson_documents(clu_docs)

    # Test conversion
    print(odinson_docs[7399].json(by_alias=True))

    # Close MongoDB connection
    client.close()


if __name__ == "__main__":
    main()
