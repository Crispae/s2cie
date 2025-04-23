import React, { useState,useEffect} from 'react';
import { FaWindowMinimize } from 'react-icons/fa6';
import Plotbar from '../SideBar/Visual/Plotbar';
import PlotMap from '../SideBar/Visual/PlotMap';
import ScorePlot from '../SideBar/Visual/ScorePlot';
import PlotNetwork from '../SideBar/Visual/PlotNetwork';
import { DataProcessor } from '../SideBar/Visual/DataProcessor';

const BottomDrawer = ({drawer,drawerCallback,plotData,annotationData,scoredResponse}) => {

  const [selectedPlot, setSelectedPlot] = useState('barplot'); // Initial selected plot
  const [heatmapData, setHeatmapData] = useState(()=>[]); /** Heatmap plot data */
  /**
   * Heatmap plot data will be used for network construction as well
   * 
   */



   /**
     * Process the plotData into the format of heatmap plot
     * {X:name1, Y:name2, count=Number}
     */
  useEffect(() => {
    const heatMapData = DataProcessor(plotData);
    setHeatmapData(heatMapData);
  }, [plotData,]);



  const renderSelectedPlot = () => {
    switch (selectedPlot) {
      case 'heatmap':
        return <PlotMap data={heatmapData} />;
      case 'barplot':
        return <Plotbar annotationData={annotationData} />;
      // Add more cases for other plot types
      case 'scoreplot':
        return <ScorePlot scoredResponse={scoredResponse}></ScorePlot>
      case 'network':
        return <PlotNetwork networkData={heatmapData}></PlotNetwork>
      default:
        return null;
    }
  };

  const buttonStyle = {
    marginRight: '10px',
    background: 'white',
    padding: '5px',
    fontSize:"12px",
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#333',
    transition: 'background 0.3s ease',
  }


  return (
    <>
      {drawer && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            opacity: '0.95',
            height: '500px',
            width: '100%',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px 8px 0 0',
            boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Navigation Pane */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'Left',
              padding: '5px',
              background:"#f0f0f0",
              borderBottom: '1px solid #ccc',
            }}
          >
            {/** On click State will be updated */}
            <button onClick={() => setSelectedPlot('barplot')} style={buttonStyle}> Bar Plot </button>

            <button onClick={() => setSelectedPlot('heatmap')} style={buttonStyle} >Heatmap </button>

            {/** Network visualization of occurence */}
            <button onClick={()=> setSelectedPlot('network')} style={buttonStyle} >Network </button>

            {/** Score desnity visualization */}
            <button onClick={() => setSelectedPlot('scoreplot')} style={buttonStyle} >Score Density Plot </button>

            
            {/* Add more buttons for other plot types */}


          </div>

          {/* Minimize Button */}
          <button
            style={{
              position: 'absolute',
              top: 0,
              right: 10,
              padding: '5px',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
            }}
            onClick={()=>{drawerCallback(drawer)}}
          >
            <FaWindowMinimize size={25}></FaWindowMinimize>
          </button>

          {/* Render the selected plot */}
          <div style={{ padding: '20px', alignContent:"center", }}>{renderSelectedPlot()}</div>
        </div>
      )}

</>
  );
};

export default React.memo(BottomDrawer);
