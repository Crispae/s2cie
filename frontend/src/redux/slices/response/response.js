import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "./requestService";

export const getResponse = createAsyncThunk("response/getResponse", async (input)=>{
return request(input)
})

const responseSlice = createSlice({
    name: "Response",
    initialState : {
        data : null,
        loading: false,
        error: null
    },
    reducers: {

        addScore(state,action){

            /**
             * adding the score to the response, It will be used 
             * to sort the result as per score
             * 
             * 
             */

            const score = action.payload

            /**
             * 
             * Scores get added to the response
             * 
             */

            if (score["status"] === "successful") {
            state.data.response.total_hits.forEach((element) => {

                element.context_score = score["scores"][element.documentId]
                
            });
        }

        },

        clearAllResponse(state,action){

            state.data = action.payload
            state.loading = false
            state.error = null
        }
    },


    extraReducers: (builder) =>{
        
        builder
        
        .addCase(getResponse.pending,(state) =>{

            state.loading = true

        })

        .addCase(getResponse.fulfilled, (state,action) =>{
            
            /**
             * 
             * After response from backend, updating state data
             * 
             */
            state.loading =false;
            state.data = action.payload; /** Updating the data in this */
            
            /**
             *  Check error on request as well on data as well
             * 
             */
            state.error = action.payload.error !== undefined ? action.payload.error :null

        })

        .addCase(getResponse.rejected, (state,action)=>{

            state.loading =false;
            state.error = action.error.message
        })
    }
})


const responseReducer = responseSlice.reducer;
export const { addScore,clearAllResponse } = responseSlice.actions; // Export the addScore action creator

export default responseReducer