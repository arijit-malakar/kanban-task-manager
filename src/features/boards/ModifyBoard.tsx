import { HiPencil, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import { useAppSelector } from "../../hooks";

const ModifyBoard = () => {
  const boardId = useAppSelector((state) => state.boards.currentBoardId);
  return (
    <Menus.Menu>
      <Menus.Toggle id={`${boardId}`} />

      <Menus.List id={`${boardId}`}>
        <Menus.Button icon={<HiPencil />}>Edit Board</Menus.Button>
        <Menus.Button icon={<HiTrash />}>Delete Board</Menus.Button>
      </Menus.List>
    </Menus.Menu>
  );
};

export default ModifyBoard;
