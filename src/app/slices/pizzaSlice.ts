import {createSlice} from "@reduxjs/toolkit";



type InitialStateType = {
   searchPizza: string
}

const initialState: InitialStateType = {
   searchPizza: ''
}

const slice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        getSearchPizza: (state, action) => {
            state.searchPizza = action.payload
        }
    }
})

export const pizzaActions = slice.actions
export const pizzaReducer = slice.reducer