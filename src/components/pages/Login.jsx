"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OverlayLoading from "../shared/OverlayLoading";

const Login = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setEdit(true);
  }, []);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

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
    setError(null);
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    }).then((err) => {
      console.log(err);
      const { error, ok } = err;

      if (error) {
        if (error.includes("tempuser")) {
          const studentId = error.split(" ")[1];
          window.location.replace(`/verify/${studentId}`);
          setEdit(false);
        } else if (error.includes("username")) {
          setError({ name: "username", message: "wrong username" });
        } else if (error.includes("password")) {
          setError({ name: "password", message: "incorrect password" });
        } else {
          toast.error("Something went wrong");
        }
      }
      if (ok) {
        setEdit(false);
        window.location.replace("/");
      }
      setLoading(false);
    });
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
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-4">
      {!hydrated && <OverlayLoading />}
      <div className="w-5/6 flex flex-col items-center gap-y-4 px-6 py-10  rounded-lg">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
          <InputField
            label="username"
            disabled={loading || !edit}
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            error={error}
            focus={true}
          />
          <InputField
            label="Password"
            disabled={loading || !edit}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            error={error}
          />
          {!loading && (
            <Link
              href="/reset-password"
              className="text-sm px-2 font-medium text-sky-500 click w-fit rounded-lg"
            >
              Forgot password?
            </Link>
          )}
          <Button
            title="Log in"
            loading={loading}
            disabled={loading || !canSubmit || !edit}
          />
        </form>
        <div className="text-xs flex flex-col items-center gap-y-1 w-full">
          <p>Don{"'"}t have an account? </p>
          <Link
            href={"/register"}
            className="font-semibold text-sky-500 px-2 py-2 click rounded-md no-select"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
