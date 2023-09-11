import axios from 'axios';
import {Order, SortBy} from "../../features/Filter/types";
import {PizzaType} from "../../features/Pizza/types";


const instance = axios.create({
    baseURL: 'https://64f6308e2b07270f705e43e0.mockapi.io/'
})


export const pizzaApi = {
    fetchPizzas(currentPage: number, currentCategory: number,
              currentSortType: SortBy, order: Order, searchPizza: string) {

        const category = currentCategory > 0 ? `&category=${currentCategory}` : ''
        const sort = `&sortBy=${currentSortType}`
        const orderType = `&order=${order}`
        const search = searchPizza ? `&search=${searchPizza}` : ''

        return instance.get<PizzaType[]>(`items?page=${currentPage}&limit=4${category}${sort}${orderType}${search}`)
    },
    getPizzaProfile(id: string) {
        return instance.get<PizzaType>(`items/${id}`)
    }
}