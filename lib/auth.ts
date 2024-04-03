// Assuming you have a file like models/User.ts where your Mongoose schema and model are defined:
import { NextApiRequest } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./database/mongoose";
import UserSchema from "./database/models/user.model"; // Adjust the import path according to your project structure

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          await connectToDatabase();
          
          // Use the UserModel to find a user by email. Adjust this to match your user schema.
          const user = await UserSchema.findOne({ email: credentials.email }).exec();

          if (user) {
            // Here, you should verify the password. This example does not include password hashing or verification logic.
            // In a real application, you should compare the provided password with a hashed password stored in your database, using a library like bcrypt.

            // Assuming password verification is successful:
            return { id: user.id, name: user.name, email: user.email };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
};
