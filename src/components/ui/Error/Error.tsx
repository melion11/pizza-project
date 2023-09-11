import React from "react";
import styles from './Error.module.scss';


export const Error = () => {
    return (
        <div className={styles.errorInfo}>
            <h2 className={styles.title}>
                <span>Произошла ошибка:(</span>
                <br/>
                Ничего не найдено
            </h2>
            <p className={styles.description}>К сожалению, не удалось получить пиццы.</p>
        </div>
    );
};