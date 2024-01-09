import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateBoardForm from "./CreateBoardForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../modal/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteBoard, getCurrentBoard, setCurrentBoard } from "./boardSlice";
import { setCurrentModal } from "../modal/modalSlice";

const ModifyBoard = () => {
  const boardId = useAppSelector((state) => state.boards.currentBoardId);
  const board = useAppSelector(getCurrentBoard);
  const dispatch = useAppDispatch();

  const handleBoardDelete = () => {
    dispatch(deleteBoard(boardId as number));
    dispatch(setCurrentBoard(0));
  };

  return (
    <Menus.Menu>
      <Menus.Toggle id={`${boardId}`} />

      <Menus.List id={`${boardId}`}>
        <Menus.Button
          onClick={() => dispatch(setCurrentModal("board-edit"))}
          icon={<HiPencil />}
        >
          Edit Board
        </Menus.Button>

        <Menus.Button
          onClick={() => dispatch(setCurrentModal("board-delete"))}
          icon={<HiTrash />}
        >
          Delete Board
        </Menus.Button>
      </Menus.List>

      <Modal name="board-edit">
        <CreateBoardForm boardToEdit={board} />
      </Modal>

      <Modal name="board-delete">
        <ConfirmDelete
          resourceName={`board: ${board?.name}`}
          onConfirm={handleBoardDelete}
          onCloseModal={() => dispatch(setCurrentModal(""))}
        />
      </Modal>
    </Menus.Menu>
  );
};

export default ModifyBoard;
