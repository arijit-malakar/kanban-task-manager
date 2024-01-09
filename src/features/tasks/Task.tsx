import styled from "styled-components";
import ViewTask from "./ViewTask";
import Modal from "../modal/Modal";
import { Task as TaskType } from "../boards/boardSlice";
import { useAppDispatch } from "../../hooks";
import { setCurrentModal } from "../modal/modalSlice";
import CreateTaskForm from "./CreateTaskForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
// import Menus from "../../ui/Menus";

const StyledTask = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.8rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const Title = styled.h5`
  font-size: 1.8rem;
  font-weight: 500;
`;
const Subtitle = styled.p`
  color: var(--color-grey-500);
  font-weight: 500;
`;

const Task: React.FC<{ task: TaskType }> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleTaskDelete = () => {
    console.log("task deleted");
  };

  return (
    <>
      <StyledTask
        onClick={() => dispatch(setCurrentModal(`task-view-${task.id}`))}
      >
        <Title>{task.title}</Title>
        <Subtitle>
          {
            task.subtasks.filter((subtask) => subtask.isCompleted === true)
              .length
          }{" "}
          of {task.subtasks.length} subtasks
        </Subtitle>
      </StyledTask>

      <Modal name={`task-view-${task.id}`}>
        <ViewTask task={task} />
      </Modal>

      <Modal name={`task-edit-${task.id}`} prevModal={`task-view-${task.id}`}>
        <CreateTaskForm taskToEdit={task} />
      </Modal>

      <Modal name={`task-delete-${task.id}`} prevModal={`task-view-${task.id}`}>
        <ConfirmDelete
          resourceName={`task: ${task.title}`}
          onConfirm={handleTaskDelete}
          onCloseModal={() => dispatch(setCurrentModal(`task-view-${task.id}`))}
        />
      </Modal>
    </>
  );
};

export default Task;
