import React from 'react';
import ReactPaginate from 'react-paginate';
import {PizzaType} from '../../pages/Home';
import styles from './Pagination.module.scss'

type PaginationProps = {
    itemsPerPage?: number
    items: PizzaType[]
    changePage: (selectedPage: number)=> void
}

type PageClickEvent = {
    selected: number;
};


export const Pagination = ({ itemsPerPage = 8 , items, changePage} : PaginationProps) => {

    const pageCount = Math.ceil(10 / itemsPerPage);

    const handlePageClick = (event: PageClickEvent) => {
        changePage(event.selected + 1);
    };

    return (
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
    );
}
