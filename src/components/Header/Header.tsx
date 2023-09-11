import React, {useCallback} from 'react';
import pizzaLogo from '../../assets/img/pizza-logo.svg'
import {Link, useLocation} from 'react-router-dom';
import {Search} from '../ui/Search/Search';
import {useAppDispatch, useAppSelector} from '../../app/hooks/hooks';
import debounce from 'lodash.debounce';
import {filterActions} from '../../features/Filter/filterSlice';
import {selectCart} from '../../features/Cart/cart.selectors';
import {CartIcon} from '../ui/svg/CartIcon';


export const Header = () => {

    const {totalPrice, items} = useAppSelector(selectCart)
    const dispatch = useAppDispatch()
    const location = useLocation()

    const totalCount = items.reduce((sum, item) => {
        return item.count + sum
    }, 0)

    const updateSearchValue = useCallback(debounce((searchValue: string) => {
        dispatch(filterActions.getSearchPizza(searchValue))
    }, 500), [])

    const onClearHandler = () => {
        dispatch(filterActions.getSearchPizza(''))
    }

    const resetFiltersHandler = () => {
        dispatch(filterActions.resetFilters())
    }

    return (
        <div className="header">
            <div className="container">
                <Link onClick={resetFiltersHandler} to={'/'}>
                    <div className="header__logo">
                        <img width="38" src={pizzaLogo} alt="Pizza logo"/>
                        <div>
                            <h1>Mel Pizza</h1>
                            <p>the most delicious pizza in the universe</p>
                        </div>
                    </div>
                </Link>
                {location.pathname !== '/cart' &&
                    <>
                        <Search onUpdateSearchValue={updateSearchValue} onClear={onClearHandler}/>
                        <div className="header__cart">
                            <Link to={'/cart'} className="button button--cart">
                                <span>{totalPrice} ₽</span>
                                <div className="button__delimiter"></div>
                                <CartIcon/>
                                <span>{totalCount}</span>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

