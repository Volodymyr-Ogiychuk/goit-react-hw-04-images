import searchApi from 'utils/searchApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import React, { Component } from 'react';
import s from '../../styles.module.css';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    isLoading: false,
    images: [],
    totalPages: 0,
    page: 1,
    url: '',
    alt: '',
    error: null,
  };

    componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataInput !== this.props.dataInput) {
      this.setState({ images: [] });
      this.setState({ isLoading: true });
      searchApi(this.props.dataInput)
          .then(r => {
          if (r.hits.length === 0) {
            throw new Error(
              `No photos on request: '${this.props.dataInput}'`
            );
          }
          return r;
        })
        .then(this.addImg)
        .catch(err => this.setState({ error: err.message }))
        .finally(() => this.setState({ isLoading: false }));
      return;
    }
    if (prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      searchApi(this.props.dataInput, this.state.page)
        .then(data => this.addImgesPagin(prevState, data))
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

    addImgesPagin = (prevState, data) => {
    this.setState({
      images: [...prevState.images, ...data.hits],
    });
  };

    addImg = data => {
    this.setState({
      images: data.hits,
      totalPages: Math.ceil(data.totalHits / 12),
      error: null,
    });
  };

  setData = (url, alt) => {
    this.setState({ url, alt });
  };
  updatePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };

  

render() {
    const { images, isLoading, totalPages, page, showModal, url, alt, error } =
      this.state;
    const { toggleModal, updatePage, setData } = this;

    return (
      <>
        {error && <h2>{error}</h2>}
        {isLoading && <Loader />}
        <ul className={s.ImageGallery}>
          <ImageGalleryItem
            images={images}
            onOpenModal={toggleModal}
            sendData={setData}
          />
        </ul>
        {images.length > 0 && totalPages > page && (
          <Button newPage={updatePage} />
        )}
        {showModal && <Modal onCloseModal={toggleModal} url={url} alt={alt} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  dataInput: PropTypes.string.isRequired,
};