import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type PizzaItem = {
    id: number,
    imageUrl: string,
    title: string,
    type: string,
    size: number,
    price: number,
    count: number
}

type InitialState = {
    items: PizzaItem[]
    totalPrice: number
}

const initialState: InitialState = {
    items: [],
    totalPrice: 0
}

const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<{ item: PizzaItem }>) => {
            const index = state.items.findIndex(item => item.id === action.payload.item.id)
            const findItem = state.items[index]
            if (index > -1) {
                findItem.count++
            } else {
                state.items.push(action.payload.item)
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.price * item.count) + sum
            }, 0)
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload)
            const findItem = state.items[index]
            if (index > -1) {
                state.totalPrice = state.totalPrice - findItem.price
                if (findItem.count > 1) {
                    findItem.count--
                } else {
                    state.items.splice(index, 1)
                }
            }
        },
        clearItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload)
            const findItem = state.items[index]
            if (index > -1) {
                state.totalPrice = state.totalPrice - (findItem.count * findItem.price)
                state.items.splice(index, 1)

            }
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        }
    }
})


export const cartActions = slice.actions
export const cartReducer = slice.reducer