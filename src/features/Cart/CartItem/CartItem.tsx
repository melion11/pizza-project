import React from 'react';
import {useAppDispatch} from '../../../app/hooks/hooks';
import {cartActions} from '../cartSlice';
import {PizzaItem} from '../types';
import {MinusIcon} from '../../../components/ui/svg/MinusIcon';
import {PlusIcon} from '../../../components/ui/svg/PlusIcon';
import {DeleteCartIcon} from '../../../components/ui/svg/DeleteCartIcon';

type CartItem = {
    id: string,
    imageUrl: string,
    title: string,
    type: string,
    size: number,
    price: number,
    count: number
}


export const CartItem = ({id, count, price, imageUrl, title, type, size}: CartItem) => {

    const dispatch = useAppDispatch()

    const removeItemHandler = () => {
        dispatch(cartActions.removeItem({id, size, type, count, price}))
    }

    const clearItemHandler = () => {
        dispatch(cartActions.clearItem({id, size, type, price}))
    }

    const addItemHandler = () => {
        const item: PizzaItem = {
            id,
            title,
            price,
            imageUrl,
            type: type,
            size: size,
            count: 1
        }
        dispatch(cartActions.addItem({item}))
    }


    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>{type}, {size} cm.</p>
            </div>
            <div className="cart__item-count">
                <button disabled={count === 1} onClick={removeItemHandler}
                        className={'button button--outline button--circle cart__item-count-minus'}>
                    <MinusIcon/>
                </button>
                <b>{count}</b>
                <button onClick={addItemHandler}
                        className="button button--outline button--circle cart__item-count-plus">
                    <PlusIcon/>
                </button>
            </div>
            <div className="cart__item-price">
                <b>{price * count} ₽</b>
            </div>
            <div className="cart__item-remove">
                <div onClick={clearItemHandler} className="button button--outline button--circle">
                    <DeleteCartIcon/>
                </div>
            </div>
        </div>
    );
};


