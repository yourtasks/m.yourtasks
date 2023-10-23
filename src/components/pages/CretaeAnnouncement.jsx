"use client";
import { useState } from "react";
import InputField from "../form/InputField";
import Button from "../form/Button";
import SelectRoom from "../form/SelectRoom";
import axios from "axios";
import toast from "react-hot-toast";
import HeaderBack from "../shared/HeaderBack";
import { useRouter } from "next/navigation";

const CreateAnnouncement = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("all");
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
  });

  const { title, description } = formdata;
  const canSubmit = title !== "" && description !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(course);
    setLoading(true);
    try {
      await axios.post(`/api/announcements`, {
        title,
        description,
        course,
      });

      setLoading(false);
      router.push("/announcements");
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
    <div className="w-full h-full flex flex-col">
      <HeaderBack title="Announcement creation" />
      <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center p-4">
        <div className="w-full flex flex-col gap-y-4 card justify-center items-center p-4 rounded-lg">
          <h1 className="text-xl font-medium">Post an announcement</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-y-4"
          >
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

export default CreateAnnouncement;
