import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
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
  },
});

export const {
  addToCart,
  removeByIndex,
} = cartSlice.actions;
export default cartSlice.reducer;
