import React from "react";

export default function({ comment }) {
  return (
    <div class="comment" id="comment-{{index}}">
  <div class="comment-main clearfix">
    <div class="comment-left">
      <div class="comment__avatar"><img src={`https://www.gravatar.com/avatar/${comment.email}?d=mm&s=45`}></div>
    </div>
    <div class="comment-right">
      <div class="comment__meta">
        <span class="comment__author">{ comment.name }</span>
        {
          comment.parent &&
				  <span class="comment__reply_to">@{ comment.parent }</span>
        }
        <span class="comment__date">{ comment.date }</span>
      </div>
      <div class="comment__content">
        { comment.message }
      </div>
       <div class="comment__reply">
         <a
          href="#commentContainer"
          class="reply-btn"
          data-reply-id={comment.email}
        >回复</a>
       </div>
    </div>
  </div>
</div>
  );
}
