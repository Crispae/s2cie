import React from 'react';
import { Table } from 'react-bootstrap';

function ContextEx() {
  
  return (
    <div>

      <div style={{textAlign:"left"}}>

      <h5 style={{ marginBottom: '3px' }}><span style={{}}>Context based retrevial/ranking</span></h5>
        <p style={{ marginBottom: '3px' }}> Brief description of the context, you want to search in the abstract</p>
      </div>
        

        <Table bordered hover style={{fontSize:"12px"}}>
          <thead>
            <tr>
              <th>Query</th>
              <th>Context</th>
            </tr>

          </thead>
          <tbody>
            <tr>
              <td>

              <pre style={{ margin: '0', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            <code style={{fontFamily:'Consolas,"courier new"',color:"crimson"}}>{`([entity=/B-drug/]) <nsubj ([tag=/V.*/ & norm=/suppre.*|inhibition|reduc.*|decre.*/]) >dobj ([word=/tumor/](?=/gro.*/))`}</code>
                </pre>
              </td>
              <td>Inhibition/reduction of p53 causes tumor growth</td>
            </tr>
          
          </tbody>
        </Table>
      
    </div>
  );
}

export default ContextEx;
