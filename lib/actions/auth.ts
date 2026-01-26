"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { loginSchema } from "@/lib/validations/user"

export async function loginAction(formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const validated = loginSchema.safeParse(rawData)

  if (!validated.success) {
    return { error: "Invalid credentials" }
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/admin",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" }
        default:
          if (error.message.includes("Account is not active")) {
            return { error: "Account is not active" }
          }
          return { error: "Something went wrong" }
      }
    }
    throw error
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" })
}
