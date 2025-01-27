import React, { useState } from "react";
import axios from "axios";

export default function ({
  action,
  hint,
  btnText,
  btnLoading,
  successMsg,
  errorMsg
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState("loading");

    axios
      .post("/.netlify/functions/" + action, {
        email: email,
      })
      .then((res) => {
        setState("success");
      })
      .catch((res) => {
        setState("error");
      });
  };

  return (
    <div className="subscribe">
      {
        hint && (
          <div className="subscribe-hint">
            {hint}
          </div>
        )
      }
      {/* <div className="subscribe-hint">
        <p>不定期年更，您可以订阅以接收更新提示</p>
      </div> */}
      <form className="subscribe__form" onSubmit={handleSubmit}>
        <input
          placeholder="输入您的邮箱"
          type="email"
          name="email"
          onChange={handleChange}
        ></input>
        <button disabled={state === "loading"}>
          {state === "loading" ? btnLoading : btnText}
        </button>
      </form>

      <p className={`form-state-msg state-${state}`}>
        {state === "success" && successMsg}
        {state === "error" && errorMsg}
      </p>
    </div>
  );
}
