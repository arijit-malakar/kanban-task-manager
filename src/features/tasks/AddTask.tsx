import CreateTaskForm from "./CreateTaskForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const AddTask = () => {
  return (
    <Modal>
      <Modal.Open opens="task-form">
        <Button variation="primary">+ Add New Task</Button>
      </Modal.Open>

      <Modal.Window name="task-form">
        <CreateTaskForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddTask;
