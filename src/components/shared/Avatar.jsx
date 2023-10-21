import Image from "next/image";
import React from "react";

const Avatar = ({ imageUrl, size = 25 }) => {
  return (
    <div>
      <Image
        src={imageUrl}
        alt="profile"
        height={size}
        width={size}
        className="bg-cover rounded-full"
      />
    </div>
  );
};

export default Avatar;
