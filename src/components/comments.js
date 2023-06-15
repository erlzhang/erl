import React from "react";
import NewComment from "./new_comment.js";

export default function() {
  return (
    <div id="commentContainer" class="comment-container">
      <NewComment></NewComment>
      <div class="comment__list" id="commentsList">
      </div>
    </div>
  );
}
