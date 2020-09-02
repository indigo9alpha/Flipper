import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UI-kit";
import { resetPassword } from "../reducks/users/operations";
import {push} from 'connected-react-router'
import "../assets/style.css";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );


  return (
    <div className="c-section-container">
      <h2 className="text-center">パスワードのリセット</h2>
      <div className="module-spacer--medium" />
      <div>
        <TextInput
          fullWidth={true}
          label={"メールアドレス"}
          multiline={false}
          required={true}
          rows={1}
          value={email}
          type={"email"}
          onChange={inputEmail}
        />
        <div className="module-spacer--medium" />
        <div className="text-center">
          <PrimaryButton
            label={"パスワードをリセット"}
            onClick={() => dispatch(resetPassword(email))}
          />
          <p className="link" onClick={() => dispatch(push("/signin"))}>
            ログイン画面に戻る
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reset;
