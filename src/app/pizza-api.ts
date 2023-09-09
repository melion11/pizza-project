import axios from 'axios';
import {OrderType} from './slices/filterSlice';


const instance = axios.create({
    baseURL: 'https://64f6308e2b07270f705e43e0.mockapi.io/'
})


export const pizzaApi = {
    fetchPizzas(currentPage: number, currentCategory: number,
              currentSortType: string, order: OrderType, searchPizza: string) {
        const category = currentCategory > 0 ? `&category=${currentCategory}` : ''
        const sort = `&sortBy=${currentSortType}`
        const orderType = `&order=${order}`
        const search = searchPizza ? `&search=${searchPizza}` : ''

        return instance.get(`items?page=${currentPage}&limit=4${category}${sort}${orderType}${search}`)
    }
}