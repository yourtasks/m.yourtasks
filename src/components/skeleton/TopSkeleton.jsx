import { BsSearch } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import IconButton from "../shared/IconButton";
import IconSkeleton from "./IconSkeleton";

const TopSkeleton = () => {
  return (
    <div className="flex items-center text-zinc-500 animate-pulse gap-x-10 p-4">
      <MdAdd size={25} />
      <BsSearch size={25} />
      <IconSkeleton />
    </div>
  );
};

export default TopSkeleton;
