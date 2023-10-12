"use client";
import { usePathname } from "next/navigation";
import BottomNav from "../navigation/BottomNav";
import TopNav from "../navigation/TopNav";

const NavProvider = () => {
  const pathname = usePathname();
  const route = pathname.split("/");
  const valuesToCheck = ["login", "verify", "register", "onboarding", "create"];
  const hide =
    pathname === "/"
      ? false
      : valuesToCheck.some((value) => route.includes(value));

  if (!hide)
    return (
      <nav>
        <TopNav />
        <BottomNav />
      </nav>
    );
};

export default NavProvider;
