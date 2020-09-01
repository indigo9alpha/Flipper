import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UI-kit";
import { signIn } from "../reducks/users/operations";
import {push} from 'connected-react-router'

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
    <div>
      <h2>Sign In</h2>
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
        <PrimaryButton
          label={"Sign In"}
          onClick={() =>
            dispatch(signIn(email, password))
          }
        />
        <p onClick={() => dispatch(push('/signup'))}>アカウント登録</p>
        <p onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた</p>
      </div>
    </div>
  );
};

export default SignIn;
