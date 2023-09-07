import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {CategoryType, filterActions} from '../../app/slices/filterSlice';


type CategoriesProps = {

}


export const Categories = ({}: CategoriesProps) => {

    const categories = useAppSelector(state => state.filter.categories)
    const categoryId = useAppSelector(state => state.filter.currentCategory.id)
    const dispatch = useAppDispatch()

    const changeCategory = (newCategory: CategoryType) => {
        dispatch(filterActions.changeCategory(newCategory))
    }

    const categoriesElements = categories.map(el => {
        return (
            <li key={el.id} onClick={()=> {changeCategory(el)}} className={categoryId === el.id ? "active" : ''}>{el.title}</li>
        )
    })

    return (
        <div className="categories">
            <ul>
                {categoriesElements}
            </ul>
        </div>
    );
};


