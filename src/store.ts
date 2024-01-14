import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/boards/boardSlice";
import modalReducer from "./features/modal/modalSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import darkModeReducer from "./features/dark-mode/darkModeSlice";
import { loadState } from "./browserStorage";

const reducers = combineReducers({
  boards: boardReducer,
  modal: modalReducer,
  sidebar: sidebarReducer,
  darkMode: darkModeReducer,
});

const store = configureStore({
  reducer: reducers,
  preloadedState: loadState(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
