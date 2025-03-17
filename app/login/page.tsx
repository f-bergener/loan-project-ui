"use client";
import { useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { signIn, signInWithRedirect } from "@aws-amplify/auth";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await signIn({
        username,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ height: "50vh", width: "80%" }}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          required={true}
          onChange={(event) => setusername(event.target.value)}
          value={username}
        />
        <input
          placeholder="Password"
          type="password"
          required={true}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
