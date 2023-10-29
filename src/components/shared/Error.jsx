"use client";

import Button from "../form/Button";

const Error = () => {
  const handleRefresh = () => {
    if (window) {
      window.location.reload(true);
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-xs font-semibold">
        Error occured while fetching data
      </h1>
      <div>
        <Button
          title="Refresh"
          onClick={handleRefresh}
          style={"text-sky-500 text-xs font-semibold"}
        />
      </div>
    </div>
  );
};

export default Error;
