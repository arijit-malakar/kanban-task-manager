import styled from "styled-components";
import Subtasks from "./Subtasks";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Select from "../../ui/Select";
import {
  Task as TaskType,
  getCurrentBoard,
  updateTaskStatus,
} from "../boards/boardSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface ViewTaskProps {
  task: TaskType;
}

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ViewTask: React.FC<ViewTaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(getCurrentBoard);
  const statusOptions = board?.columns.map((column) => ({
    value: column.name,
    label: column.name,
    id: column.id,
  }));

  const handleChangeTaskStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = statusOptions?.find(
      (option) => option.value === e.target.value
    );

    if (selectedOption?.id !== undefined && board) {
      dispatch(
        updateTaskStatus({
          boardId: board?.id,
          columnId: task.statusId,
          taskId: task.id,
          status: e.target.value,
          statusId: selectedOption.id,
        })
      );
    }
  };

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

      <FormRow>
        <Subtasks
          subtasks={task.subtasks}
          taskId={task.id}
          columnId={task.statusId}
        />
      </FormRow>

      <FormRow label="Status">
        <Select
          type="white"
          id="status"
          options={statusOptions || []}
          value={task.status}
          onChange={handleChangeTaskStatus}
        />
      </FormRow>
    </Form>
  );
};

export default ViewTask;
