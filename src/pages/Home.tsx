import React, {useEffect, useState} from 'react';
import {Categories} from "../components/Categories/Categories";
import {Sort} from "../components/Sort/Sort";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import axios from "axios";


export const Home = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])


    useEffect(() => {
        axios.get('https://64f6308e2b07270f705e43e0.mockapi.io/items').then((res) => {
            setItems(res.data)
            setIsLoading(false)
        })
    }, [])

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
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">All pizza's</h2>
            <div className="content__items">
                {isLoading ? skeletonElements : pizzasElements}
            </div>
        </>
    )
        ;
};

