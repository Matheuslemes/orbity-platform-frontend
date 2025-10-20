"use client"

import useSWR from "swr"
import { bffRequest } from "@/lib/http/client"

interface User {
  id: string
  name: string
  email: string
  roles?: string[]
}

/**
 * Hook to get current user session
 */
export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<User>("/me", (url) => bffRequest(url), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  return {
    user: data,
    isLoading,
    isError: error,
    isAuthenticated: !!data && !error,
    mutate,
  }
}

/**
 * Logout function
 */
export async function logout() {
  try {
    await bffRequest("/auth/logout", { method: "POST" })
    window.location.href = "/"
  } catch (error) {
    console.error("[v0] Logout failed:", error)
  }
}
