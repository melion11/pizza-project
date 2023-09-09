import {createSlice} from '@reduxjs/toolkit';


export type SortType = {
    title: string
    sortBy: 'rating' | 'price' | 'title'
}

export type CategoryType = {
    id: number
    title: string
}

export type OrderType =  'desc' | 'asc'

type InitialStateType = {
    searchPizza: string
    categories: CategoryType[]
    currentCategory: CategoryType
    sortTypes: SortType[]
    currentSortType: SortType
    order: OrderType
    totalCount: number
    currentPage: number
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
    order: 'desc',
    totalCount: 10,
    currentPage: 1,
    searchPizza: '',
}

const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        getSearchPizza: (state, action) => {
            state.searchPizza = action.payload
        },
        changeCategory: (state, action) => {
            state.currentCategory = action.payload
        },
        changeSortType: (state, action) => {
            state.currentSortType = action.payload
        },
        changeOrderType: (state, action) => {
            state.order = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            state.currentPage = Number(action.payload.page)
            state.currentCategory = action.payload.category
            state.currentSortType = action.payload.sort
        },
        resetFilters: (state) => {
            state.currentSortType = {title: 'popularity', sortBy: 'rating'}
            state.currentCategory = {id: 0, title: 'All'}
            state.currentPage = 1
        }
    }
})

export const filterActions = slice.actions
export const filterReducer = slice.reducer