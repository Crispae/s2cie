import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BasicEx from './examples/BasicEx';
import ContextEx from './examples/ContextEx';
import GrammarEx from './examples/GrammarEx';

function UsageDisplay() {
  const exampleStyle = {
    position:"relative",
    padding: '10px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginTop:"5px",
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <Container fluid style={{ height: '100%', overflow:"scroll",}}>

      <Row style={{ height: '100%',position:"relative" }}>

        <Col md={4} style={exampleStyle}>
        <BasicEx></BasicEx>
        </Col>
        
        <Col md={4} style={exampleStyle}>
        <GrammarEx></GrammarEx>
        </Col>
        
        <Col md={4} style={exampleStyle}>
        <ContextEx></ContextEx>
        </Col>


      </Row>
    </Container>
  );
}

export default UsageDisplay;
