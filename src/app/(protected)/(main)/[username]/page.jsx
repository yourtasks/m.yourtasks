import Profile from "@/components/pages/Profile";

const page = ({ params }) => {
  const { username } = params;

  return <Profile username={username} />;
};

export default page;
