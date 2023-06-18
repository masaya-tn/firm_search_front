"use client"; // This is a client component 👈🏽

import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";
import { signUp } from "../api/auth";
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUp() {
  // const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmSuccessUrl = "http://localhost:3000";
  const AuthContext = createContext();

  const generateParams = () => {
    const signUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      // confirmSuccessUrl: confirmSuccessUrl,
    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    try {
      console.log(params)
      const res = await signUp(params);
      console.log(res);
      router.push("./sign_in");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h1>サインアップページです</h1>
      <form>
      <div>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">パスワード確認</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <div>
          <input
            type="hidden"
            id="confirm_success_url"
            name="confirm_success_url"
            value={confirmSuccessUrl}
          />
        </div>
        <button type="submit" onClick={(e) => handleSignUpSubmit(e)}>
          Submit
        </button>
      </form>
      <Link href="/sign_in">サインインへ</Link>
    </>
  );
};
