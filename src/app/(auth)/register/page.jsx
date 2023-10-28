"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import OverlayLoading from "@/components/shared/OverlayLoading";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    email: "",
  });

  const {
    username,
    password,
    firstname,
    lastname,
    email,
    studentId,
    confirmPassword,
  } = formdata;

  const canSubmit =
    username !== "" &&
    studentId !== "" &&
    password !== "" &&
    firstname !== "" &&
    lastname !== "" &&
    confirmPassword !== "" &&
    email !== "";

  const reset = () => {
    setFormdata({
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      studentId: "",
      email: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError({ message: "Password not matched", name: "confirmPassword" });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/api/auth/register`, {
        studentId,
        username,
        firstname,
        lastname,
        email,
        password,
      });
      setError(null);
      setLoading(false);
      reset();
      toast.success("Account created successfully");
      setTimeout(() => {
        signIn("credentials", { username, password, callbackUrl: "/" });
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response.status === 409) {
        if (error.response.data.includes("student")) {
          setError({ message: error.response.data, name: "studentId" });
        } else if (error.response.data.includes("username")) {
          setError({ message: error.response.data, name: "username" });
        } else if (error.response.data.includes("email")) {
          setError({ message: error.response.data, name: "email" });
        }
      } else {
        setError(null);
        toast.error("Something went wrong");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value: orgValue } = e.target;

    let value = orgValue;

    if (name === "username" || name === "email") {
      value = value.replace(/\s/g, "");
    }

    if (name === "studentId") {
      setFormdata((prev) => ({
        ...prev,
        email: value.concat("@student.green.edu.bd"),
      }));
    }

    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-4">
      {!hydrated && <OverlayLoading />}
      <div className="w-5/6 flex flex-col items-center gap-y-4 px-6 py-10 card rounded-lg">
        <h1 className="text-xl font-semibold">Create an account</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
          <InputField
            disabled={loading}
            type="number"
            name="studentId"
            placeholder="Student Id"
            value={studentId}
            onChange={handleChange}
            error={error}
            min={11}
          />
          <InputField
            disabled={loading}
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            error={error}
            style={"lowercase"}
          />
          <InputField
            disabled={loading}
            type="text"
            name="firstname"
            placeholder="Firstname"
            value={firstname}
            onChange={handleChange}
            error={error}
            style={"capitalize"}
          />
          <InputField
            disabled={loading}
            type="text"
            name="lastname"
            placeholder="Lastname"
            value={lastname}
            onChange={handleChange}
            error={error}
            style={"capitalize"}
          />
          <InputField
            disabled={true}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            error={error}
          />

          <InputField
            disabled={loading}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            error={error}
          />
          <InputField
            disabled={loading}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            error={error}
          />
          <Button
            title="Create Account"
            loading={loading}
            disabled={loading || !canSubmit}
          />
        </form>
        <div className="text-xs flex items-center gap-x-2">
          <p>Already have an account? </p>
          <Link
            href={"/login"}
            className="font-medium text-sky-500 px-2 py-2 click rounded-md no-select"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
