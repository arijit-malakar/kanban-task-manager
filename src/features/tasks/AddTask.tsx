import CreateTaskForm from "./CreateTaskForm";
import Button from "../../ui/Button";
import ModalComponent from "../modal/ModalComponent";
import { useAppDispatch } from "../../hooks";
import { setCurrentModal } from "../modal/modalSlice";

const AddTask = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        onClick={() => dispatch(setCurrentModal("task-form"))}
        variation="primary"
      >
        + Add New Task
      </Button>

      <ModalComponent name="task-form">
        <CreateTaskForm />
      </ModalComponent>
    </>
  );
};

export default AddTask;
