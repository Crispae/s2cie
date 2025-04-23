import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import React, { useEffect, useRef } from 'react';
import Legend from './Legend';
import eventHandler from './popups/eventHandler';
import { nodePopupContent,edgePopupContent } from './popups/popup';

cytoscape.use(popper);


function PlotNetwork({ networkData }) {

  /** Create refrence for div for vis */
const cyRef = useRef(null);

// Cytoscape styles
const cytoscapeStyle = [

  {
    selector:'node',
    style:{
      content:'data(name)',
      'font-size':'6px'
    }
  },
  {
    selector: 'node[node_type = "gene"]',
    style: {
      'background-color': '#6FB1FC',
      'shape': 'ellipse' // Light Blue
    }
  },
  {
    selector: 'node[node_type = "drug"]',
    style: {
      'background-color': '#F5A45D',
      'shape': 'hexagon' // Orange
    }
  },
  {
    selector: 'node[node_type = "disease"]',
    style: {
      'background-color': '#E84A5F',
      'shape': 'triangle' // Red
    }
  },
  {
    selector: 'node[node_type = "cell_type"]',
    style: {
      'background-color': '#8E44AD',
      'shape': 'rectangle' // Purple
    }
  },
  {
    selector: 'node[node_type = "cell_line"]',
    style: {
      'background-color': '#3498DB',
      'shape': 'round-rectangle' // Blue
    }
  },
  {
    selector: 'node[node_type = "species"]',
    style: {
      'background-color': '#2ECC71',
      'shape': 'diamond' // Green
    }
  },

  {
    selector:'edge',
    style:{
      'line-color':'#ccc',
      'width':'2px'
    }
  }


]
 
function networkFormatter(networkData){
  
  const nodes = [];
  const edges = [];

  networkData.forEach(element => {
    // Check if the node is already present
    const sourceNode = nodes.find(node => node.data.id === element.x);
    const targetNode = nodes.find(node => node.data.id === element.y);

    if (!sourceNode) {
      nodes.push({ data: { id: element.x,
                           name: element.x,
                           value: element.x,
                           node_type: element.x_type
                           } });
    }

    if (!targetNode) {
      nodes.push({ data: { id: element.y,
                           name: element.y,
                           value: element.y,
                           node_type: element.y_type } });
    }

    edges.push({ data: { source: element.x,
                         target: element.y,
                         weight:element.count,
                         docs: element.common_docs } });
  });

  const elements = {nodes,edges};
  return elements

  }


/**
 * 
 * Todo: Add tippy.js functionality
 * 
 */

useEffect(()=>{

  if(cyRef.current && networkData){

    const cy = cytoscape({container:cyRef.current,
      elements:networkFormatter(networkData),
      layout:{
          name:"cose",
          animate:"true"
    },
    style:cytoscapeStyle});

    cy.ready(()=>{
      

      /**
       * Node Popper will be pouplated here with data       
       * */
      cy.nodes().forEach((element)=>{
        nodePopupContent(element)

      })


      /**
       * Here Edge popper will be populated with
       */
      cy.edges().forEach((element)=>{

          edgePopupContent(element)
      })

      /**
       * Function allows to handle the click event
       * 
       */
      eventHandler(cy);

    
    
          
      })




}

  


},[networkData])
  

/**
 * 
 * Add functionality of pop-up when clicked on edge
 * 
 */
  
  return (

    <div style={{ position: 'relative', height: '420px', border: '1px solid #ccc' }}>
      <div ref={cyRef} style={{ width: '100%', height: '100%' }}></div>
      <Legend />
    </div>
    
  )
}

export default React.memo(PlotNetwork);
