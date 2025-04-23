import React from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Display from './Display/Display';
import Query from './Query/Query';
import Bar from './SideBar/Bar';

function Content() {

  return (
    
    <Container fluid>
      
        <Row>

            {/** Column to hold query and display */}
            <Col md={8}>
              
              {/**Section to display query 
               * 
               * TODO: Pass prop for height
              */}
              <Query/>
              

              {/**Section for display area
               * 
               * TODO: Pass prop for height
              */}
              <Display/>
              

            
            </Col>

            {/** Column to hold the sidebar */}
            <Col md={4} style={{paddingBottom:"6px",
                                paddingTop:"10px",
                                paddingLeft:"3px"}}>

              <Bar/>

            </Col>


        </Row>

    </Container>
    
  )
}

export default Content
