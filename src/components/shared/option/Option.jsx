"use client";

import OptionContainer from "@/components/modal/option/OptionContainer";
import { BsThreeDotsVertical } from "react-icons/bs";

const Option = ({ children, size = 25, isOpen, setOpen, setClose }) => {
  return (
    <div className="relative no-select">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen && setOpen();
        }}
        className=" p-2 rounded-full click"
      >
        <BsThreeDotsVertical size={size} />
      </div>
      {isOpen && (
        <OptionContainer setClose={setClose}>{children}</OptionContainer>
      )}
    </div>
  );
};

export default Option;
