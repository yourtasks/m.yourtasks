import Announcement from "@/components/posts/Announcement";
import Task from "./Task";
import Container from "./shared/Container";
import Footer from "./shared/Footer";
import Header from "./shared/Header";
import Seen from "./shared/Seen";

const Post = ({ data }) => {
  const {
    _id,
    type,
    title,
    description,
    createdAt,
    owner,
    likes,
    comments,
    shares,
    source,
    deadline,
    seen,
  } = data;

  console.log(createdAt);

  return (
    <Container>
      <Header postId={_id} createdAt={createdAt} owner={owner} />
      {type === "announcement" && (
        <Announcement title={title} description={description} source={source} />
      )}
      {type === "task" && (
        <Task title={title} description={description} deadline={deadline} />
      )}
      <Seen postId={_id} seen={seen} />
      <Footer
        seen={seen}
        postId={_id}
        likes={likes}
        comments={comments}
        shares={shares}
      />
    </Container>
  );
};

export default Post;
