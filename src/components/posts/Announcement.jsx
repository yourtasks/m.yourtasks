"use client";

import { useState } from "react";

const Announcement = ({ title, description, source }) => {
  const [more, setMore] = useState(false);

  console.log(source);

  const handleMore = () => {
    setMore((prev) => !prev);
  };

  return (
    <div className="w-full p-2">
      <div className=" flex flex-col w-full py-2 click rounded-lg no-select">
        <h1 className="font-semibold px-2 leading-5">{`${source.name} (${source.section}) - ${title}`}</h1>
        <p
          onClick={handleMore}
          className={`font-medium px-2 text-xs leading-5 pt-2 ${
            !more && "line-clamp-5"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Announcement;
