"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";

const inputFields = [
  {
    id: v4(),
    type: "text",
    name: "code",
    placeholder: "Course code",
  },
  {
    id: v4(),
    type: "text",
    name: "name",
    placeholder: "Course name",
  },
  {
    id: v4(),
    type: "text",
    name: "section",
    placeholder: "Course section",
  },
  {
    id: v4(),
    type: "text",
    name: "teacher",
    placeholder: "Course teacher name",
  },
];

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    code: "",
    name: "",
    teacher: "",
    section: "",
  });

  const { code, name, section, teacher } = formdata;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.post(`/api/courses`, {
        code,
        name,
        section,
        teacher,
      });

      console.log(data);
      setLoading(false);

      toast.success("Course created successfully");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value: orgValue } = e.target;

    let value = orgValue;

    if (name === "code" || name === "section") {
      value = value.toUpperCase().replace(" ", "");
    }

    setFormdata((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 flex flex-col items-center justify-center gap-y-4"
      >
        <InputField
          type="text"
          name="code"
          placeholder="Course code"
          value={code}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="name"
          placeholder="Course name"
          value={name}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="section"
          placeholder="Course section"
          value={section}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="teacher"
          placeholder="Course teacher"
          value={teacher}
          onChange={handleChange}
        />
        <Button loading={loading} title="Create Course" />
      </form>
    </div>
  );
};

export default Page;
