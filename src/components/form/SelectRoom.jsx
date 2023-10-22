"use client";

import { fetcher } from "@/libs/fetcher";
import { useEffect } from "react";
import useSWR from "swr";
import LoadingSpinner from "../shared/LoadingSpinner";

const SelectRoom = ({ course, setCourse }) => {
  const { data: courses, isLoading } = useSWR(
    `/api/users/courses/manages`,
    fetcher
  );

  useEffect(() => {
    courses && setCourse(courses[0]._id);
  }, [courses, setCourse]);

  const handleChange = (e) => {
    const { value } = e.target;

    setCourse(value);
  };

  return (
    <>
      {isLoading ? (
        <button
          disabled={true}
          className="input-field flex items-center gap-x-2 justify-center opacity-70"
        >
          <p>Getting courses you manage</p>
          <LoadingSpinner />
        </button>
      ) : (
        <select
          className="input-field capitalize"
          placeholder="Select a course"
          value={course}
          onChange={handleChange}
        >
          {courses &&
            courses.map((course) => (
              <option
                key={course._id}
                value={course._id}
                className="capitalize"
              >
                {`${course.name} (${course.section})`}
              </option>
            ))}
        </select>
      )}
    </>
  );
};

export default SelectRoom;
