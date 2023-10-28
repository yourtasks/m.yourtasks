"use client";

import Button from "@/components/form/Button";
import InputField from "@/components/form/InputField";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formdata;

  const canSubmit = username !== "" && password !== "";

  useEffect(() => {
    setEdit(true);
  }, []);

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
    await signIn("credentials", { username, password, redirect: false }).then(
      ({ ok, error }) => {
        if (ok) {
          reset();
          router.refresh();
        } else {
          console.log(error);
          if (error.includes("username")) {
            setError({ name: "username", message: "wrong username" });
          } else if (error.includes("password")) {
            setError({ name: "password", message: "incorrect password" });
          } else {
            toast.error("Something went wrong");
          }
        }
      }
    );
    setLoading(false);
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
      <div className="w-5/6 flex flex-col items-center gap-y-4 px-6 py-10 card rounded-lg">
        <h1 className="text-xl font-semibold">Login Page</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
          <InputField
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
        <div className="text-xs flex flex-col items-center gap-y-1 w-full">
          <p>Don{"'"}t have an account? </p>
          <Link
            href={"/register"}
            className="text-sm font-medium text-sky-500 px-2 py-2 click rounded-md no-select"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
