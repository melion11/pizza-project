import React from 'react';
import './App.css';
import './scss/app.scss'
import {Header} from "./components/Header/Header";
import {Categories} from "./components/Categories/Categories";
import {Sort} from "./components/Sort/Sort";
import {PizzaBlock} from "./components/PizzaBlock/PizzaBlock";
import items from './assets/pizza.json'

function App() {


    const pizzasElements = items.map(pizza => {
        const {id, price, imageUrl, title, category, rating, sizes, types} = pizza

        return (
            <PizzaBlock key={id} id={id} title={title}
                        price={price} imageUrl={imageUrl}
                        types={types} sizes={sizes} rating={rating} category={category}
            />
        )
    })



    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">All pizza's</h2>
                    <div className="content__items">
                        {pizzasElements}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default App;
