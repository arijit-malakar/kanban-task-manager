import styled, { StyleSheetManager, css } from "styled-components";
import { TbLayoutBoardSplit } from "react-icons/tb";
import AddBoard from "./AddBoard";
import Label from "../../ui/Label";
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

interface NavButtonProps {
  active: boolean;
}

const NavButton = styled.button<NavButtonProps>`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  color: var(--color-grey-600);
  background-color: unset;
  font-size: 1.6rem;
  font-weight: 500;
  border: unset;
  border-radius: var(--border-radius-semi);
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

  &:hover {
    ${(props) =>
      !props.active &&
      css`
        color: var(--color-grey-800);
        background-color: var(--color-brand-200);
      `}
  }

  ${(props) =>
    props.active &&
    css`
      color: var(--color-brand-50);
      background-color: var(--color-brand-600);
    `}

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }
`;

const BoardNav = () => {
  const { boards, currentBoardId } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "active"}>
      <StyledBoardNav>
        <Label>All Boards ({boards.length})</Label>
        <NavList>
          {boards.map((board) => (
            <NavButton
              active={currentBoardId === board.id}
              key={board.id}
              onClick={() => dispatch(setCurrentBoard(board.id))}
            >
              <TbLayoutBoardSplit />
              <span>{board.name}</span>
            </NavButton>
          ))}
          <AddBoard />
        </NavList>
      </StyledBoardNav>
    </StyleSheetManager>
  );
};

export default BoardNav;
