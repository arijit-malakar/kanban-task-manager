import styled from "styled-components";
import { useAppSelector } from "../../hooks";
import Button from "../../ui/Button";

const StyledBoardNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-left: -2.4rem;
`;

const BoardNav = () => {
  const boards = useAppSelector((state) => state.boards.boards);

  return (
    <StyledBoardNav>
      {boards.map((board) => (
        <Button variation="secondary" key={board.id}>
          {board.name}
        </Button>
      ))}
    </StyledBoardNav>
  );
};

export default BoardNav;
