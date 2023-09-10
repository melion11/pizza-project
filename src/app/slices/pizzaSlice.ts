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
    currentPizza: PizzaType | null
    status: 'idle' | 'succeeded' | 'loading' | 'failed',
    error: string
}

const initialState: InitialStateType = {
    pizzaItems: [],
    currentPizza: null,
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

const getPizzaProfile = createAppAsyncThunk('pizza/getProfile',
    async (arg: {id: number}, thunkAPI)=> {
        try {
            const res = await pizzaApi.getPizzaProfile(arg.id)
            return {item: res.data}
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    })


const slice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        resetPizzaProfile(state) {
            state.currentPizza = null
        }
    },
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
        builder.addCase(getPizzaProfile.pending, (state)=> {
            state.pizzaItems = []
            state.status = 'loading'
        })
        builder.addCase(getPizzaProfile.fulfilled, (state, action: PayloadAction<{ item: PizzaType }>) => {
            state.currentPizza = action.payload.item
            state.status = 'succeeded'
        })
        builder.addCase(getPizzaProfile.rejected, (state, action) => {
            state.status = 'failed'
        })
    }
})

export const pizzaThunks = {getPizzas, getPizzaProfile}
export const pizzaActions = slice.actions
export const pizzaReducer = slice.reducer

