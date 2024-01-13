import styled from "styled-components";
import CreateTaskForm from "./CreateTaskForm";
import Button from "../../ui/Button";
import Modal from "../modal/Modal";
import { useAppDispatch } from "../../hooks";
import { setCurrentModal } from "../modal/modalSlice";

const ButtonText = styled.div`
  @media (max-width: 767px) {
    font-size: 3.2rem;
    line-height: 0.4;

    & span {
      display: none;
    }
  }
`;

const AddTask = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        onClick={() => dispatch(setCurrentModal("task-form"))}
        variation="primary"
      >
        <ButtonText>
          + <span>Add New Task</span>
        </ButtonText>
      </Button>

      <Modal name="task-form">
        <CreateTaskForm />
      </Modal>
    </>
  );
};

export default AddTask;
