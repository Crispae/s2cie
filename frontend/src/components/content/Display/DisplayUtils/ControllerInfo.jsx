import React from 'react'
import { RxTimer } from 'react-icons/rx';
import {SiAmazondocumentdb} from 'react-icons/si'
import {useSelector } from 'react-redux';


function ControllerInfo() {
  /**
   * 
   * FIXME: Try not to use context pass only prop
   * 
   */
  const dispatchResponse = useSelector((state) =>{

    if (state.response.data && state.response.data.result === "successful"){
  
      /**
       * FIXME: Need to make object flat
       * 
       */
      return state.response.data.response
    }
  
  })

  return (


    
    <div>


            <div  style={{display:"flex",gap:"20px"}}>

                {/** Duration */}
                <div>
                    <RxTimer size={22} ></RxTimer>
                    {dispatchResponse && <span style={{ marginLeft: '5px' }}>{dispatchResponse.duration.toFixed(2)} secs</span>}
                </div>
                
                {/** Count of documents */}
                <div>
                  <SiAmazondocumentdb size={22} ></SiAmazondocumentdb>
                  
                  {dispatchResponse && <span style={{ marginLeft: '5px' }}>{dispatchResponse.count}</span>}

                </div>
              
            </div>

     

    </div>
  )
}

export default ControllerInfo
