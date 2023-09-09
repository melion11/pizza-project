import {configureStore} from "@reduxjs/toolkit";
import {filterReducer} from "./slices/filterSlice";
import {pizzaReducer} from './slices/pizzaSlice';
import {cartReducer} from '../components/Cart/cartSlice';


export const store = configureStore({
    reducer: {
        filter: filterReducer,
        pizza: pizzaReducer,
        cart: cartReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
