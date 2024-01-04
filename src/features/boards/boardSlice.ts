import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import data from "./data.json";

interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  statusId: number;
  subtasks: Subtask[];
}

interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

interface BoardState {
  boards: Board[];
  currentBoardId: number | null;
}

const initialState: BoardState = {
  boards: data.boards,
  currentBoardId: 0,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setCurrentBoard(state, action: PayloadAction<number>) {
      state.currentBoardId = action.payload;
    },

    addColumn(
      state,
      action: PayloadAction<{ boardId: number; columnName: string }>
    ) {
      const board = state.boards.find(
        (board) => board.id === action.payload.boardId
      );
      if (board) {
        const newColumnId = board.columns.length;
        board.columns.push({
          id: newColumnId,
          name: action.payload.columnName,
          tasks: [],
        });
      }
    },

    addTask(
      state,
      action: PayloadAction<{ boardId: number; columnId: number; task: Task }>
    ) {
      const board = state.boards.find(
        (board) => board.id === action.payload.boardId
      );
      if (board) {
        const column = board.columns.find(
          (column) => column.id === action.payload.columnId
        );
        if (column) {
          column.tasks.push(action.payload.task);
        }
      }
    },
  },
});

export const { setCurrentBoard, addColumn, addTask } = boardSlice.actions;

export default boardSlice.reducer;

export const getCurrentBoard = (state: RootState) =>
  state.boards.boards.find((board) => board.id === state.boards.currentBoardId);
