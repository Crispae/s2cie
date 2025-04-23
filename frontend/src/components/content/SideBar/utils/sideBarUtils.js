export function extractDocumentID(respones){
    /** Function to handle the extraction of document Ids of document */

    if (respones && respones.response && respones.response.total_hits){
      const docIds = respones.response.total_hits.map((element)=>{
        return element.documentId;
      })

      return docIds
    }
    
  }