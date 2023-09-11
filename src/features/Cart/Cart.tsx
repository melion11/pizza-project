import React from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks/hooks';
import {CartItem} from './CartItem/CartItem';
import {cartActions} from './cartSlice';
import {CartEmpty} from './CartEmpty/CartEmpty';
import {selectCart} from './cart.selectors';
import {CartIcon} from '../../components/ui/svg/CartIcon';
import {CartClear} from '../../components/ui/svg/CartClear';
import {LeftArrow} from '../../components/ui/svg/LeftArrow';


export const Cart = () => {

    const {items, totalPrice} = useAppSelector(selectCart)
    const dispatch = useAppDispatch()

    const cartElements = items.map(item => {
        const {id, title, price, imageUrl, count, type, size} = item
        return (
            <CartItem key={id} id={id} title={title}
                      price={price} imageUrl={imageUrl} type={type}
                      count={count} size={size}/>
        )
    })

    const totalCount = items.reduce((sum, item) => {
        return item.count + sum
    }, 0)

    const clearItemsHandler = () => {
        if (window.confirm('Do you want clear cart?'))
            dispatch(cartActions.clearItems())
    }

    if (!items.length) {
        return <CartEmpty/>
    }

    return (
        <div className="container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        <CartIcon/>
                        Cart
                    </h2>
                    <div onClick={clearItemsHandler} className="cart__clear">
                        <CartClear/>
                        <span>Clear cart</span>
                    </div>
                </div>
                <div className="content__items">
                    {cartElements}
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span> Total pizzas: <b>{totalCount} pcs.</b> </span>
                        <span> Order total: <b>{totalPrice} ₽</b> </span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to={'/'} className="button button--outline button--add go-back-btn">
                            <LeftArrow/>
                            <span>Go back</span>
                        </Link>
                        <button className="button pay-btn">
                            Pay now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


