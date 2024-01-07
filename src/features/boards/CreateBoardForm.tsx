import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { HiOutlineXMark } from "react-icons/hi2";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FormRowMultiple from "../../ui/FormRowMultiple";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ButtonIcon from "../../ui/ButtonIcon";
import Heading from "../../ui/Heading";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Board as BoardType, addBoard, editBoard } from "./boardSlice";

interface CreateBoardFormProps {
  onCloseModal?: () => void;
  boardToEdit?: BoardType;
}

const CreateBoardForm: React.FC<CreateBoardFormProps> = ({
  onCloseModal,
  boardToEdit = { id: null },
}) => {
  const { id: editId, ...editValues } = boardToEdit;
  const isFormEditable = editId !== null && editId !== undefined;

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BoardType>({
    defaultValues: isFormEditable
      ? editValues
      : {
          columns: [{ name: "" }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const { boards } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<BoardType> = (data) => {
    const { name, columns } = data;
    if (isFormEditable) {
      dispatch(editBoard({ id: editId, name, columns }));
    } else {
      dispatch(addBoard({ name, columns }));
    }
    reset();
    onCloseModal?.();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Heading as="h4">
          {isFormEditable ? "Edit Board" : "Add New Board"}
        </Heading>
      </FormRow>

      <FormRow label="Name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Board name is required",
            validate: (value) =>
              boards.find(
                (board) =>
                  board.name.toLowerCase() === value.toLowerCase().trim() &&
                  board.id !== watch("id")
              )
                ? "Board name is already used"
                : true,
          })}
        />
      </FormRow>

      {fields.map((field, index) => (
        <FormRowMultiple
          key={field.id}
          label={`${index === 0 ? "Columns" : ""}`}
          labelFor={`column-${index}`}
          error={errors.columns?.[index]?.name?.message}
        >
          <Input
            type="text"
            id={`column-${index}`}
            {...register(`columns.${index}.name`, {
              required: "Column name is required",
            })}
          />
          {fields.length > 1 && (
            <ButtonIcon type="button" onClick={() => remove(index)}>
              <HiOutlineXMark />
            </ButtonIcon>
          )}
        </FormRowMultiple>
      ))}

      <FormRow>
        <>
          {fields.length < 6 && (
            <Button
              variation="secondary"
              type="button"
              onClick={() => append({ name: "" })}
            >
              + Add New Column
            </Button>
          )}
          <Button type="submit">
            {isFormEditable ? "Save Changes" : "Create New Board"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
};

export default CreateBoardForm;
