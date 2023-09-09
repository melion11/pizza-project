import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {pizzaApi} from '../pizza-api';
import {createAppAsyncThunk} from '../../utils/create-app-async-thunk';
import {OrderType} from './filterSlice';

export type PizzaType = {
    id: number
    imageUrl: string
    title: string
    types: [0, 1]
    sizes: number[]
    price: number
    category: number
    rating: number
}

type InitialStateType = {
    pizzaItems: PizzaType[]
    status: 'idle' | 'succeeded' | 'loading' | 'failed',
    error: string
}

const initialState: InitialStateType = {
    pizzaItems: [],
    status: 'idle',
    error: ''
}


type getPizzasArgs = {
    currentPage: number
    currentCategoryId: number
    currentSortType: string
    order: OrderType
    searchPizza: string
}

const getPizzas = createAppAsyncThunk(
    'pizza/getPizzas',
    async (args: getPizzasArgs, {rejectWithValue}) => {
        const {currentPage, currentCategoryId, currentSortType, order, searchPizza} = args
        try {
            const items = await pizzaApi.fetchPizzas(currentPage, currentCategoryId, currentSortType, order, searchPizza)
            return {items: items.data}
        } catch (e: any) {
            return rejectWithValue(e)
        }
    }
)

const slice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPizzas.pending, (state, action) => {
            state.pizzaItems = []
            state.status = 'loading'
        })
        builder.addCase(getPizzas.fulfilled, (state, action: PayloadAction<{ items: PizzaType[] }>) => {
            state.pizzaItems = action.payload.items
            state.status = 'succeeded'
        })
        builder.addCase(getPizzas.rejected, (state, action) => {
            state.status = 'failed'
        })
    }
})

export const pizzaThunks = {getPizzas}
export const pizzaActions = slice.actions
export const pizzaReducer = slice.reducer

