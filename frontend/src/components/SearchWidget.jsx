import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeSearchQuery } from '../store/productsSlice';

function SearchWidget() {
  const [formVisible, setFormVisibility] = useState(false);
  const [query, setQuery] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const submitQuery = () => {
    if (!query) {
      return;
    }

    dispatch(changeSearchQuery(query));
    history.push(`catalog.html?q=${query}`);
    setQuery('');
  };

  const handleClick = () => {
    if (formVisible && query) {
      submitQuery();
    } else {
      setFormVisibility((prev) => !prev);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitQuery();
  };

  return (
    <>
      <div
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
        onClick={handleClick}
      ></div>
      <form
        data-id="search-form"
        className={classNames('header-controls-search-form form-inline', { invisible: !formVisible })}
        onSubmit={handleSubmit}
      >
        <input className="form-control" placeholder="Поиск" onChange={handleChange} value={query} />
      </form>
    </>
  );
}

export default SearchWidget;
