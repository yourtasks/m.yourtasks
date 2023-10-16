"use client";
import { MdArrowBackIosNew } from "react-icons/md";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HeaderBack = ({ title, link = "/" }) => {
  return (
    <div className="h-fit w-full border-b-[1px] border-color px-4 py-2 flex items-center gap-x-2 card">
      <Link href={link} className="p-2 click rounded-full">
        <MdArrowBackIosNew size={20} />
      </Link>
      <p className="capitalize w-full text-xl font-medium">{title}</p>
    </div>
  );
};

export default HeaderBack;
