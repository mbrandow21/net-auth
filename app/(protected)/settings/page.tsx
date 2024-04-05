"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut } from "next-auth/react"

const SettingsPage = () => {
  const session = useCurrentUser()

  const onClick = () => {
    signOut();
  }

  return (
    <>
    </>
  )
}

export default SettingsPage