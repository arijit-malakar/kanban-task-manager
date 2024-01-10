import styled from "styled-components";
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
}

const Column: React.FC<ColumnProps> = ({ name, tasks }) => {
  return (
    <StyledColumn>
      <Label>
        {name} ({tasks.length})
      </Label>
      <TaskContainer>
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </TaskContainer>
    </StyledColumn>
  );
};

export default Column;
