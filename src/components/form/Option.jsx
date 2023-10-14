const Option = ({ value, title }) => {
  return (
    <option value={value} className="bg p-4">
      {title}
    </option>
  );
};

export default Option;
