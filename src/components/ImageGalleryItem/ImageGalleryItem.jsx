import s from '../../styles.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, onOpenModal, sendUrl, sendAlt }) => (
  <>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li
            className={s.ImageGalleryItem}
            key={id}
            onClick={evt => {
              sendAlt(tags);
              sendUrl(largeImageURL)
              onOpenModal(evt);
        }}
      >
        <img className={s.ImageGalleryItemImage} src={webformatURL} alt={tags} />
      </li>
    ))}
  </>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
      PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  sendUrl: PropTypes.func.isRequired,
  sendAlt: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};