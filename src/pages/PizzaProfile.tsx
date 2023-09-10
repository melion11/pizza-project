import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {pizzaActions, pizzaThunks} from '../app/slices/pizzaSlice';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {Skeleton} from '../components/PizzaBlock/Skeleton';


export const PizzaProfile = () => {

    const pizzaProfile = useAppSelector(state => state.pizza.currentPizza)
    const {id} = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(pizzaThunks.getPizzaProfile({id: Number(id)}))
        }

        return () => {
            dispatch(pizzaActions.resetPizzaProfile())
        }

    }, [])


    return (
        <div className="container">
            <div className="pizza-block-wrapper">
                {!pizzaProfile ?
                    <Skeleton/> :
                <div className="pizza-block">
                        <img
                            className="pizza-block__image"
                            src={pizzaProfile.imageUrl}
                            alt="Pizza"
                        />
                        <h4 className="pizza-block__title">{pizzaProfile.title}</h4>
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">from {pizzaProfile.price}₽</div>
                        <div className="button button--outline button--add">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Add</span>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};
