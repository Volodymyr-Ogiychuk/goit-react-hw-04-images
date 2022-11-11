import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from './Searchbar/Searchbar'
import React, { useState  } from 'react';
import s from '../styles.module.css';

export const App = () => {
  const [queryValue, setQueryValue] = useState('');

    return (
      <div className={s.App}>
        <>
          <Searchbar onSubmit={setQueryValue} />
          <ImageGallery dataInput={queryValue} />
        </>
      </div>
    );
};