import searchApi from 'utils/searchApi';
import ImageGalleryItems from '../ImageGalleryItems/ImageGalleryItems'
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { useState, useEffect } from "react";
import s from '../../styles.module.css';

export const ImageGallery = ({ dataInput, images, setImages, page, setPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [altUrl, setAltUrl] = useState({
    alt: '',
    url: ''
  });
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (dataInput === '') {
      return
    }
 
    setIsLoading(true);
    searchApi(dataInput, page)
      .then(r => {
        if (r.hits.length === 0) {
          throw new Error(
            `No photos on request: '${dataInput}'`
          );
        }
        return r;
      })
      .then(data => {
        setImages(state => ((page === 1) ? data.hits : [...state, ...data.hits]));
        setTotalPages(Math.ceil(data.totalHits / 12));
        setError(null);
      })        
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    return;
    // eslint-disable-next-line
  }, [dataInput, page])
  
  const getAltUrl = (altUrl) => {
    setAltUrl({alt: altUrl.tags, url: altUrl.largeImageURL});
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
          <ImageGalleryItems
            images={images}
            onOpenModal={toggleModal}
            sendAltUrl={getAltUrl}
          />
        </ul>
        {images.length > 0 && totalPages > page && (
          <Button newPage={updatePage} />
        )}
        {showModal && <Modal onCloseModal={toggleModal} url={altUrl.url} alt={altUrl.alt} />}
      </>
    );
  }

ImageGallery.propTypes = {
  dataInput: PropTypes.string.isRequired,
  setImages: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};