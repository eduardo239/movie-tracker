import { Form } from "semantic-ui-react";
import { IUserAuthForm } from "../abstract/interfaces";

const FormField = ({
  label,
  type = "text",
  id,
  value,
  setState,
  ...args
}: React.ComponentProps<"input"> & IUserAuthForm) => {
  return (
    <Form.Field>
      <label htmlFor={id}>{label}</label>

      <input
        placeholder="..."
        name={id}
        id={id}
        type={type}
        value={value}
        onChange={({ currentTarget }) => setState(currentTarget.value)}
        {...args}
      />
    </Form.Field>
  );
};

export default FormField;
