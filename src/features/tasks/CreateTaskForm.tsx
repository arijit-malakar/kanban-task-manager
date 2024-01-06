import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { HiOutlineXMark } from "react-icons/hi2";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FormRowMultiple from "../../ui/FormRowMultiple";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import ButtonIcon from "../../ui/ButtonIcon";
import {
  Task as TaskType,
  addTask,
  getCurrentBoard,
} from "../boards/boardSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface CreateTaskFormProps {
  onCloseModal?: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onCloseModal }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskType>({
    defaultValues: {
      subtasks: [{ title: "", isCompleted: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const dispatch = useAppDispatch();
  const board = useAppSelector(getCurrentBoard);
  const statusOptions = board?.columns.map((column) => ({
    value: column.name,
    label: column.name,
    id: column.id,
  }));

  const onSubmit: SubmitHandler<TaskType> = (data) => {
    const selectedOption = statusOptions?.find(
      (option) => option.value === data.status
    );
    if (selectedOption) {
      const statusId = selectedOption.id;
      dispatch(
        addTask({
          boardId: board?.id as number,
          task: { ...data, statusId: statusId as number },
        })
      );
      reset();
      onCloseModal?.();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Title" error={errors.title?.message}>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "Title is required",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Input
          type="text"
          id="description"
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>

      {fields.map((field, index) => (
        <FormRowMultiple
          key={field.id}
          label={`${index === 0 ? "Subtasks" : ""}`}
          labelFor={`subtask-${index}`}
          error={errors.subtasks?.[index]?.title?.message}
        >
          <Input
            type="text"
            id={`subtask-${index}`}
            {...register(`subtasks.${index}.title`, {
              required: "Subtask is required",
            })}
          />

          <Input type="hidden" {...register(`subtasks.${index}.isCompleted`)} />

          <ButtonIcon type="button" onClick={() => remove(index)}>
            <HiOutlineXMark />
          </ButtonIcon>
        </FormRowMultiple>
      ))}

      <FormRow>
        <Button
          variation="secondary"
          type="button"
          onClick={() => append({ title: "", isCompleted: false })}
        >
          + Add New Subtask
        </Button>
      </FormRow>

      <FormRow label="Status" error={errors.status?.message}>
        <Select
          type="white"
          id="status"
          options={statusOptions || []}
          {...register("status")}
        />
      </FormRow>

      <FormRow>
        <>
          <Button type="submit">
            {/* {isFormEditable ? "Save Changes" : "Create New Board"} */}
            Create Task
          </Button>
        </>
      </FormRow>
    </Form>
  );
};

export default CreateTaskForm;