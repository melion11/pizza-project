import {createSlice} from '@reduxjs/toolkit';


export type SortType = {
    title: string
    sortBy: 'rating' | 'price' | 'title'
}

export type CategoryType = {
    id: number
    title: string
}

type InitialStateType = {
    categories: CategoryType[]
    currentCategory: CategoryType
    sortTypes: SortType[]
    currentSortType: SortType
    order: 'desc' | 'asc'
}

const initialState: InitialStateType = {
    categories: [
        {id: 0, title: 'All'},
        {id: 1, title: 'Meat'},
        {id: 2, title: 'Vegetarian'},
        {id: 3, title: 'Grill'},
        {id: 4, title: 'Sharp'},
        {id: 5, title: 'Closed'},
    ],
    sortTypes: [
        {title: 'popularity', sortBy: 'rating'},
        {title: 'price', sortBy: 'price'},
        {title: 'the alphabet', sortBy: 'title'}
    ],
    currentCategory: {id: 0, title: 'All'},
    currentSortType: {title: 'popularity', sortBy: 'rating'},
    order: 'desc'
}

const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.currentCategory = action.payload
        },
        changeSortType: (state, action) => {
            state.currentSortType = action.payload
        },
        changeOrderType: (state, action) => {
            state.order = action.payload
        },
    }
})

export const filterActions = slice.actions
export const filterReducer = slice.reducer