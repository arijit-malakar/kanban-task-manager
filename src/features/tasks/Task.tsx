import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import ViewTask from "./ViewTask";
import CreateTaskForm from "./CreateTaskForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../modal/Modal";
import { Task as TaskType, deleteTask } from "../boards/boardSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentModal } from "../modal/modalSlice";

const StyledTask = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "var(--color-blue-100)" : "var(--color-grey-0)"};
  border: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-box);
  border-radius: var(--border-radius-md);

  padding: 1.8rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const Title = styled.h5`
  font-size: 1.6rem;
  font-weight: 500;
`;
const Subtitle = styled.p`
  color: var(--color-grey-500);
  font-size: 1.4rem;
  font-weight: 500;
`;

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector((state) => state.boards.currentBoardId);

  const handleTaskDelete = () => {
    if (boardId) {
      dispatch(
        deleteTask({ boardId, columnId: task.statusId, taskId: task.id })
      );
      dispatch(setCurrentModal(""));
    }
  };

  return (
    <>
      <Draggable draggableId={`${task.id}`} index={index} key={task.id}>
        {(provided, snapshot) => (
          <StyledTask
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
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
        )}
      </Draggable>

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
