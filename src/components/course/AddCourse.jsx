import Link from "next/link";
import { MdAdd } from "react-icons/md";

const AddCourse = () => {
  return (
    <Link
      href={`/course-selection`}
      className="flex flex-col gap-y-4 items-center"
    >
      <div className="p-3 rounded-full bg-sky-600 w-fit h-fit">
        <MdAdd size={30} />
      </div>
      <p className="text-[10px] font-semibold opacity-80 capitalize">
        Add course
      </p>
    </Link>
  );
};

export default AddCourse;
