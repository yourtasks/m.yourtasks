const IconButton = ({ children, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();

    onClick();
  };

  return (
    <button onClick={handleClick} className="click p-2 rounded-full">
      {children}
    </button>
  );
};

export default IconButton;
