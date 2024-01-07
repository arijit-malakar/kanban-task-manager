import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import data from "./data.json";

export interface Subtask {
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
  id?: number;
  name: string;
  tasks?: Task[];
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

    addBoard(
      state,
      action: PayloadAction<{ name: string; columns: Column[] }>
    ) {
      const newBoardId = state.boards.length;
      const newColumns = action.payload.columns.map((column, index) => ({
        id: index,
        name: column.name,
        tasks: [],
      }));

      state.boards.push({
        id: newBoardId,
        name: action.payload.name,
        columns: newColumns,
      });
    },

    editBoard(state, action: PayloadAction<Board>) {
      const { id: boardId, name, columns } = action.payload;

      const updatedColumns = columns.map((column, index) => ({
        ...column,
        id: column.id !== undefined ? column.id : index,
        tasks: column.tasks !== undefined ? column.tasks : [],
      }));

      state.boards = state.boards.map((board) =>
        board.id === boardId
          ? { ...board, name, columns: updatedColumns }
          : board
      );
    },

    deleteBoard(state, action: PayloadAction<number>) {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload
      );

      if (boardIndex !== -1) {
        state.boards.splice(boardIndex, 1);
      }
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

    addTask(state, action: PayloadAction<{ boardId: number; task: Task }>) {
      const { boardId, task } = action.payload;

      const board = state.boards.find((board) => board.id === boardId);
      if (board) {
        const column = board.columns.find(
          (column) => column.id === task.statusId
        );
        if (column) {
          const newTaskId = column.tasks?.length;
          column.tasks?.push({ ...task, id: newTaskId as number });
        }
      }
    },

    updateTaskStatus(
      state,
      action: PayloadAction<{
        boardId: number;
        columnId: number;
        taskId: number;
        status: string;
        statusId: number;
      }>
    ) {
      const { boardId, columnId, taskId, status, statusId } = action.payload;

      const updatedBoards = state.boards.map((board) => {
        if (board.id === boardId) {
          const sourceColumn = board.columns.find(
            (column) => column.id === columnId
          );
          const destColumn = board.columns.find(
            (column) => column.id === statusId
          );

          if (sourceColumn && destColumn) {
            const taskToMove = sourceColumn.tasks?.find(
              (task) => task.id === taskId
            );

            if (taskToMove) {
              const updatedSouceTasks = sourceColumn.tasks?.filter(
                (task) => task.id !== taskId
              );
              const newTaskId = destColumn.tasks ? destColumn.tasks.length : 0;

              destColumn.tasks?.push({
                ...taskToMove,
                id: newTaskId,
                status,
                statusId,
              });

              return {
                ...board,
                columns: board.columns.map((column) => {
                  if (column.id === columnId) {
                    return {
                      ...column,
                      tasks: updatedSouceTasks,
                    };
                  } else if (column.id === statusId) {
                    return {
                      ...column,
                      tasks: destColumn.tasks,
                    };
                  }
                  return column;
                }),
              };
            }
          }
        }
        return board;
      });

      state.boards = updatedBoards;
    },

    updateSubtask(
      state,
      action: PayloadAction<{
        boardId: number;
        columnId: number;
        taskId: number;
        subtaskIndex: number;
      }>
    ) {
      const { boardId, columnId, taskId, subtaskIndex } = action.payload;

      const updatedBoards = state.boards.map((board) => {
        if (board.id === boardId) {
          const updatedColumns = board.columns.map((column) => {
            if (column.id === columnId) {
              const updatedTasks = column.tasks?.map((task) => {
                if (task.id === taskId) {
                  const updatedSubtasks = task.subtasks.map(
                    (subtask, index) => {
                      if (index === subtaskIndex) {
                        return {
                          ...subtask,
                          isCompleted: !subtask.isCompleted,
                        };
                      }
                      return subtask;
                    }
                  );

                  return {
                    ...task,
                    subtasks: updatedSubtasks,
                  };
                }
                return task;
              });

              return {
                ...column,
                tasks: updatedTasks,
              };
            }
            return column;
          });

          return {
            ...board,
            columns: updatedColumns,
          };
        }
        return board;
      });

      state.boards = updatedBoards;
    },
  },
});

export const {
  setCurrentBoard,
  addBoard,
  editBoard,
  deleteBoard,
  addColumn,
  addTask,
  updateTaskStatus,
  updateSubtask,
} = boardSlice.actions;

export default boardSlice.reducer;

export const getCurrentBoard = (state: RootState) =>
  state.boards.boards.find((board) => board.id === state.boards.currentBoardId);
