import searchApi from 'utils/searchApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { useState, useEffect } from "react";
import s from '../../styles.module.css';

export const ImageGallery = ({ dataInput }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (dataInput === '') {
      return
    }
    setImages([]);
    setIsLoading(true);
      searchApi(dataInput)
        .then(r => {
          if (r.hits.length === 0) {
            throw new Error(
              `No photos on request: '${dataInput}'`
            );
          }
          return r;
        })
        .then(addImg)
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    return;
  }, [dataInput])

  useEffect(() => {
      setIsLoading(true);
      searchApi(dataInput, page)
        .then(data => setImages(images => [...images, ...data.hits]))
        .catch(error => setError({ error: error.message }))
        .finally(() => setIsLoading(false));
  // eslint-disable-next-line
  }, [page]);

  const addImg = data => {
    setImages(data.hits);
    setTotalPages(totalPages => Math.ceil(data.totalHits / 12));
    setError(null);
  };
  
  const getUrl = (url) => {
    setUrl(url);
  };
  const getAlt = (alt) => {
    setAlt({ alt });
  };
  const updatePage = () => {
    setPage(page => page + 1);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

    return (
      <>
        {error && <h2>{error}</h2>}
        {isLoading && <Loader />}
        <ul className={s.ImageGallery}>
          <ImageGalleryItem
            images={images}
            onOpenModal={toggleModal}
            sendUrl={getUrl}
            sendAlt={getAlt}
          />
        </ul>
        {images.length > 0 && totalPages > page && (
          <Button newPage={updatePage} />
        )}
        {showModal && <Modal onCloseModal={toggleModal} url={url} alt={alt} />}
      </>
    );
  }

ImageGallery.propTypes = {
  dataInput: PropTypes.string.isRequired,
};