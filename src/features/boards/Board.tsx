import styled from "styled-components";
import Column from "./Column";
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
    </StyledBoard>
  );
};

export default Board;
