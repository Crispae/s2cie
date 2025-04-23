import React from 'react';
import { RxCrossCircled, RxDownload, RxResume } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getResponse } from '../../../../redux/slices/response/response';



function ControllerButton({ name }) {


  // using Redux dispatch
  const dispatch = useDispatch()

  const dispatchResponse = useSelector((state) =>{

    if (state.response.data && state.response.data.result === "successful"){
  
      /**
       * FIXME: Need to make object flat
       * 
       */
      return state.response.data
    }
  
  })

  console.log(dispatchResponse)


/***
 * Function to load more content from the backend.
 */
function load(){

  /**
   * Capture document Id and score and query
   * @todo Always check the total results should be higher than loaded to load result other wise don't execute it
   * 
   */ 


  if (dispatchResponse){

    /**
     * 
     *  TODO: Check bugs fro
     * 
     * Bug: When we
     * From backend we also pass the complete key value pair,
     * Put condition to check 
     * 
     * 
     */
    
    
    /** TODO: Optimize it */
    
        const odinsonQuery = dispatchResponse.response.query
        const previousDocs = dispatchResponse.response.scores

        /**
         * 
         * Request data to load
         * 
         */
        let requestData = {"data":{"odinsonQuery":odinsonQuery,
                                      "prevDoc":previousDocs},
                            "type":"load"}

        /**
       * Dispatch the redux action
       */

        dispatch(getResponse(requestData))
        .then((action) =>{

          // Extract the response from the action
          console.log("old res")
          console.log(dispatchResponse)

          console.log("new res")
          const newResponse = action.payload

          console.log(newResponse)

          // combine the new response with previous response
          const combinedResponse =  {
            ...dispatchResponse,
            response:{...dispatchResponse.response,
            total_hits:[...dispatchResponse.response.total_hits,...newResponse.response.total_hits],
            count:dispatchResponse.response.count + newResponse.response.count,
            duration: dispatchResponse.response.duration + newResponse.response.duration,
            scores: newResponse.response.scores,
            query: newResponse.response.query,
            complete : newResponse.response.complete,
            annotation: {...dispatchResponse.response.annotation,
                        DNA: {...dispatchResponse.response.annotation.DNA,...newResponse.response.annotation.DNA},
                        RNA: {...dispatchResponse.response.annotation.RNA,...newResponse.response.annotation.RNA},
                        cell_line: {...dispatchResponse.response.annotation.cell_line,...newResponse.response.annotation.cell_line},
                        cell_type: {...dispatchResponse.response.annotation.cell_type,...newResponse.response.annotation.cell_type},
                        disease:{...dispatchResponse.response.annotation.disease,...newResponse.response.annotation.disease},
                        drug:{...dispatchResponse.response.annotation.drug,...newResponse.response.annotation.drug},
                        gene:{...dispatchResponse.response.annotation.gene,...newResponse.response.annotation.gene},
                        mutation:{...dispatchResponse.response.annotation.mutation,...newResponse.response.annotation.mutation},
                        species:{...dispatchResponse.response.annotation.species,...newResponse.response.annotation.species}
                        }
          },
            result: newResponse.result
          }

          // Update the state with combined response
          dispatch({
            type: 'response/getResponse/fulfilled',
            payload: combinedResponse
          })

        })
        .catch((error) =>{

          console.log(error)

        })
}


else{
    /**
     * Execute if all the articles are already loaded
     * 
     */
    toast.error("Matching sentences are already loaded or No content reaming")

  }


}

/***
 * 
 * Function to handle download
 * 
 */
function download(){
  /***
   * Take all the result displayed in result area and convert that into an
   * excel file to be downloaded.
   *
   */

  console.log("download clicked")
  
}


/**
 * 
 *Function to stop the request 
 */
function stop(){

console.log("Stop is clicked")
}

/**
 * MAP the icon name with function
 * provide dynamic adaption of function
 */
const function_mapping = {
  Load: load,
  Download: download,
  Stop: stop

}

  const buttonStyle = {
    marginRight: '10px',
    border: '1px solid lightgray',
    background: 'white',
    padding: '3px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  // Add a gap between the icon and the name
  const iconAndNameStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor:'pointer'

  };


  const iconMapping = {
    Load: RxResume,
    Stop: RxCrossCircled,
    Download: RxDownload,
  };

  const IconComponent = iconMapping[name];
  const onClickFunction = function_mapping[name];

  

  return (
    <div onClick={onClickFunction} style={buttonStyle}>
      <table>
        <tr>
          <td style={iconAndNameStyle}>
            {IconComponent && <IconComponent></IconComponent>}
            <span style={{ marginLeft: '5px' }}>{name}</span>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default ControllerButton;
