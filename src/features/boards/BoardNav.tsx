import styled from "styled-components";
import Button from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentBoard } from "./boardSlice";

const StyledBoardNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-left: -2.4rem;
`;

const Label = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--color-grey-500);
`;

const BoardNav = () => {
  const boards = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();

  return (
    <StyledBoardNav>
      <Label>All Boards ({boards.length})</Label>
      <NavList>
        {boards.map((board) => (
          <Button
            variation="secondary"
            key={board.id}
            onClick={() => dispatch(setCurrentBoard(board.id))}
          >
            {board.name}
          </Button>
        ))}
      </NavList>
    </StyledBoardNav>
  );
};

export default BoardNav;
