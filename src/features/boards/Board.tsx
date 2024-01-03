import styled from "styled-components";
import Column from "./Column";

const StyledBoard = styled.div`
  display: flex;
  padding: 2px;
`;

const Board = () => {
  return (
    <StyledBoard>
      <Column />
    </StyledBoard>
  );
};

export default Board;
