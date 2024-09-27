import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './Search.module.css';
import { updateSearch } from '../../store/slices/searchSlice';

export const Search: React.FC = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state: RootState) => state.search);
    const [searchInput, setSearchInput] = useState(search);

    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateSearch(searchInput));
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSearchBlur = () => {
        dispatch(updateSearch(searchInput));
    };

    return (
        <form 
        className={styles.searchForm}
        onSubmit={handleSearchSubmit}
        onBlur={handleSearchBlur}
        >
            <input
                type="text"
                placeholder="Поиск"
                className={styles.searchInput}
                value={searchInput}
                onChange={handleInputChange}
            />
        </form>
    );
};