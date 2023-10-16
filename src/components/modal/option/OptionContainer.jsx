const OptionContainer = ({ children, setClose }) => {
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setClose();
        }}
        className="fixed top-0 left-0 w-full h-full invert-bg bg-opacity-20 dark:bg-opacity-20 z-50"
      />
      <div className="absolute top-6 right-4 z-50 card py-2 min-w-[150px] rounded-lg">
        {children}
      </div>
    </>
  );
};

export default OptionContainer;
