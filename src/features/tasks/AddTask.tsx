import CreateTaskForm from "./CreateTaskForm";
import Button from "../../ui/Button";
import Modal from "../modal/Modal";
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

      <Modal name="task-form">
        <CreateTaskForm />
      </Modal>
    </>
  );
};

export default AddTask;
