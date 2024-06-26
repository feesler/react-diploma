import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeSearchQuery } from '../store/productsSlice.js';

const useFocus = () => {
  const ref = useRef(null);
  const setFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return [ref, setFocus];
};

function SearchWidget() {
  const [formVisible, setFormVisibility] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputRef, setFocus] = useFocus();

  useEffect(() => {
    if (formVisible) {
      setFocus();
    }
  }, [formVisible, setFocus]);

  const submitQuery = () => {
    if (!query) {
      return;
    }

    dispatch(changeSearchQuery(query));
    navigate(`/catalog.html?q=${query}`);
    setQuery('');
  };

  const handleClick = () => {
    if (formVisible && query) {
      submitQuery();
    } else {
      if (formVisible) {
        setFocus();
      }
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
        <input
          className="form-control"
          placeholder="Поиск"
          onChange={handleChange}
          value={query}
          ref={inputRef}
        />
      </form>
    </>
  );
}

export default SearchWidget;
