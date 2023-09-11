import {Order, SortBy} from "../Filter/types";

export type PizzaInitialState = {
    pizzaItems: PizzaType[]
    currentPizza: PizzaType | null
    status: Status,
    error: string
}


export type PizzaType = {
    id: string
    imageUrl: string
    title: string
    types: [0, 1]
    sizes: number[]
    price: number
    category: number
    rating: number
}

export enum Status {
    IDLE = 'idle',
    SUCCEEDED = 'succeeded',
    LOADING = 'loading',
    FAILED = 'failed',
}

export type getPizzasArgs = {
    currentPage: number
    currentCategoryId: number
    currentSortType: SortBy
    order: Order
    searchPizza: string
}