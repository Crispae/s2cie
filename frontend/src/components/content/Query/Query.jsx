import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Basic from './search/Basic'
import Grammar from './search/Grammar'
import Context from './search/Context'

function Query() {

    const queryDivStyle = {height:"auto",
    margin:"10px 2px 2px 2px",
    border:"1px solid lightgray",
    borderRadius:"4px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)"}


  return (
    <Row style={queryDivStyle}>

        {/** Column to store the different search type */}
        <Col md={9} className="d-flex flex-column ">
            
            {/** Row for basic search */}
            <Row className='m-1'>
                <Basic/>
            </Row>
        
            {/** Row for Grammar based search */}
            <Row className='m-1'>
                <Grammar/>
            </Row>

            {/** Row for contextual search based search */}
            <Row className='m-1'>
                <Context/>
            </Row>
            
        </Col>

        {/** Column to handle the article meta-data type*/}
        <Col>
            {/*<Metadata></Metadata>*/}
        </Col>

    </Row>
  )
}

export default Query
