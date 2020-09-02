import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UI-kit";
import { signIn } from "../reducks/users/operations";
import {push} from 'connected-react-router'
import "../assets/style.css";


const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="text-center">Sign In</h2>
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
        <TextInput
          fullWidth={true}
          label={"パスワード"}
          multiline={false}
          required={true}
          rows={1}
          value={password}
          type={"password"}
          onChange={inputPassword}
        />
        <div className="module-spacer--medium" />
        <div className="text-center">
          <PrimaryButton
            label={"Sign In"}
            onClick={() => dispatch(signIn(email, password))}
          />
          <div className="module-spacer--small" />
          <PrimaryButton
            label={"ゲストユーザー"}
            onClick={() => dispatch(signIn('guest@gmail.com', 'password'))}
          />
          <p className="link" onClick={() => dispatch(push("/signup"))}>
            アカウント登録
          </p>
          <p className="link" onClick={() => dispatch(push("/signin/reset"))}>
            パスワードを忘れた
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
