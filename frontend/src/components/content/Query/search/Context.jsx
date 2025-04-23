import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getContext } from '../../../../redux/slices/context/context';
import { addScore } from '../../../../redux/slices/response/response';
import Button from '../utils/Button';
import Expandables from '../utils/Expandables';

function Context() {

  /**
   * Extracting 
   * 
   */
  const  isError = useSelector((state) => state.context.error)

  if (isError) {
    throw new Error(isError)

  }

  const [contextInput, setContextInput] = useState()
  let name = "Context Search"

  /** To update the context store */
  const dispatch = useDispatch()

  /** Extract total_hits from store */
  //const total_hits = useSelector((state) => state.response.data ? state.response.data.response.total_hits:null)

  /**
   * 
   * Extracting total_hits from store in more controlled way hence, not lead to error
   * 
   */
  const total_hits = useSelector((state) =>{

    if (state.response.data && state.response.data.result === "successful"){
  
      /**
       * FIXME: Need to make object flat
       * 
       */
      return state.response.data.response.total_hits
    }
    else{
      return null
    }
  
  })

  /**
   * If there is error received, then throw error and show on error boundry
   */
 

  /** Function to reterive doc ids from the response */
  function reteriveDocumentID(response)
  {

  if (response) 
  {
    const ids = response.map((doc)=>{return doc.documentId})
    return ids
  }else
  {

    throw new Error("There is no basic and grammar search response available")

  }

}


  /** Function to process the request data*/
  function generateRequestData(response,context){
    /** Pure function to create a request data for the backend 
     * 
    */

    /**
     * Validation to check if context is empty or not
     */
    if (!context || context.trim().length === 0) {
      throw new Error("context is empty");
    }

    try{
      let doc_ids = reteriveDocumentID(response); // Retrieve doc ids

      return {"request":{"doc_id":doc_ids,
              "query": context,},
              "type": "context"}
    } catch (error) 
    {
      throw new Error(error)
    }
   
  }

  /** Event executed on submission of context */
  let event = ()=>
  {
    const dataForBackend = generateRequestData(total_hits,contextInput)
    //console.log(dataForBackend)

    /*
     * 
     * Dispatch two actions, 
     * once we receive the score 
     * and then then add the scores
     * to the response
     * 
     */
      dispatch(getContext(dataForBackend)).then((action) =>{
      dispatch(addScore(action.payload));
    })
  
  }

  const content = (
  <Row className='m-1' id={name}>
    {/** Column to include button */}
    <Col>
          <textarea 
              style={{border:"2px solid gray",resize:"none"}}name=""
              id="" 
              cols="50"
              rows="5"
              onChange={(e)=>setContextInput(e.target.value)}
              placeholder='Enter the brief descrptive context of search'>

        </textarea>
    </Col>

    {/* Column to include Button*/}
    <Col>
      <Button event={event}></Button>
    </Col>
    

  </Row>)
  


  return (
    <Expandables name={name} contentDiv={content}></Expandables>
    )
}

export default Context
