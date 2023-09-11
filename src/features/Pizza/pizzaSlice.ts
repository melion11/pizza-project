import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {pizzaApi} from '../../app/api/pizza-api';
import {createAppAsyncThunk} from '../../common/utils/create-app-async-thunk';
import {getPizzasArgs, PizzaInitialState, PizzaType, Status} from './types';

const initialState: PizzaInitialState = {
    pizzaItems: [],
    currentPizza: null,
    status: Status.IDLE,
    error: ''
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
    async (arg: { id: string }, thunkAPI) => {
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
            state.status = Status.LOADING
        })
        builder.addCase(getPizzas.fulfilled, (state, action: PayloadAction<{ items: PizzaType[] }>) => {
            state.pizzaItems = action.payload.items
            state.status = Status.SUCCEEDED
        })
        builder.addCase(getPizzas.rejected, (state, action) => {
            state.status = Status.FAILED
        })
        builder.addCase(getPizzaProfile.pending, (state) => {
            state.pizzaItems = []
            state.status = Status.LOADING
        })
        builder.addCase(getPizzaProfile.fulfilled, (state, action: PayloadAction<{ item: PizzaType }>) => {
            state.currentPizza = action.payload.item
            state.status = Status.SUCCEEDED
        })
        builder.addCase(getPizzaProfile.rejected, (state, action) => {
            state.status = Status.FAILED
        })
    }
})

export const pizzaThunks = {getPizzas, getPizzaProfile}
export const pizzaActions = slice.actions
export const pizzaReducer = slice.reducer

