import React from 'react';
import styles from '../Search/Search.module.scss';



export const SearchIcon = () => {

    return (
        <svg className={`${styles.icon} ${styles.search}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="#464646"
                  d="m20.56 18.44-4.67-4.67a7 7 0 1 0-2.12 2.12l4.67 4.67a1.5 1.5 0 0 0 2.12 0 1.49 1.49 0 0 0 0-2.12ZM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5Z"/>
        </svg>
    );
};
