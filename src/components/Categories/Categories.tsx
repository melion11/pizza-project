import React, {useState} from 'react';

export const Categories = () => {

    const [activeCategory, setActiveCategory] = useState(1)

    const categories = [
        {id: 1, title: 'All'},
        {id: 2, title: 'Meat'},
        {id: 3, title: 'Vegetarian'},
        {id: 4, title: 'Grill'},
        {id: 5, title: 'Sharp'},
        {id: 6, title: 'Closed'},
    ]

    const categoriesElements = categories.map(el => {
        return (
            <li key={el.id} onClick={()=> {setActiveCategory(el.id)}} className={activeCategory === el.id ? "active" : ''}>{el.title}</li>
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


