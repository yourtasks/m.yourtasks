const IconButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="click p-4 rounded-full">
      {children}
    </button>
  );
};

export default IconButton;
