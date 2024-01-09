import { HiPencil, HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import { Task as TaskType } from "../boards/boardSlice";
import { setCurrentModal } from "../modal/modalSlice";
import { useAppDispatch } from "../../hooks";

interface ModifyTaskProps {
  task: TaskType;
}

const ModifyTask: React.FC<ModifyTaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  return (
    <Menus.Menu>
      <Menus.Toggle id={`${task.id}`} />

      <Menus.List id={`${task.id}`}>
        <Menus.Button
          onClick={() => dispatch(setCurrentModal(`task-edit-${task.id}`))}
          icon={<HiPencil />}
        >
          Edit Task
        </Menus.Button>

        <Menus.Button
          onClick={() => dispatch(setCurrentModal(`task-delete-${task.id}`))}
          icon={<HiTrash />}
        >
          Delete Task
        </Menus.Button>
      </Menus.List>
    </Menus.Menu>
  );
};

export default ModifyTask;
