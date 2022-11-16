import s from '../../styles.module.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit, setImages, setPage }) => {
    const [input, setInput] = useState('');
    
    const handleInputChange = event => {
        setInput(event.currentTarget.value.toLowerCase())
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(input);
        setInput('');
        setImages([]);
        setPage(1);
    };

    return (
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={s.SearchFormButton}>
                    <span className={s.buttonLabel}>Search</span>
                </button>

                <input
                    className={s.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={input}
                    onChange={handleInputChange}
                />
            </form>
        </header>
    )
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    setImages: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
};