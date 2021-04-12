import { createSlice } from '@reduxjs/toolkit';

export const initialOwner = {
  phone: '',
  address: '',
  agreement: false,
};

const initialState = {
  items: [],
  owner: { ...initialOwner },
  loading: false,
  error: null,
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
    }),

    changeOrderField: (state, action) => ({
      ...state,
      owner: {
        ...state.owner,
        [action.payload.name]: action.payload.value,
      },
    }),

    orderRequest: (state) => ({
      ...state,
      loading: true,
    }),
    orderRequestSuccess: (state) => ({
      ...state,
      loading: false,
      items: [],
      owner: { ...initialOwner },
    }),
    orderRequestFailure: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export const {
  addToCart,
  removeByIndex,
  changeOrderField,
  orderRequest,
  orderRequestSuccess,
  orderRequestFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
