import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e){
    e.preventDefault();
  }
  return (
    <div>
      <h1>Login</h1>
      <form action="POST">
        <input
          type="email"
          placeholder="nicola@gmail.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type="submit" />
      </form>

      <br />
      <p>OR</p>
      <br />
      <Link to={/signup}>Signup Page</Link>

    </div>
  );
};

export default Login;
