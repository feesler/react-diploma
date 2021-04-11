import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

export const getProductImage = (id) => (state) => state.images.items[id];

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    validateImage: (state, action) => ({
      ...state,
      items: {
        ...state.items,
        [action.payload.id]: action.payload.url,
      },
    }),
  },
});

export const {
  validateImage,
} = imagesSlice.actions;
export default imagesSlice.reducer;
