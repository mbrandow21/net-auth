"use server"

import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs"

import { LoginSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "That email is already taken!" }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  //  TODO: Send Verificatio nToken Email.

  return { success: "User Created!" }
};