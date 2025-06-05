import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { provider } from "./reducer";

const initialState = {};

const store = configureStore({
    reducer: {
        provider,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(thunk), 
    devTools: true,
});

export default store;
