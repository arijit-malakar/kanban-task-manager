import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Checkbox from "../../ui/Checkbox";
import Panel from "../../ui/Panel";
import { Subtask, updateSubtask } from "../boards/boardSlice";

const StyledSubtasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

interface SubtasksProps {
  subtasks: Subtask[];
  taskId: number;
  columnId: number;
}

const Subtasks: React.FC<SubtasksProps> = ({ subtasks, taskId, columnId }) => {
  const boardId = useAppSelector((state) => state.boards.currentBoardId);
  const dispatch = useAppDispatch();

  return (
    <StyledSubtasks>
      <p>
        Subtasks (
        {subtasks.filter((subtask) => subtask.isCompleted === true).length} of{" "}
        {subtasks.length})
      </p>
      {subtasks.map((subtask, index) => (
        <Panel key={index}>
          <Checkbox
            checked={subtask.isCompleted}
            id={subtask.title}
            onChange={() =>
              dispatch(
                updateSubtask({
                  boardId: boardId as number,
                  columnId,
                  taskId,
                  subtaskIndex: index,
                })
              )
            }
          >
            {subtask.title}
          </Checkbox>
        </Panel>
      ))}
    </StyledSubtasks>
  );
};

export default Subtasks;
