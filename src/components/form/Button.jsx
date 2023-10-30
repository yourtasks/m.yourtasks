import { AiOutlineLoading } from "react-icons/ai";

const Button = ({ title, loading, disabled, onClick, secondary, style }) => {
  const handleClick = () => {
    if (!onClick) return;

    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`w-full ${
        secondary ? "click rounded-md py-2 px-4" : "button"
      }`}
    >
      {loading ? (
        <div className="w-full flex items-center justify-center animate-spin">
          <AiOutlineLoading size={24} />
        </div>
      ) : (
        <p
          className={`text-xs text-zinc-100 ${
            disabled && "text-zinc-600"
          } ${style}`}
        >
          {title}
        </p>
      )}
    </button>
  );
};

export default Button;
