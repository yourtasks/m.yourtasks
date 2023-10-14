"use client";

import { useRouter } from "next/navigation";
import { MdOutlineAddModerator, MdOutlineCampaign } from "react-icons/md";

const Option = ({ title, Icon, link }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(link)}
      className="flex items-center gap-x-2 p-4 click w-full no-select"
    >
      <div>{Icon}</div>
      <p>{title}</p>
    </button>
  );
};

const UserListOption = ({ setClose, username }) => {
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setClose();
        }}
        className="fixed top-0 left-0 h-screen w-screen z-10"
      />
      <div className="absolute top-10 right-4 z-20 card border-2 py-2 min-w-2/5 rounded-lg border-color">
        <Option
          title="Make Moderator"
          Icon={<MdOutlineAddModerator size={20} />}
          link={`/users/${username}/make-moderator`}
        />
        <Option
          title="Make CR"
          Icon={<MdOutlineCampaign size={20} />}
          link={`/users/${username}/make-cr`}
        />
      </div>
    </>
  );
};

export default UserListOption;
