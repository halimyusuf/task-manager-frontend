import React from "react";

const PostInfo = ({ time, date, username }) => {
  return (
    <div className="comment_toolbar left-post-list">
      <div className="comment_details">
        <ul>
          <li>
            <i className="fa fa-clock-o"></i> {time}
          </li>
          <li>
            <i className="fa fa-calendar"></i> {date}
          </li>
          <li>
            <i className="fa fa-pencil"></i>{" "}
            <span className="user">{username}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostInfo;
