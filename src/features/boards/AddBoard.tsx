import styled from "styled-components";
import { TbLayoutBoardSplit } from "react-icons/tb";
import { useAppDispatch } from "../../hooks";
import { setCurrentModal } from "../modal/modalSlice";

const AddBoardButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  color: var(--color-brand-600);
  background-color: unset;
  font-size: 1.6rem;
  font-weight: 500;
  border: unset;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

  &:hover {
    color: var(--color-brand-500);
  }

  &:focus {
    outline: unset;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }
`;

const AddBoard = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <AddBoardButton onClick={() => dispatch(setCurrentModal("board-form"))}>
        <TbLayoutBoardSplit />
        <span>+ Create New Board</span>
      </AddBoardButton>
    </>
  );
};

export default AddBoard;
