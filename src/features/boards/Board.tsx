import styled from "styled-components";
import Column from "../columns/Column";
import AddColumn from "../columns/AddColumn";
import { useAppSelector } from "../../hooks";
import { getCurrentBoard } from "./boardSlice";

const StyledBoard = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const Board = () => {
  const board = useAppSelector(getCurrentBoard);

  return (
    <StyledBoard>
      {board?.columns.map((column) => (
        <Column name={column.name} tasks={column.tasks || []} key={column.id} />
      ))}
      {board?.columns && board?.columns?.length < 6 && <AddColumn />}
    </StyledBoard>
  );
};

export default Board;
