import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import { Task as TaskType } from "../boards/boardSlice";

interface ViewTaskProps {
  task: TaskType;
}

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ViewTask: React.FC<ViewTaskProps> = ({ task }) => {
  return (
    <Form>
      <FormRow>
        <>
          <TaskHeader>
            <Heading as="h4">{task.title}</Heading>
          </TaskHeader>
          <p>{task.description || "No description"}</p>
        </>
      </FormRow>
    </Form>
  );
};

export default ViewTask;
