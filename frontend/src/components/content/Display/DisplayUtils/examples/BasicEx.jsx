import React from 'react';
import { Table } from 'react-bootstrap';

function BasicEx() {
  const exampleContent = [
    {
      usage: 'Pattern with multiple constraints',
      example: `[]*? [word="insulin"] []*? [entity=/B-gene/ & word=/gluca.*/] []*?`,
    },
    {
      usage: 'Pattern with specific type',
      example: `inhibition of [entity=/B-gene/][entity=/I-gene/] []*? [word=/nu.*/] `,
    },
    {
        usage: 'Pattern using dependecy graph',
        example: `([entity=/B-gene/]) <nsubj ([tag=/V.*/]) >dobj ([entity=/B-gene/]) `,
      },
      {
        usage: 'Adding multiple constrain in surface token with & and |',
        example: `([entity=/B-gene/]) <nsubj ([tag=/V.*/]) >dobj ([entity=/B-gene/]) `,
      },
      {
        usage: 'Capturing negation with dependancy graph',
        example: `([entity=/B-drug/]) <nsubj ([tag=/V.*/]) >neg []* >dobj ([entity=/B-gene/])`,
      },
      {
        usage:"capturing terms in sentences with with distance boundry",
        example: `[lemma="Aβ"] []{0,2} [lemma="oligomers"]`
      },
      {
        usage:"Capturing the whole sentence pattern p53 leads to cell death",
        example: `[word=/p53.*/] []*? (?= /lead.*/) []*? [word=/cell.*/] (?=/death.*/)`
      },
      {
        usage:"Capture specific token from sentence in placeholder 'capture'",
        example: `[]*? (?<chemical> [entity=/B-drug/]) []*? [entity=/B-gene/ & word=/gluca.*/] []*?`
      },
      {
        usage:"Parse sentences with Subject-verb-object pattern, with constraints of specific subject/object/predicate and capture the terms",
        example: `(?<subject> [lemma=/tcdd/]) <nsubj (?<predicate> [tag=/V.*/]) >dobj (?<object> [tag=/N.*/])`
      },
      {
        usage:"Capture before and after token considering Object as focus point",
        example: `(?<subject> [lemma=/tcdd/]) <nsubj (?<predicate> [lemma=/inhibit.*|downregulate.*|decrease.*/ &tag=/V.*/]) >dobj (?<ahead> []) (?<object> [tag=/N.*/])(?<afterword> [])`
      },
    
  ];

  return (
    <div style={{ textAlign: 'left' }}>

      <div style={{alignContent:"left"}}>
      <h5 style={{ marginBottom: '3px' }}>Basic Search</h5>
      <p style={{ marginBottom: '3px' }}>Contains usage examples for basic search.</p>
      </div>
      
      <Table bordered hover style={{fontSize:"12px"}}>
        <thead>
          <tr>
            <th>Usage</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {exampleContent.map((example, index) => (
            <tr key={index}>
              <td>{example.usage}</td>
              <td>
                <pre style={{ margin: '0', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                <code style={{fontFamily:'Consolas,"courier new"',color:"crimson"}}>{example.example}</code>
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BasicEx;
