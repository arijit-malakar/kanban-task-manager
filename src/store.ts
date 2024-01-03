import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./features/boards/boardSlice";

const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
