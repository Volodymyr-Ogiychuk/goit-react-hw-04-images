import s from '../../styles.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
    state = {
    input: '',
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.input);
        this.reset();
    }

    reset = () => {
        this.setState({ input: '' });
    };
    
render() {
   const { input } = this.state; 

return (
   
<header className={s.Searchbar}>
    <form className={s.SearchForm} onSubmit={this.handleSubmit}>
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
        onChange={e => this.setState({ input: e.target.value })}
    />
  </form>
</header>
)
}}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;