import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Element from './Element';
import VisualDisplay from './Visual/VisualDisplay';


function Bar() {

const dispatchResponse = useSelector((state) =>{

    if (state.response.data && state.response.data.result === "successful"){
  
      /**
       * FIXME: Need to make object flat
       * 
       */
      return state.response.data.response
    }
  
  })

  console.log(dispatchResponse)

const plotDataArray = useSelector((state) =>state.plot.data)
const scoreData = useSelector((state) => state.context.data)


/**
   * 1. keep listening for update in response. [done]
   * 2. Capture the document ids from response. [done]
   * 3. Send the document ids(or PMIDS) in backend and retrieve the whole document annotations [Done]
   * 4. capture the entities and group them according to entity type [Done in backend]
   * 5. entity type will be clustered as under the id
   * 6. Pass the entity type to their respective element
   */

  const elements = [
    { name: 'Gene', map_id: 'gene' },
    { name: 'Chemical', map_id: 'drug' },
    { name: 'Disease', map_id: 'disease' },
    { name: 'Cell type', map_id: 'cell_type' },
    { name: 'Cell line', map_id: 'cell_line' },
    { name: 'Species', map_id: 'species' },
    { name: 'Mutation', map_id: 'mutation' },
    { name: 'DNA', map_id: 'DNA' },
    { name: 'RNA', map_id: 'RNA' },
    { name: 'Capture', map_id: 'Capture' },
  ];

  const bar_container_style = {
    height: '100%',
    width: '100%',
    border: '1px solid lightgray',
    borderRadius: '4px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', // Add shadow
  };

  return (
    <Container fluid style={bar_container_style}>

      {elements.map((item, index) => (

        item.map_id === 'Capture' ? 
        (<Element
          key={index}
          name={item.name}
          elementType={item.map_id}
          _info={dispatchResponse}/>):
        
        (<Element
          key={index}
          name={item.name}
          elementType={item.map_id}
          _info={dispatchResponse && dispatchResponse.annotation[item.map_id]}
          />)
      
      
      ))}


      {/** This component just render the section, to access the visualization */}
      <VisualDisplay plotData={plotDataArray}
                     annotationData={dispatchResponse && dispatchResponse.annotation}
                     scoredResponse={scoreData}
      >
        
      </VisualDisplay>

        {/*<IndexServer></IndexServer> */}


    </Container>
  );
}

export default Bar;
