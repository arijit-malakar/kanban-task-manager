import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { addColumn, getCurrentBoard } from "../boards/boardSlice";
import { setCurrentModal } from "../modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface IFormType {
  name: string;
}

const CreateColumnForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormType>();

  const dispatch = useAppDispatch();
  const board = useAppSelector(getCurrentBoard);

  const onSubmit: SubmitHandler<IFormType> = (data) => {
    if (board) {
      dispatch(addColumn({ boardId: board.id, columnName: data.name }));
      reset();
      dispatch(setCurrentModal(""));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Heading as="h4">Add New Column</Heading>
      </FormRow>

      <FormRow label="Name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Column name is required",
            validate: (value) =>
              board?.columns.find(
                (column) => column.name.toLowerCase() === value.toLowerCase()
              ) && "Column name already used",
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="submit">Create New Column</Button>
      </FormRow>
    </Form>
  );
};

export default CreateColumnForm;
