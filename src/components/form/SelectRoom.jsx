"use client";

import { fetcher } from "@/libs/fetcher";
import { useState } from "react";
import useSWR from "swr";

const SelectRoom = ({ course, setCourse }) => {
  const { data: courses } = useSWR(`/api/users/courses`, fetcher);

  const handleChange = (e) => {
    const { value } = e.target;

    setCourse(value);
  };

  console.log(course);

  return (
    <select
      className="input-field"
      placeholder="Select a course"
      value={course}
      onChange={handleChange}
      defaultValue={"all"}
    >
      <option value="all">All</option>
      {courses &&
        courses.map((course) => (
          <option key={course._id} value={course._id}>
            {`${course.name} (${course.section})`}
          </option>
        ))}
    </select>
  );
};

export default SelectRoom;
