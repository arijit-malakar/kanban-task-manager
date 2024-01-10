import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/boards/boardSlice";
import modalReducer from "./features/modal/modalSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";

const store = configureStore({
  reducer: {
    boards: boardReducer,
    modal: modalReducer,
    sidebar: sidebarReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
