const CardContainer = ({ children }) => {
  return (
    <div className="h-4/6 p-4 card rounded-lg shadow-md flex flex-col gap-y-2">
      {children}
    </div>
  );
};

export default CardContainer;
