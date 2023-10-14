"use client";
import { useState } from "react";
import InputField from "../form/InputField";
import Button from "../form/Button";
import SelectRoom from "../form/SelectRoom";
import axios from "axios";
import toast from "react-hot-toast";

const CreateAnnouncement = () => {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
  });

  const { title, description } = formdata;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/announcements`, {
        title,
        description,
        course,
      });

      console.log(data);
      setLoading(false);
      toast.success("Post created successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
    console.log(title, description, course);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-xl font-medium">Post an announcement</h1>
      <form onSubmit={handleSubmit} className="w-4/5 flex flex-col gap-y-4">
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
        <SelectRoom course={course} setCourse={setCourse} />
        <Button loading={loading} title="Post" />
      </form>
    </div>
  );
};

export default CreateAnnouncement;
