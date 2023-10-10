import Link from "next/link";
import { CgUnavailable } from "react-icons/cg";
import { BiLogoGmail } from "react-icons/bi";

const page = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
        <div className="text-rose-500 opacity-70">
          <CgUnavailable size={75} />
        </div>
        <h1 className="text-3xl font-semibold px-2 py-1 bg-opacity-50 rounded-lg">
          Account Registration Unavailable
        </h1>
        <p className="w-4/5 text-center text-lg">
          We regret to inform you that
          <span className="font-medium text-rose-500">
            {" "}
            we do not allow anyone to create new account
          </span>{" "}
          on our website. <br />
          <br /> Our primary concern is to maintain a safe and secure
          environment for our users, and we have implemented this measure to
          prevent spam accounts and spam attacks.
          <br /> <br /> If you require access to our platform, please contact
          our administrator using{" "}
          <Link
            href={
              "mailto:admin@example.com?subject=Account%20Registration%20Assistance&body=Dear%20Administrator,%0A%0AI would like to request assistance with creating a new account on your platform.%0A%0AThank you."
            }
            className="text-orange-500 font-semibold"
          >
            Gmail
          </Link>{" "}
          or{" "}
          <Link
            target="_blank"
            href={"https://www.m.me/muzaheed"}
            className="font-semibold text-sky-500"
          >
            Messenger
          </Link>{" "}
          for assistance with creating an account. <br /> <br /> We apologize
          for any inconvenience this may cause and appreciate your understanding
          in helping us maintain the integrity of our community. <br />
          <br />{" "}
          <span className="text-xl font-semibold">
            Thank you for your cooperation.
          </span>
        </p>
      </div>
    </div>
  );
};

export default page;
