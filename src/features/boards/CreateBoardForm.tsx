import { useFieldArray, useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Board as BoardType } from "./boardSlice";

const CreateBoardForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<BoardType>();
  const { fields } = useFieldArray({
    control,
    name: "columns",
  });

  return (
    <Form>
      <FormRow label="Name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Board name is required" })}
        />
      </FormRow>

      {fields.map((field, index) => (
        <FormRow
          key={field.id}
          label={`Column ${index + 1}`}
          error={errors.columns?.[index]?.name?.message}
        >
          <Input
            type="text"
            id={`column-${index}`}
            {...register(`columns.${index}.name`, {
              required: "Column name is required",
            })}
          />
        </FormRow>
      ))}
    </Form>
  );
};

export default CreateBoardForm;
