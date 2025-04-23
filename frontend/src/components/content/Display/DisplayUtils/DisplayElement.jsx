import React, { useState } from 'react';
import { FaThumbsDown, FaThumbsUp,FaTimesCircle  } from 'react-icons/fa';
import DocId from './DocId';
import StyleText from './StyleText';


const DisplayElement = ({
                          result_obj,
                          scoredResponse,
                          onThumsUp,
                          onThumsDown,
                          onClear,
                          backgroundColor}) => {
  const [isHovered, setIsHovered] = useState(false);

/** Action to take when thumsUp */


/** Action to take */


  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: '5px',
        marginBottom: '10px',
        marginTop: '10px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        padding: '5px',
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        //boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/** docid component */}
      <DocId doc_id={result_obj.documentId} backgroundColor={backgroundColor(result_obj)}></DocId>

      {/**Div for text */}
      <div style={{ fontSize: '12px' }}>
        <StyleText result_obj={result_obj}></StyleText>{' '}
      </div>

      {/**Div for document score as per query
       *
       *@TODO Need to put condition here, as when scored is available then render this
       *
       *
       */}

      {scoredResponse && (
        <div
          style={{
            border: '1px solid #ccc',
            padding: '5px 10px',
            height: '30px',
            borderRadius: '3px',
            fontSize: '12px',
            fontWeight: 'bold',
            marginLeft: 'auto',
          }}
        >
          {/**
           *
           * scoredResponse captured from backend will be used here to update the score 
           * 
           */}
          {scoredResponse["scores"][result_obj.documentId] !== undefined
            ? scoredResponse["scores"][result_obj.documentId].toFixed(2)
            : 'NaN'}
        </div>
      )}

      {/** Div for buttons */}
      {isHovered && (
        <div
          style={{
            zIndex:5,
            width:"100px",
            position: 'absolute',
            bottom: '-10%',
            opacity:"0.7",
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent:"space-between",
            gap: '10px',
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            padding: '5px',
            borderRadius: '5px',
          }}
        >
          <button onClick={()=>{onThumsUp({result_obj:result_obj})}} 
                  style={{ cursor: 'pointer',
                           background:"none",
                          border:"none" }}>
                    
                  <FaThumbsUp size={15} color='green' />
          </button>

          
          <button onClick={()=>{onThumsDown({result_obj:result_obj})}} 
                  style={{ cursor: 'pointer',background:"none", border:"none"}}>
                    <FaThumbsDown size={15} color='red'/></button>

          <button onClick={()=>{onClear({result_obj:result_obj})}} 
                  style={{ cursor: 'pointer',
                           background:"none",
                          border:"none" }}>
                    
                  <FaTimesCircle  size={15} color='gray' />

          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(DisplayElement);
