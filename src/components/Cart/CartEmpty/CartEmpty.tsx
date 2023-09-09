import React from 'react';
import emptyCart from '../../../assets/img/empty-cart.png'
import {Link} from 'react-router-dom';





export const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>Cart empty 😕</h2>
            <p>
                Most likely, you haven't ordered pizza yet.<br/>
                To order pizza, go to the main page.
            </p>
            <img src={emptyCart} alt="Empty cart"/>
            <Link to="/" className="button button--black">
                <span>Go back</span>
            </Link>
        </div>
    );
};

