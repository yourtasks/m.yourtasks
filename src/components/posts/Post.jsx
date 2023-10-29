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
    likesCount,
    commentsCount,
    sharesCount,
    source,
    deadline,
    seenCount,
  } = data;

  return (
    <Container>
      <Header postId={_id} createdAt={createdAt} owner={owner} />
      {type === "announcement" && (
        <Announcement
          title={title}
          description={description}
          source={source}
          owner={owner}
        />
      )}
      {type === "task" && (
        <Task title={title} description={description} deadline={deadline} />
      )}
      <Seen postId={_id} seen={seenCount} />
      <Footer
        seen={seenCount}
        postId={_id}
        likes={likes}
        likesCount={likesCount}
        commentsCount={commentsCount}
        sharesCount={sharesCount}
      />
    </Container>
  );
};

export default Post;
