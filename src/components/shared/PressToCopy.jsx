"use client";

import { useRef } from "react";
import toast from "react-hot-toast";

const PressToCopy = ({ children, textToCopy }) => {
  const longPressed = useRef(false);

  const handleMouseDown = () => {
    longPressed.current = true;
    setTimeout(() => {
      if (longPressed.current) {
        copyTextToClipboard(textToCopy);
        longPressed.current = false;
      }
    }, 500);
  };

  const handleMouseUp = () => {
    longPressed.current = false;
  };

  const copyTextToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      toast("Text copied to clipboard");
    } catch (error) {
      console.log(error);

      toast.error("Failed to copy the text");
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className="p-1 click rounded-md w-full no-select"
    >
      {children}
    </div>
  );
};

export default PressToCopy;
