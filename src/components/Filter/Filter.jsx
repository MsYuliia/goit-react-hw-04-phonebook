import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ onSearch, searchName }) => {
  return (
    <>
      <p className={css.filterTitle}>Find contact by name</p>
      <input
        className={css.filterInput}
        name="text"
        type="text"
        value={searchName}
        onChange={onSearch}
      />
    </>
  );
};

Filter.propTypes = {
  searchName: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};
