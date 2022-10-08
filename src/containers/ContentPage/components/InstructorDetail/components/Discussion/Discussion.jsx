import { Typography } from "antd";
import AddComment from "components/AddComment/AddComment";
import Comment from "components/Comment/Comment";
import React from "react";
import DiscussionWrapper from "./DiscussionStyled";

function Discussion(props) {
  console.log("disscusion");
  return (
    <DiscussionWrapper>
      <Typography.Title level={4}>Discussions</Typography.Title>
      <AddComment
        onAddComment={(data) => console.log(data)}
        imgLink="https://gambolthemes.net/html-items/cursus_main_demo/images/hd_dp.jpg"
      />
      <div className="discussion_list-comment">
        <Comment
          imgLink={
            "https://gambolthemes.net/html-items/cursus_main_demo/images/left-imgs/img-3.jpg"
          }
        />
        <Comment
          type="reply"
          imgLink={
            "https://gambolthemes.net/html-items/cursus_main_demo/images/left-imgs/img-1.jpg"
          }
        />
      </div>
    </DiscussionWrapper>
  );
}

export default Discussion;
