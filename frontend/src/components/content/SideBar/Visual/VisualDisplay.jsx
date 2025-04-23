import React,{useState,useCallback} from 'react';
import { VscGraph } from 'react-icons/vsc';
import { PiGraphFill } from "react-icons/pi";
import BottomDrawer from '../../Drawer/DisplayDrawer';

const iconStyle = {
  fontSize: '30px',
  cursor: 'pointer',
  color: '#007BFF',
  marginRight: '5px',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  margin:"3px",
  padding: '5px',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
  textAlign: 'center',
};

const headingStyle = {
  fontSize: '12px',
  fontWeight: 'bold',
  marginLeft: '8px',
};

function VisualDisplay({plotData,
                        annotationData,
                        scoredResponse}) {
  const [drawer,setDrawer] = useState(false)

  /** Wrap the callback to make effective memoize */
  const closeDrawer = useCallback((state)=>{

    setDrawer(!state)

  },[])


  return (

    <>

    <div>
      <hr />
      {/** Options list  */}
      <div style={containerStyle}>
        <VscGraph size={30} onClick={() => setDrawer((event) => !event)} style={iconStyle} />
        <h3 style={headingStyle}>Visualizations</h3>
      </div>

      <div style={containerStyle}>
        <PiGraphFill size={30} style={iconStyle} />
        <h3 style={headingStyle}>Pathway Analysis</h3>
      </div>

    </div>

     {/**BottomDrawer handles all the visualization */}
      <BottomDrawer drawer={drawer}
                   drawerCallback={closeDrawer} 
                   plotData={plotData} 
                   annotationData={annotationData}
                   scoredResponse={scoredResponse}>
                
      </BottomDrawer>

    </>
  );
}

export default VisualDisplay;
