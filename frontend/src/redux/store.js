import { configureStore,applyMiddleware} from "@reduxjs/toolkit";
import { composeWithDevTools } from '@redux-devtools/extension';

import responseReducer from "./slices/response/response";
import contextReducer from "./slices/context/context";
import plotReducer from "./slices/plot/plot";
import selectionReducer from "./slices/selected/selection";
import displayResultReducer from "./slices/displayResult/displayResult";

const store = configureStore(
    
    {

    reducer: {
        response:responseReducer,
        context: contextReducer,
        plot: plotReducer,
        selection: selectionReducer,
        displayResult: displayResultReducer
    },

},composeWithDevTools(applyMiddleware()) );

export default store;