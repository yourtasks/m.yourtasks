import Image from "next/image";
import Avatar from "../shared/Avatar";
import { BiSolidImageAdd } from "react-icons/bi";

const SharePost = () => {
  return (
    <div className="flex items-center px-4 py-2 card gap-x-2">
      <div>
        <div className="h-10 w-10 relative">
          <Image
            src={"/profile-avatar.jpg"}
            alt="profile"
            className="object-cover rounded-full"
            fill
          />
        </div>
      </div>
      <p className="text-xs font-medium px-2 rounded-lg invert-bg bg-opacity-10 w-full py-4 opacity-60">
        What{"'"}s on your mind?
      </p>
      <div className="opacity-80">
        <BiSolidImageAdd size={30} />
      </div>
    </div>
  );
};

export default SharePost;
