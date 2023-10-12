import { AiOutlineLoading } from "react-icons/ai";

const Button = ({ title, loading, disabled, onClick }) => {
  const handleClick = () => {
    if (!onClick) return;

    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className="w-full button"
    >
      {loading ? (
        <div className="w-full flex items-center justify-center animate-spin">
          <AiOutlineLoading size={24} />
        </div>
      ) : (
        <p className={`text-zinc-100 ${disabled && "text-zinc-600"}`}>
          {title}
        </p>
      )}
    </button>
  );
};

export default Button;
