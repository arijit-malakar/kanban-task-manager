import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  modalName: string;
}

const initialState: ModalState = {
  modalName: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCurrentModal(state, action: PayloadAction<string>) {
      state.modalName = action.payload;
    },
  },
});

export const { setCurrentModal } = modalSlice.actions;

export default modalSlice.reducer;
