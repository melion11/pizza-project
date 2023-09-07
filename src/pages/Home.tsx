import React, {useContext, useEffect, useState} from 'react';
import {Categories} from '../components/Categories/Categories';
import {Sort} from '../components/Sort/Sort';
import {PizzaBlock} from '../components/PizzaBlock/PizzaBlock';
import {Skeleton} from '../components/PizzaBlock/Skeleton';
import axios from 'axios';
import {Pagination} from '../components/Pagination/Pagination';
import {SearchContext} from "../App";

export type SortType = {
    title: string
    sortBy: 'rating' | 'price' | 'title'
}


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

    const {searchValue} = useContext(SearchContext)

    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState<PizzaType[]>([])
    const [categoryId, setCategoryId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [orderType, setOrderType] = useState<'desc' | 'asc'>('desc')
    const [sortType, setSortType] = useState<SortType>({title: 'popularity', sortBy: 'rating'})


    useEffect(() => {

        const category = categoryId > 0 ? `&category=${categoryId}` : ''
        const sort = `&sortBy=${sortType.sortBy}`
        const order = `&order=${orderType}`
        const search = searchValue ? `&search=${searchValue}` : ''

        setIsLoading(true)
        axios.get(`https://64f6308e2b07270f705e43e0.mockapi.io/items?page=${currentPage}&limit=4${category}${sort}${order}${search}`)
            .then((res) => {
            setItems(res.data)
            setIsLoading(false)
        })
        window.scrollTo(0,0)
    }, [categoryId, sortType, orderType, searchValue, currentPage])


    const changeCategory = (newCategoryId: number) => {
        setCategoryId(newCategoryId)
    }

    const changeSortType = (newSortType: SortType) => {
        setSortType(newSortType)
    }

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
                <Categories value={categoryId} changeCategory={changeCategory}/>
                <Sort orderType={orderType} onChangeOrderType={setOrderType}
                      value={sortType} changeSortType={changeSortType}/>
            </div>
            <h2 className="content__title">All pizza's</h2>
            <div className="content__items">
                {isLoading ? skeletonElements : pizzasElements}
            </div>
            <Pagination changePage={changePage} items={items} itemsPerPage={4}/>
        </div>
    );
};

