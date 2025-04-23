import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DisplayControl from './DisplayControl';

import Results from './Results';


function Display() {


/**
 * Updating response to the state
 */

const dispatchResponse = useSelector((state) =>{

  console.log(state.response.data)

  if (state.response.data && state.response.data.result === "successful"){

    /**
     * FIXME: Need to make object flat
     * 
     */
    return state.response.data.response
  }

})

/** Reterive scores of the document from context store */
const  docScores = useSelector((state) => state.context.data)
const  isError = useSelector((state) => state.response.error)

/**
 * 
 * Need to handle the error properly
 * 
 * 
 */
if(isError){

  throw new Error(isError)

}


/**callback removed it will updated every time,becaue it will considered different */

  const displayAreaStyle = {
  position:"relative",
  height:"auto",
  margin:"10px 2px 2px 2px",
  }

  return (

    <Row style={displayAreaStyle}>

      <Col>


      {/** Area to show control to download the results */}
      <Row>
        <DisplayControl></DisplayControl>
      </Row>


      {/** Area to show Results **/}
      <Row >
        
        {/**
         * 
         * From display control, we need to pass download type as prop into result
         * 
         */}

       <Results response={dispatchResponse}
                scoredResponse={docScores}>
      </Results>
      
      </Row>



      </Col>


    </Row>


    


  );

}

export default Display;
