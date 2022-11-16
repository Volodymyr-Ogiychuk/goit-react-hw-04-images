import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from './Searchbar/Searchbar'
import React, { useState  } from 'react';
import s from '../styles.module.css';

export const App = () => {
  const [queryValue, setQueryValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
    return (
      <div className={s.App}>
        <>
          <Searchbar
            onSubmit={setQueryValue}
            setImages={setImages}
            setPage={setPage}
          />
          <ImageGallery
            dataInput={queryValue}
            setImages={setImages}
            images={images}
            setPage={setPage}
            page={page}
          />
        </>
      </div>
    );
};