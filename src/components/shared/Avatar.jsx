import Image from "next/image";
import React from "react";

const Avatar = ({ imageUrl }) => {
  return (
    <Image
      src={imageUrl}
      alt="profile"
      height={25}
      width={25}
      className="bg-cover rounded-full"
    />
  );
};

export default Avatar;
