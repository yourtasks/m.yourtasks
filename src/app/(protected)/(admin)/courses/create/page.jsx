"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import HeaderBack from "@/components/shared/HeaderBack";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";

const Page = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    code: "",
    name: "",
    teacher: "",
    section: "",
  });

  const { code, name, section, teacher } = formdata;
  const canSubmit =
    code !== "" && name !== "" && section !== "" && teacher !== "";

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
      setError(null);
    } catch (error) {
      console.log(error);

      if (error.response.status === 409) {
        setError({ message: error.response.data, name: "section" });
      }

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
    <div className="w-full h-full flex flex-col">
      <HeaderBack title={"Course Creation"} />
      <div className="h-full w-full flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-xl font-semibold">Create a new course</h1>
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
            style={"capitalize"}
          />
          <InputField
            type="text"
            name="section"
            placeholder="Course section"
            value={section}
            onChange={handleChange}
            error={error}
          />
          <InputField
            type="text"
            name="teacher"
            placeholder="Course teacher"
            value={teacher}
            onChange={handleChange}
            style={"capitalize"}
          />
          <Button
            disabled={!canSubmit || loading}
            loading={loading}
            title="Create Course"
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
