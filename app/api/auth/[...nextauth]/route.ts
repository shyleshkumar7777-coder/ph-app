import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import User from "../../../models/user"
import { connectDB } from "../../../lib/mongodb";

import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        try {

          console.log(
            "================================="
          );

          console.log(
            "USERNAME ENTERED:",
            credentials?.username
          );

          console.log(
            "PASSWORD ENTERED:",
            credentials?.password
          );

          await connectDB();

          console.log(
            "MongoDB Connected"
          );

          const user =
            await User.findOne({
              username:
                credentials?.username,
            });

          console.log(
            "USER FOUND:",
            user
          );

          if (!user) {

            console.log(
              "USER NOT FOUND"
            );

            return null;
          }

          const valid =
            await bcrypt.compare(
              credentials?.password as string,
              user.password
            );

          console.log(
            "PASSWORD MATCH:",
            valid
          );

          if (!valid) {

            console.log(
              "PASSWORD MISMATCH"
            );

            return null;
          }

          console.log(
            "LOGIN SUCCESS"
          );

          return {
            id: user._id.toString(),
            name: user.username,
            location: user.location,
          };

        } catch (error) {

          console.log(
            "AUTHORIZE ERROR:",
            error
          );

          return null;
        }
      },
    }),
  ],

  callbacks: {

    async jwt({
      token,
      user,
    }) {

      console.log(
        "JWT CALLBACK"
      );

      if (user) {

        console.log(
          "USER IN JWT:",
          user
        );

        token.location =
          (user as any).location;

      }

      return token;
    },

    async session({
      session,
      token,
    }) {

      console.log(
        "SESSION CALLBACK"
      );

      console.log(
        "TOKEN:",
        token
      );

      (session.user as any).location =
        token.location;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret:
    process.env.NEXTAUTH_SECRET,
});

export {
  handler as GET,
  handler as POST,
};