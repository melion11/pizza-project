import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'
import {useAppDispatch, useAppSelector} from '../../app/hooks';

type PaginationProps = {
    itemsPerPage: number
    onChangePage: (newPage: number) => void
}

type PageClickEvent = {
    selected: number;
};


export const Pagination = ({itemsPerPage, onChangePage} : PaginationProps) => {

    const totalCount = useAppSelector(state => state.filter.totalCount)


    const pageCount = Math.ceil(totalCount / itemsPerPage);

    const handlePageClick = (event: PageClickEvent) => {
        onChangePage(event.selected + 1)

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
