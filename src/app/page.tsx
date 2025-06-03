"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {

  const {data: session} = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient
      .signUp.email({
        name: name,
        email: email,
        password: password,
      }, {
        onSuccess: (data) => {
          window.alert("Sign up successful! Please check your email for verification.");
        },
        onError: () => {
          window.alert("Sign up failed. Please try again.");
        }
      });
  };

  const onLogin = () => {
    authClient
      .signIn.email({
        email: email,
        password: password,
      }, {
        onSuccess: (data) => {
          window.alert("Sign in successful!");
        },
        onError: () => {
          window.alert("Sign in failed. Please try again.");
        }
      });
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <h1 className="text-2xl">Welcome, {session.user.name}!</h1>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  } 


  return (
    <div className ="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Sign Up</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
}
