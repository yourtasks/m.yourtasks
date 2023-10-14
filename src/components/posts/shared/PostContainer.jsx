import React from "react";

const PostContainer = ({ children }) => {
  return (
    <div className="w-full py-2 card border-b-[1px] border-color">
      {children}
    </div>
  );
};

export default PostContainer;
