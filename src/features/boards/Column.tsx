import styled from "styled-components";
import Task from "./Task";
import { Task as TaskType } from "./boardSlice";

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 28rem;
`;

const Label = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--color-grey-500);
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
