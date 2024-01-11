import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "../tasks/Task";
import Label from "../../ui/Label";
import { Task as TaskType } from "../boards/boardSlice";

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 28rem;
`;

const TaskContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &:empty {
    outline: 2px dashed var(--color-grey-200);
    border-radius: var(--border-radius-md);
  }
`;

interface ColumnProps {
  name: string;
  tasks: TaskType[];
  id: number;
}

const Column: React.FC<ColumnProps> = ({ name, tasks, id }) => {
  return (
    <StyledColumn>
      <Label>
        {name} ({tasks.length})
      </Label>
      <Droppable droppableId={`${id}`}>
        {(provided) => (
          <TaskContainer ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable draggableId={`${task.id}`} index={index} key={task.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <Task task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </TaskContainer>
        )}
      </Droppable>
    </StyledColumn>
  );
};

export default Column;
