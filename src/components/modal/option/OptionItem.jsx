const OptionItem = ({ title, Icon, setClose }) => {
  return (
    <div
      onClick={setClose}
      className="text-sm font-semibold w-full flex items-center gap-x-4 click p-4"
    >
      {Icon && <div>{Icon}</div>}
      <p>{title}</p>
    </div>
  );
};

export default OptionItem;
