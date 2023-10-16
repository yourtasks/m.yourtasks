import Announcement from "@/components/posts/Announcement";
import PostContainer from "./shared/PostContainer";
import PostHeader from "./shared/PostHeader";
import PostFooter from "./shared/PostFooter";
import Task from "./Task";

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
  } = data;

  console.log(createdAt);

  return (
    <PostContainer>
      <PostHeader postId={_id} createdAt={createdAt} owner={owner} />
      {type === "announcement" && (
        <Announcement title={title} description={description} source={source} />
      )}
      {type === "task" && (
        <Task title={title} description={description} deadline={deadline} />
      )}
      <PostFooter
        postId={_id}
        likes={likes}
        comments={comments}
        shares={shares}
      />
    </PostContainer>
  );
};

export default Post;
