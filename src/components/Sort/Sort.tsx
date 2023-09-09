import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {filterActions, SortType} from '../../app/slices/filterSlice';


type SortProps = {}


export const Sort = ({}: SortProps) => {

        const [isActivePopup, setIsActivePopup] = useState(false)
        const sortTypes = useAppSelector(state => state.filter.sortTypes)
        const order = useAppSelector(state => state.filter.order)
        const currentSortType = useAppSelector(state => state.filter.currentSortType)
        const dispatch = useAppDispatch()
        const sortRef = useRef<HTMLDivElement | null>(null)

        useEffect(() => {
            const handleClickOutSide = (event: MouseEvent) => {
                const target = event.target as HTMLElement;
                if (sortRef.current && !sortRef.current.contains(target)) {
                    setIsActivePopup(false)
                }
            }

            document.body.addEventListener('click', handleClickOutSide)

            return () => {
                document.body.removeEventListener('click', handleClickOutSide)
            }

        }, [])

        const changeSortHandler = (sort: SortType) => {
            dispatch(filterActions.changeSortType(sort))
            setIsActivePopup(false)
        }

        const changeOrderHandler = () => {
            if (order === 'asc') {
                dispatch(filterActions.changeOrderType('desc'));
            } else {
                dispatch(filterActions.changeOrderType('asc'));
            }
        }

        const sortElements = sortTypes.map((sort: SortType, i) => {
            return (
                <li key={i} onClick={() => changeSortHandler(sort)}
                    className={currentSortType.sortBy === sort.sortBy ? 'active' : ''}>{sort.title}</li>
            )
        })

        return (
            <div ref={sortRef} className="sort">
                <div className="sort__label">
                    <svg onClick={changeOrderHandler}
                         width="10"
                         height="6"
                         viewBox="0 0 10 6"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         style={{cursor: 'pointer', transform: `${order === 'desc' ? 'rotate(180deg)' : ''}`}}
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    <b>Sorting by:</b>
                    <span onClick={() => setIsActivePopup(!isActivePopup)}>{currentSortType.title}</span>
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
    }
;
