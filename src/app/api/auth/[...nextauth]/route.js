import { connectToDB } from "@/libs/database";
import { User } from "@/models/user";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    Credentials({
      id: "credentials",

      async authorize(profile) {
        const { username, password } = profile;

        await connectToDB();

        const user = await User.findOne({ username }, { timeout: 20000 })
          .select("username password email role name")
          .lean();
        if (!user) throw new Error("Wrong username");

        const validatePassword = await compare(password, user.password);
        if (!validatePassword) throw new Error("Incorrect password");

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ account, user, token }) => {
      if (token && account && user) {
        token.accessToken = account.access_token;
        token.id = user._id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },

    session: async ({ token, session }) => {
      if (token && session) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
