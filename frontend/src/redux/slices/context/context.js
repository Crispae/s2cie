import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../response/requestService";

export const getContext = createAsyncThunk("context/getContext", async (input)=>{
return request(input)
})

const contextSlice = createSlice({
    name: "Context",
    initialState : {
        data : null,
        loading: false,
        error: null
    },
    reducers: {},

    extraReducers: (builder) =>{
        
        builder
        
        .addCase(getContext.pending,(state) =>{

            state.loading = true

        })

        .addCase(getContext.fulfilled, (state,action) =>{

            state.loading =false;
            state.data = action.payload; /** Updating the data in this */
            state.error = action.payload.error !== undefined ? action.payload.error :null

        })

        .addCase(getContext.rejected, (state,action)=>{

            state.loading =false;
            state.error = action.error.message
        })
    }
})


const contextReducer = contextSlice.reducer;

export default contextReducer