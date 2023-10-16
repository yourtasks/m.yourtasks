import Image from "next/image";
import React from "react";

const Avatar = ({ imageUrl, size = 25 }) => {
  return (
    <div>
      <div>
        <Image
          src={imageUrl}
          alt="profile"
          height={size}
          width={size}
          className="bg-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Avatar;
