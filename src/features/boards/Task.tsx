import styled from "styled-components";

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

const Task = () => {
  return (
    <StyledTask>
      <Title>Clean the house</Title>
      <Subtitle>1 of 2 subtasks</Subtitle>
    </StyledTask>
  );
};

export default Task;
