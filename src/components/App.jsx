import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from './Searchbar/Searchbar'
import React, { Component } from 'react';
import s from '../styles.module.css';

export default class App extends Component {
  state = {
    queryValue: '',
  }
  getQuery = queryValue => {
    this.setState({ queryValue });
  }
  render () {
    return (
      <div className={s.App}>
        <>
          <Searchbar onSubmit={this.getQuery} />
          <ImageGallery dataInput={this.state.queryValue} />
        </>
      </div>
    );
  };
};