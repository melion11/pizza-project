import React, {useEffect, useState} from 'react';
import {Categories} from '../components/Categories/Categories';
import {Sort} from '../components/Sort/Sort';
import {PizzaBlock} from '../components/PizzaBlock/PizzaBlock';
import {Skeleton} from '../components/PizzaBlock/Skeleton';
import axios from 'axios';
import {Pagination} from '../components/Pagination/Pagination';
import {useAppSelector} from '../app/hooks';


export type PizzaType = {
    id: number
    imageUrl: string
    title: string
    types: [0,1]
    sizes: number[]
    price: number
    category: number
    rating: number
}


type HomeProps = {

}

export const Home = ({}:HomeProps) => {

    const categoryId = useAppSelector(state => state.filter.currentCategory.id)
    const currentSortBy = useAppSelector(state => state.filter.currentSortType.sortBy)
    const order = useAppSelector(state => state.filter.order)
    const searchPizza = useAppSelector(state => state.pizza.searchPizza)

    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState<PizzaType[]>([])
    const [currentPage, setCurrentPage] = useState(1)




    useEffect(() => {
        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const sort = `&sortBy=${currentSortBy}`
        const orderType = `&order=${order}`
        const search = searchPizza ? `&search=${searchPizza}` : ''

        setIsLoading(true)
        axios.get(`https://64f6308e2b07270f705e43e0.mockapi.io/items?page=${currentPage}&limit=4${category}${sort}${orderType}${search}`)
            .then((res) => {
            setItems(res.data)
            setIsLoading(false)
        })
        window.scrollTo(0,0)
    }, [categoryId, currentSortBy, order, searchPizza, currentPage])




    const changePage = (selectedPage: number) => {
        setCurrentPage(selectedPage)
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
            <Pagination changePage={changePage} items={items} itemsPerPage={4}/>
        </div>
    );
};

