import { createSlice } from '@reduxjs/toolkit';

const initialOwner = {
  phone: '',
  address: '',
  agreement: false,
};

const initialValidation = {
  phone: true,
  address: true,
};

export const initialState = {
  items: [],
  owner: { ...initialOwner },
  validation: { ...initialValidation },
  loading: false,
  error: null,
  done: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const data = action.payload;
      const newState = {
        ...state,
        items: [...state.items],
        done: false,
      };

      const index = state.items.findIndex((item) => item.id === data.id && item.size === data.size);
      if (index !== -1) {
        const itemToUpdate = state.items[index];
        newState.items[index] = {
          ...itemToUpdate,
          quantity: itemToUpdate.quantity + data.quantity,
        };
      } else {
        newState.items.push(data);
      }

      return newState;
    },
    removeByIndex: (state, action) => ({
      ...state,
      items: state.items.filter((_, index) => index !== action.payload),
      done: false,
    }),

    changeOrderField: (state, action) => ({
      ...state,
      owner: {
        ...state.owner,
        [action.payload.name]: action.payload.value,
      },
      validation: { ...initialValidation },
    }),
    invalidateField: (state, action) => ({
      ...state,
      validation: {
        ...state.validation,
        [action.payload.name]: false,
      },
    }),

    orderRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    orderRequestSuccess: (state) => ({
      ...state,
      loading: false,
      done: true,
      items: [],
      owner: { ...initialOwner },
    }),
    orderRequestFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),

    resetError: (state) => ({
      ...state,
      error: null,
    }),
  },
});

export const {
  addToCart,
  removeByIndex,
  changeOrderField,
  invalidateField,
  orderRequest,
  orderRequestSuccess,
  orderRequestFailure,
  resetError,
} = cartSlice.actions;
export default cartSlice.reducer;
