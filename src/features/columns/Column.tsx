import styled, { StyleSheetManager, css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "../tasks/Task";
import Label from "../../ui/Label";
import { Task as TaskType } from "../boards/boardSlice";

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 28rem;
`;

const TaskContainer = styled.div<{ isDraggingOver: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${(props) =>
    props.isDraggingOver &&
    css`
      background-color: var(--color-grey-100);
      border-radius: var(--border-radius-md);
      padding: 0.4rem;
    `}

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
        {(provided, snapshot) => (
          <StyleSheetManager
            shouldForwardProp={(prop) =>
              prop !== "isDraggingOver" && prop !== "isDragging"
            }
          >
            <TaskContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks.map((task, index) => (
                <Task task={task} index={index} key={task.id} />
              ))}
              {provided.placeholder}
            </TaskContainer>
          </StyleSheetManager>
        )}
      </Droppable>
    </StyledColumn>
  );
};

export default Column;
