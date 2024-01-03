import styled from "styled-components";
import Task from "./Task";

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

const Column = () => {
  return (
    <StyledColumn>
      <Label>Todo (1)</Label>
      <TaskContainer>
        <Task />
      </TaskContainer>
    </StyledColumn>
  );
};

export default Column;
