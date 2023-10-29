"use client";
const { default: useCurrentUser } = require("@/hooks/useCurrentUser");
const { useRef } = require("react");

const CourseItem = ({ data, rooms, setRooms, loading }) => {
  const { data: user } = useCurrentUser();

  const canSelect = user && rooms.length < user.maxCourse;
  const isSelected = rooms.some((room) => room.roomCode === data.roomCode);

  const inputRef = useRef(null);

  const handleClick = () => {
    if (!canSelect && !isSelected && !loading) {
      return;
    }
    inputRef.current.checked = !inputRef.current.checked;

    handleChange();
  };

  const handleChange = () => {
    const { value, checked } = inputRef.current;

    if (checked) {
      setRooms((prev) => [
        ...prev,
        {
          roomCode: value,
          name: data.name,
          section: data.section,
          id: data._id,
        },
      ]);
    } else {
      setRooms((prev) => prev.filter((room) => room.roomCode !== value));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`border-2 border-color rounded-lg px-4 py-2 transition no-select ${
        isSelected && "border-sky-500 bg-sky-500 bg-opacity-30"
      }`}
    >
      <div className="flex items-center gap-x-4">
        <div className="flex flex-col items-center">
          <p className="uppercase text-lg font-bold">{data.section}</p>
          <p className="uppercase text-[8px] font-medium">{data.code}</p>
        </div>
        <h1 className="text-xs text-start leading-5 font-semibold line-clamp-2 w-full">
          {data.name}
        </h1>
        <input
          ref={inputRef}
          type="checkbox"
          value={data.roomCode}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </button>
  );
};

export default CourseItem;
