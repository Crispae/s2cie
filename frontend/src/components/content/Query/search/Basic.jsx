import React, { useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getResponse } from '../../../../redux/slices/response/response';
import Button from '../utils/Button';
import Editor from '../utils/Editor';
import Expandables from '../utils/Expandables';
import clearResponse from '../../../utils/utils';



function Basic() {

    let name = "Basic search"
    const editorRef = useRef(null)

    // using Redux dispatch
    const dispatch = useDispatch()
    
      let event = ()=>{

        /** clear resposne */
        clearResponse(dispatch)

      if (editorRef.current) {
        const editorContent = editorRef.current.view.viewState.state.doc
        let text = editorContent.text[0]

        /**
         * 
         * TODO: Add validation to check if the query is not empty
         */
        if (!text || text.trim().length === 0) {
          throw new Error("Query is empty");
        }


        let requestData = {"request":{"odinsonQuery":text,
                                      "prevDoc":""},
                            "type":"basic"};

        // Dispatch the redux action
        dispatch(getResponse(requestData))

      }
    }

    const content = (

      <Row  id={name}>
        
        {/** Column to handle the content */}
        <Col md={10}> 

          <Editor 

              height={"100px"} 
              width={"100%"}
              ref={editorRef}
              placeholder={"Enter your basic type query"}
              theme={"javascript"}>

          </Editor>

        </Col>

            {/** Column to handle the button */}
          <Col>
            <Button event={event}></Button> 
          </Col>
                       

      </Row>
      
      
   )


  return (

    <Expandables name={name} contentDiv={content}></Expandables>
   
  )
}

export default Basic
