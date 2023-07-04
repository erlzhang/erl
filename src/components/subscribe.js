import React, { useState } from "react";
import { Link } from "gatsby";
import axios from 'axios';

export default function({site, book}) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setState('loading');

    axios.post('.netlify/functions/subscribe', {
      email: email
    }).then(res => {
      setState('success');
    }).catch(res => {
      setState('error');
    })
  }

  return (
    <div className="subscribe">
      <form
        className="subscribe__form"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="输入您的邮箱"
          type="email"
          name="email"
          onChange={handleChange}
        ></input>
        <button
          disabled={state === 'loading'}
        >
          { state === 'loading' ? '订阅中...' : '订阅' }
        </button>
      </form>
      <p className={`form-state-msg state-${state}`}>
        {
          state === 'success' &&
          "😍 订阅成功，记得关注邮件哦~"
        }
        {
          state === 'error' &&
          "😥 哎呀失败了，重新尝试一次吧！"
        }
      </p>
    </div>
  )
}
