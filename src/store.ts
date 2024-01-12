import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/boards/boardSlice";
import modalReducer from "./features/modal/modalSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import darkModeReducer from "./features/dark-mode/darkModeSlice";

const store = configureStore({
  reducer: {
    boards: boardReducer,
    modal: modalReducer,
    sidebar: sidebarReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
