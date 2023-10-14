const InputField = ({
  disabled,
  type,
  name,
  value,
  onChange,
  textarea,
  placeholder,
  rows = "5",
  style,
  ref,
}) => {
  if (textarea) {
    return (
      <textarea
        disabled={disabled}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        required
        className="input-field no-spin"
      />
    );
  }

  return (
    <input
      disabled={disabled}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-field ${style}`}
      required
    />
  );
};

export default InputField;
