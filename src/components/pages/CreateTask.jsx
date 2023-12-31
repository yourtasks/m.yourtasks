"use client";

import { useState } from "react";
import InputField from "../form/InputField";
import Button from "../form/Button";
import moment from "moment";
import SelectRoom from "../form/SelectRoom";
import toast from "react-hot-toast";
import axios from "axios";
import HeaderBack from "../shared/HeaderBack";
import { useRouter } from "next/navigation";

const CreateTask = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const { title, description, deadline } = formdata;
  const canSubmit = title !== "" && description !== "" && deadline !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(`/api/tasks`, {
        title,
        description,
        deadline,
        course,
      });

      router.push("/tasks");
      setLoading(false);
      toast.success("Task Created");
      setFormdata({
        title: "",
        description: "",
        deadline: "",
      });
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error("Error while creating task");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <HeaderBack title="task creation" />
      <div className=" h-full w-full flex items-center justify-center p-4">
        <div className="flex flex-col gap-y-4 w-full card items-center justify-center py-4 rounded-lg">
          <h1 className="text-center text-xl font-semibold capitalize ">
            Create a new task
          </h1>
          <form onSubmit={handleSubmit} className="w-5/6 flex flex-col gap-y-4">
            <SelectRoom course={course} setCourse={setCourse} />
            <InputField
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={handleChange}
            />
            <InputField
              type="datetime-local"
              name="deadline"
              value={deadline}
              onChange={handleChange}
            />
            <Button
              disabled={!canSubmit || loading}
              loading={loading}
              title="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
