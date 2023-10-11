import { connectToDB } from "@/libs/database";
import { User } from "@/models/user";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      id: "credentials",

      async authorize(profile) {
        const { username, password } = profile;

        try {
          await connectToDB();

          const user = await User.findOne({ username });
          if (!user) throw new Error("User not found");

          const validatePassword = await compare(password, user.password);
          if (!validatePassword) throw new Error("Wrong credentials");

          return user;
        } catch (error) {
          console.log(error);

          return null;
        }
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
