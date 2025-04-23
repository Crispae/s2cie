import { createSlice } from "@reduxjs/toolkit";

const displayResultSlices = createSlice({
    name:"displayResult",
    initialState:{
        data:[]
    },
    reducers:{

        addDisplayResult(state,action){

            /**
             * Add display result to the state
             */
            state.data = action.payload;
        },

        removeDisplayResult(state,action){
            /**
             * 
             * Remove display result from the state
             * 
             */

            state.data = action.payload
            console.log(state.data)

        },

        clearDisplayResult(state,action){
            state.data = action.payload     
        }

}})

const displayResultReducer = displayResultSlices.reducer; // Export the reducers
export const { addDisplayResult,removeDisplayResult,clearDisplayResult } = displayResultSlices.actions; // Export the addScore action creator
export default displayResultReducer;