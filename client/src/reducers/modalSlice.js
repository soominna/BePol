import { createSlice } from "@reduxjs/toolkit";

const name = "modal";
const initialState = {
  loginModal: false,
  staticModal: false,
};

export const modalSlice = createSlice({
  name,
  initialState,
  reducers: {
    showLoginModal: (state, action) => {
      state.loginModal = action.payload;
    },
    showStaticModal: (state, action) => {
      state.staticModal = action.payload;
    },
  },
});

export const { showLoginModal, showStaticModal } = modalSlice.actions;

export default modalSlice.reducer;
