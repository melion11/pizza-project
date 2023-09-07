import React, {ChangeEvent, useState} from 'react';
import styles from './Search.module.scss';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {pizzaActions} from '../../app/slices/pizzaSlice';


type SearchProps = {

}

export const Search = ({}:SearchProps) => {

    const searchPizza = useAppSelector(state => state.pizza.searchPizza)
    const dispatch = useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(pizzaActions.getSearchPizza(e.currentTarget.value))
    }

    return (
        <div className={styles.root}>
            <svg className={`${styles.icon} ${styles.search}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#464646" d="m20.56 18.44-4.67-4.67a7 7 0 1 0-2.12 2.12l4.67 4.67a1.5 1.5 0 0 0 2.12 0 1.49 1.49 0 0 0 0-2.12ZM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5Z"/>
            </svg>
            <input onChange={onChangeHandler} value={searchPizza} className={styles.input} placeholder={'Pagination your favourite pizza...'}/>
            {searchPizza &&
                <svg onClick={()=> dispatch(pizzaActions.getSearchPizza(''))}
                     className={`${styles.icon} ${styles.delete}`} viewBox="0 0 20 19.84">
                    <path d="m10.17 10 3.89-3.89a.37.37 0 1 0-.53-.53L9.64 9.43 5.75 5.54a.37.37 0 1 0-.53.53L9.11 10l-3.89 3.85a.37.37 0 0 0 0 .53.34.34 0 0 0 .26.11.36.36 0 0 0 .27-.11l3.89-3.89 3.89 3.89a.34.34 0 0 0 .26.11.35.35 0 0 0 .27-.11.37.37 0 0 0 0-.53Z"/>
                </svg>}
        </div>
    );
};

