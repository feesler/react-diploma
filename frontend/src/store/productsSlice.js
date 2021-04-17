import { createSlice } from '@reduxjs/toolkit';

const CHUNK_SIZE = 6;

const defaultFilter = {
  categoryId: null,
  q: null,
};

const defaultForm = {
  categoryId: null,
  q: '',
};

const initialState = {
  items: null,
  loading: false,
  loadingNext: false,
  error: null,
  /* Current filter of loaded items. Useful to load more data if available */
  current: { ...defaultFilter },
  /* Requested filter. Request may fail, so this data is used to retry */
  request: { ...defaultFilter },
  /* Filter form data */
  form: { ...defaultForm },
  moreAvailable: true,
};

/* Selectors */
export const getProducts = (state) => state.products;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsReadRequest: (state, action) => ({
      ...state,
      loading: true,
      items: null,
      error: null,
      request: { ...action.payload },
    }),
    productsReadSuccess: (state, action) => {
      const { data } = action.payload;
      const { offset, ...rest } = state.request;

      const newState = {
        ...state,
        loading: false,
        moreAvailable: (data.length >= CHUNK_SIZE),
        current: { ...rest },
        items: [...data],
      };

      return newState;
    },
    productsReadFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    readNext: (state) => ({
      ...state,
      loadingNext: true,
      error: null,
    }),
    readNextSuccess: (state, action) => {
      const { data } = action.payload;
      const { offset, ...rest } = state.request;

      const newState = {
        ...state,
        loadingNext: false,
        moreAvailable: (data.length >= CHUNK_SIZE),
        current: { ...rest },
        items: [...state.items, ...data],
      };

      return newState;
    },
    readNextFailure: (state, action) => ({
      ...state,
      loadingNext: false,
      error: action.payload,
    }),

    changeSearchQuery: (state, action) => ({
      ...state,
      form: {
        ...state.form,
        q: (typeof action.payload === 'string') ? action.payload : '',
      },
    }),
    changeCategoryId: (state, action) => ({
      ...state,
      form: {
        ...state.form,
        categoryId: (action.payload) ? Number(action.payload) : null,
      },
    }),
  },
});

export const {
  productsReadRequest,
  productsReadSuccess,
  productsReadFailure,
  readNext,
  readNextSuccess,
  readNextFailure,
  changeSearchQuery,
  changeCategoryId,
} = productsSlice.actions;
export default productsSlice.reducer;
