import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {filterReducer} from "../features/Filter/filterSlice";
import {pizzaReducer} from '../features/Pizza/pizzaSlice';
import {cartReducer} from '../features/Cart/cartSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";


const rootReducer = combineReducers({
    filter: filterReducer,
    pizza: pizzaReducer,
    cart: cartReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
