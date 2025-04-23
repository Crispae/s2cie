import React from 'react'
import ReactDOM from 'react-dom/client';
import tippy from "tippy.js";
import 'tippy.js/themes/light.css';



export function nodePopupContent(ele) {

    /**
     * 
     * Id, name, value, node_type
     * 
     */

    // Extracting data from nodes
    const data = ele.data();
    const { id, name, value, node_type } = data;

    // Setting reference for popups
    const ref = ele.popperRef()
    const node_content = document.createElement('div');
    document.body.appendChild(node_content);

    const content = document.createElement('div');
    content.classList.add('node_info');
    content.innerHTML = ReactDOM.createRoot(content).render(<NodeContent name={name} id={id} value={value} node_type={node_type}></NodeContent>); /** More verbose content to add */


    ele.tippy = tippy(node_content,{

        getReferenceClientRect: ref.getBoundingClientRect,
        content: content,
        trigger: 'manual',
        placement: 'top',
        interactive:true,
        hideOnClick:true,
        arrow:false,
        maxWidth:500,
        theme:"light",
        allowHTML: true,
        zIndex: 9999,
        })

    
}


function NodeContent({ name, id, value, node_type }) {

    return (

        <>
        <div className={"node_info"}>
        
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
      
            <tr>
      
              <td>
                      <p style={{align:"left", margin:"5px"}}>
                                <b>{value}</b>
                      </p>
              </td>
            </tr>
      
            
      
            <tr>
      
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', position: 'relative' }}>
                <strong>Identifier:</strong>
              </td>
      
      
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'justify' }}>
                {id}
              </td>
      
            </tr>
      
          </tbody>
        </table>

      </div>
      
              </>

    )





}


export function edgePopupContent(ele) {

    /**
     * Handles edge informations
     * 
     * 
     */

    const data = ele.data();
    const {source,target,docs } = data;

    const ref = ele.popperRef()
    const edge_content = document.createElement('div');
    document.body.appendChild(edge_content);

    const content = document.createElement('div');
    content.classList.add('edge_info');
    content.innerHTML = ReactDOM.createRoot(content).render(<EdgeContent source={source} target={target} docs={docs}></EdgeContent>); /** More verbose content to add */



    ele.tippy = tippy(edge_content,{
        getReferenceClientRect: ref.getBoundingClientRect,
        content: content,
        trigger: 'manual',
        placement: 'top',
        interactive:true,
        hideOnClick:true,
        arrow:false,
        maxWidth:700,
        theme:"light",
        allowHTML: true,
        zIndex: 9999,
        })



}


function EdgeContent({source,target,docs}){
    return (


        <div className='edge_info' style={{height:"300px", overflow:"scroll"}}>

<table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>

             {/** Table row for heading */}
            <tr>
      
              <td>
                      <p style={{align:"left", margin:"5px"}}>
                                <b>{source}--{target}</b>
                      </p>
              </td>
            </tr>
      
            
            {/** Table row for information of docs */}
            <tr>
      
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'left', position: 'relative' }}>
                <strong>Documents:</strong>
              </td>
      
      
              <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'justify', overflow: 'scroll' }}>
                <ul>

                
                {
                    docs.map((doc,index)=>{
                        return (<li key={index}>{
                            <a href={`https://pubmed.ncbi.nlm.nih.gov/${doc}`} target="_blank" rel="noopener noreferrer">{doc}</a>
                    }
                    </li>)
                    })

                }

</ul>
              </td>
      
            </tr>
      
          </tbody>
        </table>






        </div>
    )



}