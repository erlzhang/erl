import React, { useState } from "react";
import { Link } from "gatsby";
import addToMailchimp from 'gatsby-plugin-mailchimp'

export default function({site, book}) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setState('loading');

    addToMailchimp(email) // listFields are optional if you are only capturing the email address.
      .then(data => {
        // I recommend setting data to React state
        // but you can do whatever you want (including ignoring this `then()` altogether)
        console.log(data)
        setState('success');
      })
      .catch(() => {
        // unnecessary because Mailchimp only ever
        // returns a 200 status code
        // see below for how to handle errors
        setState('failed');
      })
      .finally(() => {
      })
  }

  return (
    <div className="subscribe">
      <p style={{
        marginBottom: 30
      }}>🍀 By <Link to="/about">叶夕青兮</Link> 🍀</p>
      <p>
        如果有什么想对她吐槽的，💌
        <a href={`mailto:${site.email}?subject=读《${book}》有感`}>
          写封邮件给她
        </a>
        吧！</p>
      <p>如果对她写的东西感兴趣的话，可以把邮箱地址填在下面 👇</p>
      <p>然后你会每年收到来自她的问候 😊（每年仅一次哦~）</p>
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
          { state === 'loading' ? '订阅中...' : '订阅更新' }
        </button>
      </form>
      <p className={`form-state-msg state-${state}`}>
        {
          state === 'success' &&
          "😍 订阅成功，记得关注邮件哦~"
        }
        {
          state === 'failed' &&
          "😥 哎呀失败了，重新尝试一次吧！"
        }
      </p>
    </div>
  )
}