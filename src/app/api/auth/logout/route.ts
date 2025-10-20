import { NextResponse } from "next/server"
import { clearSessionCookie } from "@/lib/auth/session"
import { env } from "@/lib/env"

export async function POST() {
  try {
    await clearSessionCookie()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json({ code: "LOGOUT_ERROR", message: "Failed to logout" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await clearSessionCookie()

    return NextResponse.redirect(new URL("/", env.appUrl))
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.redirect(new URL("/", env.appUrl))
  }
}
