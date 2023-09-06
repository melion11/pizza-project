import React, {useState} from 'react';
import {SortType} from '../../pages/Home';




type SortProps = {
    orderType: 'desc' | 'asc'
    onChangeOrderType: (value: 'desc' | 'asc')=>void
    value: SortType
    changeSortType: (newSortType: SortType) => void

}


export const Sort = ({value,changeSortType, onChangeOrderType, orderType}:SortProps) => {

    const [isActivePopup, setIsActivePopup] = useState(false)
    const sortNames : SortType[] = [
        {title: 'popularity', sortBy: 'rating'},
        {title: 'price', sortBy: 'price'},
        {title: 'the alphabet', sortBy: 'title'}]

    const changeSortHandler = (sort: SortType) => {
        changeSortType(sort)
        setIsActivePopup(false)
    }
    console.log(orderType)
    const changeOrderHandler = () => {
        if (orderType === 'asc') {
            onChangeOrderType('desc');
        } else {
            onChangeOrderType('asc');
        }
    }


    const sortElements = sortNames.map((sort: SortType, i)=> {
        return (
            <li key={i} onClick={()=>changeSortHandler(sort)} className={value.sortBy === sort.sortBy ? "active" : ''}>{sort.title}</li>
        )
    })

    return (
        <div className="sort">
            <div className="sort__label">
                <svg onClick={changeOrderHandler}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{cursor: 'pointer', transform: `${orderType === 'desc' ? 'rotate(180deg)' : ''}`}}
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Sorting by:</b>
                <span onClick={()=>setIsActivePopup(!isActivePopup)} >{value.title}</span>
            </div>
            {isActivePopup &&
            <div className="sort__popup">
                <ul>
                    {sortElements}
                </ul>
            </div>
            }
        </div>
    );
};
