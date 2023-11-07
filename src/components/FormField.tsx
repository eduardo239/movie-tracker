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
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        name={id}
        id={id}
        type={type}
        value={value}
        onChange={({ currentTarget }) => setState(currentTarget.value)}
        {...args}
      />
    </div>
  );
};

export default FormField;
