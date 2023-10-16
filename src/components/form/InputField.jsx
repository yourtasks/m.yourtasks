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
  error,
  focus,
  ...other
}) => {
  const hasError = error && error.name === name;

  if (textarea) {
    return (
      <textarea
        disabled={disabled}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        className="input-field no-spin"
      />
    );
  }

  return (
    <>
      <input
        autoFocus={focus && focus}
        disabled={disabled}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${
          hasError && `ring-2 ring-rose-500 bg-rose-500 bg-opacity-10`
        } ${style}`}
        {...other}
      />
      {hasError && (
        <p className="text-xs font-semibold text-rose-500 capitalize">
          {error.message}
        </p>
      )}
    </>
  );
};

export default InputField;
