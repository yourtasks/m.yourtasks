"use client";

import { useState } from "react";

const Description = ({ children }) => {
  const [more, setMore] = useState(false);

  return (
    <div
      onClick={() => setMore((prev) => !prev)}
      className={`font-medium text-xs leading-5 pt-2 ${
        !more && "line-clamp-5"
      }`}
    >
      {children}
    </div>
  );
};

export default Description;
