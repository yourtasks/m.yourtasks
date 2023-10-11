import { protect } from "@/libs/protect";

const layout = async ({ children }) => {
  await protect();

  return <>{children}</>;
};

export default layout;
