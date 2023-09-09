import React, {useEffect, useRef, useState} from 'react';
import {Categories} from '../components/Categories/Categories';
import {Sort} from '../components/Sort/Sort';
import {PizzaBlock} from '../components/PizzaBlock/PizzaBlock';
import {Skeleton} from '../components/PizzaBlock/Skeleton';
import axios from 'axios';
import {Pagination} from '../components/Pagination/Pagination';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {filterActions} from '../app/slices/filterSlice';
import qs from 'qs'
import {useNavigate, useSearchParams} from "react-router-dom";

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


type HomeProps = {}

export const Home = ({}: HomeProps) => {

    const searchPizza = useAppSelector(state => state.pizza.searchPizza)
    const {
        currentPage,
        currentCategory,
        currentSortType,
        order,
        sortTypes,
        categories
    } = useAppSelector(state => state.filter)

    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState<PizzaType[]>([])

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)


    const fetchPizzas = () => {
        const category = currentCategory.id > 0 ? `&category=${currentCategory.id}` : ''
        const sort = `&sortBy=${currentSortType.sortBy}`
        const orderType = `&order=${order}`
        const search = searchPizza ? `&search=${searchPizza}` : ''

        setIsLoading(true)
        axios.get(`https://64f6308e2b07270f705e43e0.mockapi.io/items?page=${currentPage}&limit=4${category}${sort}${orderType}${search}`)
            .then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                page: currentPage,
                categoryId: currentCategory.id,
                sortBy: currentSortType.sortBy
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [currentCategory.id, currentSortType.sortBy, order, currentPage])


    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortTypes.find(c => c.sortBy === params.sortBy)
            const category = categories.find(c => c.id === Number(params.categoryId))
            dispatch(filterActions.setFilters({...params, sort, category}))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false

    }, [currentCategory.id, currentSortType.sortBy, order, searchPizza, currentPage])

    const onChangePageHandler = (newPage: number) => {
        dispatch(filterActions.setCurrentPage(newPage));
    }


    // const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))

    const pizzasElements = items.map(pizza => {
        const {id, price, imageUrl, title, category, rating, sizes, types} = pizza

        return (
            <PizzaBlock key={id} id={id} title={title}
                        price={price} imageUrl={imageUrl}
                        types={types} sizes={sizes} rating={rating} category={category}/>
        )
    })

    const skeletonElements = [...new Array(9)].map((_, index) => <Skeleton key={index}/>)


    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">All pizza's</h2>
            <div className="content__items">
                {isLoading ? skeletonElements : pizzasElements}
            </div>
            <Pagination onChangePage={onChangePageHandler} itemsPerPage={4}/>
        </div>
    );
};

