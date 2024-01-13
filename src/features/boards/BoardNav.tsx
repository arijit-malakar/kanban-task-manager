import styled, { StyleSheetManager } from "styled-components";
import { TbLayoutBoardSplit } from "react-icons/tb";
import AddBoard from "./AddBoard";
import Label from "../../ui/Label";
import ButtonNav from "../../ui/ButtonNav";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentBoard } from "./boardSlice";
import { setCurrentModal } from "../modal/modalSlice";

const StyledBoardNav = styled.div<{ modal: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.modal === "sidebar" ? "2rem" : "3.2rem")};
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-left: -2.8rem;

  @media (min-width: 768px) {
    margin-left: -2.4rem;
  }
`;

const BoardNav = () => {
  const dispatch = useAppDispatch();
  const { boards, currentBoardId } = useAppSelector((state) => state.boards);
  const modal = useAppSelector((state) => state.modal.modalName);

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) => prop !== "active" && prop !== "modal"}
    >
      <StyledBoardNav modal={modal}>
        <Label>All Boards ({boards.length})</Label>
        <NavList>
          {boards.map((board) => (
            <ButtonNav
              variation="primary"
              active={currentBoardId === board.id}
              key={board.id}
              onClick={() => {
                dispatch(setCurrentBoard(board.id));
                if (modal === "sidebar") {
                  dispatch(setCurrentModal(""));
                }
              }}
            >
              <TbLayoutBoardSplit />
              <span>{board.name}</span>
            </ButtonNav>
          ))}
          <AddBoard />
        </NavList>
      </StyledBoardNav>
    </StyleSheetManager>
  );
};

export default BoardNav;
