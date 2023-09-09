import React, {useEffect, useRef} from 'react';
import {Categories} from '../components/Categories/Categories';
import {Sort} from '../components/Sort/Sort';
import {PizzaBlock} from '../components/PizzaBlock/PizzaBlock';
import {Skeleton} from '../components/PizzaBlock/Skeleton';
import {Pagination} from '../components/Pagination/Pagination';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {filterActions} from '../app/slices/filterSlice';
import qs from 'qs'
import {useNavigate} from 'react-router-dom';
import {pizzaThunks} from '../app/slices/pizzaSlice';
import {Error} from '../components/Error/Error';


export const Home = () => {

    const {pizzaItems, status} = useAppSelector(state => state.pizza)
    const {currentPage, currentCategory, currentSortType, order, sortTypes, categories, searchPizza
    } = useAppSelector(state => state.filter)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const fetchPizzas = () => {
        dispatch(pizzaThunks.getPizzas(
            {currentPage, currentCategoryId: currentCategory.id,
            currentSortType: currentSortType.sortBy, order, searchPizza}
        ))
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

    const pizzasElements = pizzaItems.map(pizza => {
        const {id, price, imageUrl, title, category, rating, sizes, types} = pizza

        return (
            <PizzaBlock key={id} id={id} title={title}
                        price={price} imageUrl={imageUrl}
                        types={types} sizes={sizes} rating={rating} category={category}/>
        )
    })

    const skeletonElements = [...new Array(4)].map((_, index) => <Skeleton key={index}/>)


    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">All pizza's</h2>
            <div className="content__items">
                {status === 'loading' ? skeletonElements : pizzasElements}
                {status === 'failed' && <Error/>}
            </div>
            <Pagination onChangePage={onChangePageHandler} itemsPerPage={4}/>
        </div>
    );
};

