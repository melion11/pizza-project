import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {pizzaActions, pizzaThunks} from '../pizzaSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/hooks';
import {AddIcon, Skeleton} from '../../../components';


 const PizzaProfile = () => {

    const pizzaProfile = useAppSelector(state => state.pizza.currentPizza)
    const {id} = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(pizzaThunks.getPizzaProfile({id}))
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
                        <img className="pizza-block__image" src={pizzaProfile.imageUrl}  alt="Pizza"/>
                        <h4 className="pizza-block__title">{pizzaProfile.title}</h4>
                        <div className="pizza-block__bottom">
                            <div className="pizza-block__price">from {pizzaProfile.price}₽</div>
                            <div className="button button--outline button--add">
                                <AddIcon/>
                                <span>Add</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default PizzaProfile;