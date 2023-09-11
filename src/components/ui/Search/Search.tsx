import React, {ChangeEvent, useRef, useState} from 'react';
import styles from './Search.module.scss';
import {DeleteIcon} from '../svg/DeleteIcon';
import {SearchIcon} from '../svg/SearchIcon';


type SearchProps = {
    onUpdateSearchValue: (newValue: string) => void
    onClear: () => void
}

export const Search = ({onUpdateSearchValue, onClear}: SearchProps) => {

    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        onUpdateSearchValue(e.currentTarget.value)
    }

    const onClickClearHandler = () => {
        onClear()
        setValue('')
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <div className={styles.root}>
            <SearchIcon/>
            <input ref={inputRef} onChange={onSearchHandler} value={value} className={styles.input}
                   placeholder={'Search your favourite pizza...'}/>
            {value && <DeleteIcon onClickClear={onClickClearHandler}/>}
        </div>
    );
};

