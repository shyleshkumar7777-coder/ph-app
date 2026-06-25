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

            window.location.href = `/register/${session.user.location}`;
       }

      else {

        alert(
          "Invalid Credentials"
        );

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white/70 backdrop-blur-xl rounded-[28px] md:rounded-[32px] p-6 md:p-10 shadow-2xl border border-white">


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
            <div className="flex flex-col md:flex-row gap-4 pt-2">
            <button
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 md:py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
            >
              Login
            </button>

            </div>

          </form>

        </div>
        </div>

  );
}