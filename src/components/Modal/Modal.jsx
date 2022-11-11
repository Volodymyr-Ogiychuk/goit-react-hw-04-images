import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from '../../styles.module.css';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseByEsc);
  }

  handleCloseByEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleCloseByClick = evt =>
    evt.target === evt.currentTarget && this.props.onCloseModal();

render() {
    return (createPortal(
        <div className={s.Overlay} onClick={this.handleCloseByClick}>
            <div className={s.Modal}>
                <img src={this.props.url} alt={this.props.alt} />
            </div>
        </div>,
      modalRoot
    )
    )
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.object.isRequired,
};