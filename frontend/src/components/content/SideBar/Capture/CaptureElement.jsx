import React,{useMemo} from 'react'
import { captureProcessor } from '../utils/captureProcessor';
import CaptureHead from './CaptureHead';

function CaptureElement({data}) {
 
 /**
  * 
  * processing data
  */
  const processedData = useMemo(() => {
      return captureProcessor(data);
  }, [data,]);

  
  const containerStyle = {
    position: "relative",
    margin: '5px 0',
    padding: '5px',
    borderRadius: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  };


  return (
    <div style={containerStyle}>

      {Object.keys(processedData).map((key)=>{

        return (<CaptureHead name={key} data={processedData[key]}></CaptureHead>)
      })}
      
    </div> 
  )
}

export default CaptureElement
