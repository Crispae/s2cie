import { createSlice } from "@reduxjs/toolkit";

const selectionSlice = createSlice({
  name: "selection",
  initialState: {
    data: [],
  },
  reducers: {
    addSelectedData(state, action) {
      const { result, type } = action.payload;

      const existingIndex = state.data.findIndex(item => item.sentenceId === result.sentenceId);

      if (existingIndex !== -1) {

        state.data[existingIndex].selectionType = type

      }else {

        const newResult = {...result,selectionType:type}
        state.data.push(newResult);

      }
    },

    removeSelectedData(state, action) {
      const updatedSelectedArray = state.data.filter((element) => {
        return element.sentenceId !== action.payload.result.sentenceId;
      });
      state.data = updatedSelectedArray; // Converting a set to an array and then returning it to the state. { ...state, data: updatedSelectedArray };
    },

    clearSelectionData(state, action) {
      state.data = action.payload;
    },


  },
});

const selectionReducer = selectionSlice.reducer;
export const { addSelectedData, removeSelectedData,clearSelectionData } = selectionSlice.actions;
export default selectionReducer;
