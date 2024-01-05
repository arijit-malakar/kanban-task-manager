import { HiPencil, HiTrash } from "react-icons/hi2";
import CreateBoardForm from "./CreateBoardForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteBoard, getCurrentBoard, setCurrentBoard } from "./boardSlice";

const ModifyBoard = () => {
  const boardId = useAppSelector((state) => state.boards.currentBoardId);
  const board = useAppSelector(getCurrentBoard);
  const dispatch = useAppDispatch();

  const handleBoardDelete = () => {
    dispatch(deleteBoard(boardId as number));
    dispatch(setCurrentBoard(0));
  };

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={`${boardId}`} />

        <Menus.List id={`${boardId}`}>
          <Modal.Open opens="board-edit">
            <Menus.Button icon={<HiPencil />}>Edit Board</Menus.Button>
          </Modal.Open>

          <Modal.Open opens="board-delete">
            <Menus.Button icon={<HiTrash />}>Delete Board</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window name="board-edit">
          <CreateBoardForm boardToEdit={board} />
        </Modal.Window>

        <Modal.Window name="board-delete">
          <ConfirmDelete
            resourceName={`board: ${board?.name}`}
            onConfirm={handleBoardDelete}
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
};

export default ModifyBoard;
