import { clearSelectionData } from "../../redux/slices/selected/selection";
import { clearPlotData } from "../../redux/slices/plot/plot";
import { clearDisplayResult } from "../../redux/slices/displayResult/displayResult";
import { clearAllResponse } from "../../redux/slices/response/response";

function clearResponse(dispatch) {
    /**
     * Clear the response data, hence also clear the entites
     */
    dispatch(clearAllResponse(null));

    /** Clear the display result */
    dispatch(clearDisplayResult([]));
    dispatch(clearSelectionData([]));
    dispatch(clearPlotData([]));

    return(

        <>  </>
    )

}

export default clearResponse