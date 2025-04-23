import { createSlice } from "@reduxjs/toolkit";


 const plotSlice = createSlice({
    name:"plot",
    initialState: {

        data: [], /** create an empty array */
        toShow:false

    },

    reducers: {

        /**
         * Add plot contains the selected entity as well
         * 
         */
        addPlotData(state,action){

            return {
                ...state,
                data: [...state.data,action.payload]
            }

        },
        removePlotData(state,action){

            return {

                ...state,
                data: state.data.filter((entity) => entity.id !== action.payload)

            }

        },

        clearPlotData(state,action){

            state.data = action.payload

        }





    }
 })

 const plotReducer = plotSlice.reducer;
 export const { addPlotData,removePlotData,clearPlotData } = plotSlice.actions; // Export the addScore action creator

 export default plotReducer