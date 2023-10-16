"use client";
import { test } from "@/components/test";

const page = () => {
  const handleClick = async () => {
    console.log("first");
    try {
      await test();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-y-4">
      test
      <button onClick={handleClick} className="button">
        click
      </button>
    </div>
  );
};

export default page;
