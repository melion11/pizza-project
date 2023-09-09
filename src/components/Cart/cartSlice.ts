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
            const findItem = state.items.find(item => {
                return ((item.id === action.payload.item.id) &&
                    (item.size === action.payload.item.size) &&
                    (item.type === action.payload.item.type))
            });
            findItem ? findItem.count++ : state.items.push({...action.payload.item});

            state.totalPrice = state.items.reduce((sum, item) => {
                return (item.price * item.count) + sum
            }, 0)
        },
        removeItem: (state, action) => {
            const findItem = state.items.find(item => {
                return ((item.id === action.payload.id) &&
                    (item.size === action.payload.size) &&
                    (item.type === action.payload.type))
            });
            if (findItem && findItem.count > 0) {
                findItem.count--;
                state.totalPrice -= findItem.price;
            }
        },
        clearItem: (state, action) => {
            const findItem = state.items.find(item => {
                return ((item.id === action.payload.id) &&
                    (item.size === action.payload.size) &&
                    (item.type === action.payload.type))
            });

            if (findItem) {
                state.totalPrice -= findItem.price * findItem.count;
                state.items = state.items.filter(item => {
                    return ((item.id !== action.payload.id) || (item.size !== action.payload.size) ||
                        (item.type !== action.payload.type))
                });

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