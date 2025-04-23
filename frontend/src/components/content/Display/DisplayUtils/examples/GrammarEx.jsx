import React from 'react'

function GrammarEx() {


    const grammarExample = 
`
rules:
  - name: "rule1"
    label: Phosphorylation
    type:  event
    priority: 1
    pattern: |
      trigger = [lemma=/phospho.*/ & tag=/N.*/]
      subject = >nsubj []`

  return (
    <div>

        <div style={{textAlign:"left"}}>
            <h5 style={{ marginBottom: '3px' }}>Custom grammar to extract nested information</h5>
            <p style={{ marginBottom: '3px' }}> Describe the grammar in YAML notation</p>
        </div>

        <pre style={{ margin: '0',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      textAlign:"left",
                      fontSize:"12px"}}>

                  <code style={{fontFamily:'Consolas,"courier new"',color:"crimson"}}>{grammarExample}</code>
        
        </pre>

       




    </div>
  )
}

export default GrammarEx