import s from '../../styles.module.css';
import PropTypes from 'prop-types';

const Button = ({ newPage }) => {
  return (
    <button className={s.Button} type="button" onClick={newPage}>
      Load more
    </button>
  );
};

Button.propTypes = {
  newPage: PropTypes.func.isRequired,
};

export default Button;