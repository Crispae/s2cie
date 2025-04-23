import React from 'react'

function StyleText({result_obj}) {

    /**
     *  We are manually splitting the sentence into tokes, which might cause. We can call the
     *  endpoint on server to get the annotation of sentence.
     *  TODO: Also add PMID modification of the document.
     * 
     */
    const words = result_obj.text.split(' ');

    const boldText = words.map((word,index) =>{

    const isBold = result_obj.startPositions.includes(index) || result_obj.endPositions.includes(index)

    // Add a space after each word except for the last one
    const space = index !== words.length - 1 ? ' ' : '';


    return (

        <React.Fragment key={index}>

            {isBold ? <b>{word}</b>: `${word}`}
            {space}

        </React.Fragment>

    )})

    




  return (
    <p>
        {boldText}
    </p>
    
  )
}

export default React.memo(StyleText)
