import styled from "styled-components";
import CreateColumnForm from "./CreateColumnForm";
import Label from "../../ui/Label";
import Modal from "../modal/Modal";
import { setCurrentModal } from "../modal/modalSlice";
import { useAppDispatch } from "../../hooks";

const StyledAddColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 28rem;
`;

const AddButton = styled.button`
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
  border: unset;
  border-radius: var(--border-radius-md);
  font-size: 2rem;
  font-weight: 500;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddColumn = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <StyledAddColumn>
        <Label />
        <AddButton onClick={() => dispatch(setCurrentModal("column-form"))}>
          + New Column
        </AddButton>
      </StyledAddColumn>
      <Modal name="column-form">
        <CreateColumnForm />
      </Modal>
    </>
  );
};

export default AddColumn;
