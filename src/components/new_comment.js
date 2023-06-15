import React from "react";
import { Mail, Link, User } from "./icons";

export default function() {
  return (
<form method="POST" action="" class="comment__form clearfix" id="newComment">
  <input name="options[replyTo]" type="hidden" value=""/>
  <input name="fields[parent]" type="hidden" value=""/>
  <div class="comment-left">
    <div class="comment__avatar">
      <img src="https://www.gravatar.com/avatar/?d=mm&s=54"  id="visitorAvatar"/>
    </div>
  </div>
  <div class="comment-right new-comment-right">
     <div class="comment__box">
       <div class="comment__box_top hide" id="visitorInfo">
         <div class="input-group">
            <input type="text" name="fields[name]" placeholder="*姓名" class="form-control form-control-name" required autocomplete="true" />
            <label class="input-label">
              <User/>
            </label>
          </div>
          <div class="input-group">
            <input type="text" placeholder="*Email" class="form-control" type="email" required name="fields[email]" autocomplete="true" />
            <label class="input-label">
              <Mail/>
            </label>
          </div>
          <div class="input-group">
            <input type="text" placeholder="链接" class="form-control" type="url" name="fields[url]" autocomplete="true" />
            <label class="input-label">
              <Link/>
            </label>
          </div>
        </div>
      <div class="comment__box_center">
        <textarea name="fields[message]" class="form-control message-text" placeholder="说点什么吧..."></textarea>
        <span class="message-arrow"></span>
      </div>
      <div class="comment__box_bottom">
        <div class="comment__hint" id="commentHint">
        </div>
        <button type="submit" class="submit-btn" id="submitBtn">
          enmmm..
        </button>
      </div>
    </div>
  </div>
</form>
  );
}
