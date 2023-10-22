const CardButton = ({ count, Icon }) => {
  return (
    <div className="w-fit h-fit py-2 px-4 rounded-lg click flex items-center gap-x-2 text-xs font-semibold">
      <div>{Icon}</div>
      <p>{count}</p>
    </div>
  );
};

export default CardButton;
