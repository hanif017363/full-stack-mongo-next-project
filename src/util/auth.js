import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcrypt";
import connectDb from "./db";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await connectDb();
        const { email, password } = credentials;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Convert to plain JS object and remove password
        const plainUser = user.toObject();
        delete plainUser.password;

        return plainUser; // Return plain object
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    async jwt({ token, user }) {
      if (user) {
        // First time login, attach user info to token
        token.user = {
          _id: user._id?.toString() || null,
          name: user.name || null,
          email: user.email || null,
          image: user.image || null,
          // Add other fields if needed, e.g. role
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
