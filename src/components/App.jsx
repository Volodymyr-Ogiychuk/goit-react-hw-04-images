import { ImageGallery } from "./ImageGallery/ImageGallery";
import Searchbar from './Searchbar/Searchbar'
import React, { useState  } from 'react';
import s from '../styles.module.css';

export const App = () => {
  const [queryValue, setqueryValue] = useState('');
  
  // const getQuery = setqueryValue();

    return (
      <div className={s.App}>
        <>
          <Searchbar onSubmit={setqueryValue} />
          <ImageGallery dataInput={queryValue} />
        </>
      </div>
    );
};