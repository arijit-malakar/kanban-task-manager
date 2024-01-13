import { TbLayoutBoardSplit } from "react-icons/tb";
import ButtonNav from "../../ui/ButtonNav";
import { useAppDispatch } from "../../hooks";
import { setCurrentModal } from "../modal/modalSlice";

const AddBoard = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <ButtonNav
        variation="secondary"
        onClick={() => dispatch(setCurrentModal("board-form"))}
      >
        <TbLayoutBoardSplit />
        <span>+ Create New Board</span>
      </ButtonNav>
    </>
  );
};

export default AddBoard;
