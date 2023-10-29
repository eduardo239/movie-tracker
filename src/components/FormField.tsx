import { UserAuthForm } from "../abstract/interfaces";

const FormField = ({
  label,
  type = "text",
  id,
  value,
  setState,
  ...args
}: React.ComponentProps<"input"> & UserAuthForm) => {
  return (
    <div className="form-field">
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
