"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formdata;

  const canSubmit = username !== "" && password !== "";

  const reset = () => {
    setFormdata({
      username: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await signIn("credentials", { username, password, callbackUrl: "/" });
      setLoading(false);
      reset();
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.status === 404) {
        toast.error("Wrong username");
      } else if (error.status === 403) {
        toast.error("Wrong credentials");
      }
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value: orgValue } = e.target;

    let value = orgValue;

    if (name === "username") {
      value = value.replace(" ", "").toLowerCase();
    }

    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-y-4">
      <div className="w-4/5 flex flex-col items-center gap-y-4 px-6 py-10 card rounded-lg">
        <h1 className="text-xl font-semibold">Login Page</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
          <InputField
            disabled={loading}
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
          />
          <InputField
            disabled={loading}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          {!loading && (
            <Link
              href="/forgot-password"
              className="px-2 font-medium  text-sm text-sky-500 click w-fit rounded-lg"
            >
              Forgot password?
            </Link>
          )}
          <Button
            title="Log in"
            loading={loading}
            disabled={loading || !canSubmit}
          />
        </form>
        <p className="text-sm">
          Don{"'"}t have an account?{" "}
          <Link
            href={"/register"}
            className="font-medium text-sky-500 px-2 py-2 click rounded-md no-select"
          >
            Learn to create
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
