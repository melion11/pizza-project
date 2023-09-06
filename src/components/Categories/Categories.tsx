import React from 'react';


type CategoriesProps = {
    value: number
    changeCategory: (newCategoryId: number) => void
}


export const Categories = ({value, changeCategory}: CategoriesProps) => {


    const categories = [
        {id: 0, title: 'All'},
        {id: 1, title: 'Meat'},
        {id: 2, title: 'Vegetarian'},
        {id: 3, title: 'Grill'},
        {id: 4, title: 'Sharp'},
        {id: 5, title: 'Closed'},
    ]

    const categoriesElements = categories.map(el => {
        return (
            <li key={el.id} onClick={()=> {changeCategory(el.id)}} className={value === el.id ? "active" : ''}>{el.title}</li>
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


