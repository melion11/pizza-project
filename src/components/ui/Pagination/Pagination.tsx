import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

type PaginationProps = {
    itemsPerPage: number
    onChangePage: (newPage: number) => void
    totalCount: number
}

type PageClickEvent = {
    selected: number;
};


export const Pagination = ({itemsPerPage, onChangePage, totalCount} : PaginationProps) => {




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
