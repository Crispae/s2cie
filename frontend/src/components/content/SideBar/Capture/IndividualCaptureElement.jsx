import React from 'react'

function IndividualCaptureElement({name,data}) {

    /**
     * 
     * Passing data will handle the selection of elements based on the name and id
     */

const listContainerStyle = {
        maxHeight: '500px', // Fixed height
        overflowY: 'auto', // Enable vertical scroll
        overflowX: 'hidden', // Disable horizontal scroll
        position: 'relative',
        padding: '3px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        margin: '3px 0',
      };


  return (
    <div style={listContainerStyle}>
      {name}
    </div>
  )
}

export default IndividualCaptureElement
