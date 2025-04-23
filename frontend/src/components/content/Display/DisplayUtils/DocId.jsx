import React from 'react'

function DocId({doc_id,backgroundColor}) {
  return (
    <div style={{
      border: "1px solid #ccc",
      background:backgroundColor,
      height:"30px",
      padding: "5px 10px 10px",
      borderRadius: "3px",
      fontSize: "12px",
      marginRight:"5px",
      fontWeight: "bold",
  }}>
                  <a
      href={`https://pubmed.ncbi.nlm.nih.gov/${doc_id}/`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
          textDecoration: "none",
          color: "#0366d6",
          fontSize: "12px",
          fontWeight: "bold",
      }}
  >
      {doc_id}
  </a></div>
  )
}

export default DocId
