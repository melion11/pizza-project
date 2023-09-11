import React from 'react';
import styles from '../Search/Search.module.scss';

type DeleteIconT = {
    onClickClear: ()=>void
}


export const DeleteIcon = ({onClickClear}:DeleteIconT) => {

    return (
        <svg onClick={onClickClear}
             className={`${styles.icon} ${styles.delete}`} viewBox="0 0 20 19.84">
            <path
                d="m10.17 10 3.89-3.89a.37.37 0 1 0-.53-.53L9.64 9.43 5.75 5.54a.37.37 0 1 0-.53.53L9.11 10l-3.89 3.85a.37.37 0 0 0 0 .53.34.34 0 0 0 .26.11.36.36 0 0 0 .27-.11l3.89-3.89 3.89 3.89a.34.34 0 0 0 .26.11.35.35 0 0 0 .27-.11.37.37 0 0 0 0-.53Z"/>
        </svg>
    );
};
