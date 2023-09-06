import React, {useEffect, useState} from 'react';
import {Categories} from '../components/Categories/Categories';
import {Sort} from '../components/Sort/Sort';
import {PizzaBlock} from '../components/PizzaBlock/PizzaBlock';
import {Skeleton} from '../components/PizzaBlock/Skeleton';
import axios from 'axios';

export type SortType = {
    title: string
    sortBy: 'rating' | 'price' | 'title'
}


export const Home = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [items, setItems] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [orderType, setOrderType] = useState<'desc' | 'asc'>('desc')
    const [sortType, setSortType] = useState<SortType>({title: 'popularity', sortBy: 'rating'})


    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://64f6308e2b07270f705e43e0.mockapi.io/items?${
            categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortBy}&order=${orderType}`)
            .then((res) => {
            setItems(res.data)
            setIsLoading(false)
        })
        window.scrollTo(0,0)
    }, [categoryId, sortType, orderType])


    const changeCategory = (newCategoryId: number) => {
        setCategoryId(newCategoryId)
    }

    const changeSortType = (newSortType: SortType) => {
        setSortType(newSortType)
    }

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
        </div>
    );
};

