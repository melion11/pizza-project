import {configureStore} from "@reduxjs/toolkit";
import {filterReducer} from "./slices/filterSlice";
import {pizzaReducer} from './slices/pizzaSlice';


export const store = configureStore({
    reducer: {
        filter: filterReducer,
        pizza: pizzaReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
