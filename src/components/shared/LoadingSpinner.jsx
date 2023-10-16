import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const LoadingSpinner = ({ size = 25 }) => {
  return (
    <div className="w-fit h-fit">
      <div className="animate-spin">
        <AiOutlineLoading size={size} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
