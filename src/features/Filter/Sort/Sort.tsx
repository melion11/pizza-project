import React, {memo, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks/hooks';
import {filterActions} from '../filterSlice';
import {Order, SortType} from "../types";
import {SortIcon} from '../../../components/ui/svg/SortIcon';


export const Sort = memo(() => {

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
            if (order === Order.ASC) {
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
                    <SortIcon changeOrder={changeOrderHandler} order={order}/>
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
    })
;
