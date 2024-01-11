import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../columns/Column";
import AddColumn from "../columns/AddColumn";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { dragDropTask, getCurrentBoard } from "./boardSlice";

const StyledBoard = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const Board = () => {
  const board = useAppSelector(getCurrentBoard);
  const dispatch = useAppDispatch();

  const handleDragDrop = (results: DropResult) => {
    const { source, destination, draggableId } = results;

    if (
      !source ||
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    )
      return;

    if (board) {
      dispatch(
        dragDropTask({
          boardId: board?.id,
          sourceColumnId: Number(source.droppableId),
          destColumnId: Number(destination.droppableId),
          taskId: Number(draggableId),
          destTaskIndex: Number(destination.index),
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <StyledBoard>
        {board?.columns.map((column) => (
          <Column
            name={column.name}
            tasks={column.tasks || []}
            id={column.id as number}
            key={column.id}
          />
        ))}
        {board?.columns && board?.columns?.length < 6 && <AddColumn />}
      </StyledBoard>
    </DragDropContext>
  );
};

export default Board;
