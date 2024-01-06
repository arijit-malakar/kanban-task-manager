import CreateTaskForm from "./CreateTaskForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const AddTask = () => {
  return (
    <Modal>
      <Modal.Open opens="board-form">
        <Button variation="primary">+ Add New Task</Button>
      </Modal.Open>

      <Modal.Window name="board-form">
        <CreateTaskForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddTask;
