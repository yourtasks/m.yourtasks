const Empty = ({ title, Icon }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col gap-y-4 items-center">
        {Icon && <div>{Icon}</div>}
        <h1 className="font-semibold">{title}</h1>
      </div>
    </div>
  );
};

export default Empty;
