"use client";

import { useState } from "react";

import { signIn }
from "next-auth/react";

import { useRouter }
from "next/navigation";

export default function Login() {

  const router =
    useRouter();

  const [username,
    setUsername] =
      useState("");

  const [password,
    setPassword] =
      useState("");

  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      const result =
        await signIn(
          "credentials",
          {
            username,
            password,
            redirect: false,
          }
        );

       if (!result?.error) {

            const sessionResponse =
                await fetch("/api/auth/session");

            const session =
                await sessionResponse.json();

            router.push(
                `/register/${session.user.location}`
            );

       }

      else {

        alert(
          "Invalid Credentials"
        );

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-50">

      <form
        onSubmit={handleLogin}
        className="
        bg-white
        p-10
        rounded-3xl
        shadow-xl
        w-full
        max-w-md
        "
      >

        <h1 className="text-3xl font-bold mb-8 text-center">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="
          w-full
          p-4
          border
          rounded-2xl
          mb-4
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
          w-full
          p-4
          border
          rounded-2xl
          mb-6
          "
        />

        <button
          className="
          w-full
          bg-indigo-600
          text-white
          py-4
          rounded-2xl
          "
        >
          Login
        </button>

      </form>

    </div>

  );
}