import React, {memo} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {CategoryType, filterActions} from '../../app/slices/filterSlice';
import useWhyDidYouUpdate  from 'ahooks/lib/useWhyDidYouUpdate';


export const Categories = memo(() => {

    const categories = useAppSelector(state => state.filter.categories)
    const categoryId = useAppSelector(state => state.filter.currentCategory.id)
    const dispatch = useAppDispatch()

    // useWhyDidYouUpdate('Categories', { categoryId, categories });

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
});


