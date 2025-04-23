import React,{useRef} from 'react'
import Editor from '../utils/Editor';
import Expandables from '../utils/Expandables';
import { Row,Col, Form} from 'react-bootstrap';
import Button from '../utils/Button';
import { useDispatch } from 'react-redux';
import { getResponse } from '../../../../redux/slices/response/response';
import clearResponse from '../../../utils/utils';

function Grammar() {
  const name = "Grammar Search"

  const editorRef = useRef(null)
  const countRef = useRef(null)

  const dispatch = useDispatch()

  /**
   * 
   * Input validation in count section 
   * 
   */

  const inputValidation = (eve)=>{
    const value = eve.target.value;
    if (value < 0) {
      throw new Error("Count should be a positive number greater than 0")

  }

}



  let event = ()=>{

    /** Clearing all stored response */
    clearResponse(dispatch)

    if(editorRef.current){

      const editorContent = editorRef.current.view.viewState.state.doc;
      const docCount = countRef.current.value

      /** Add validation for number*/
      
      /** Validating grammar content */
      let grammarRules = editorContent.toString(); // This to capture all string
      console.log(grammarRules)
      if (!grammarRules || grammarRules.trim().length === 0) {
        throw new Error("Grammar area is empty");
      }

      
      let requestData = {"request":{"grammar":grammarRules,
                                    "maxDocs":docCount,
                                    "allowTriggerOverlaps":true
                                  },
                                "type":"grammar"}
    
     dispatch(getResponse(requestData))                         

    }
  }

    const content = (
    <Row >

      <Col md={10} id={name}>
        <Editor 
          height={"500px"} 
          width={"100%"}
          ref={editorRef} 
          placeholder={"Enter the grammar of biological events"}
          theme = {"yaml"}
          
          
          ></Editor>
      </Col>


      <Col>
      <Row >
          <Form.Control
          ref={countRef}
          onChange={inputValidation}
          size='sm'
            type="number"
            placeholder="count"
            style={{
              width: '100%',
              height: '50px',
              marginTop: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              resize: 'none',
            }}
          />
        </Row>

      <Row>
      <Button event={event}></Button>
      </Row>
      

        
      </Col>
    

    </Row>






)
  return (
 
<Expandables name={name} contentDiv={content}></Expandables>

  )
}

export default Grammar
