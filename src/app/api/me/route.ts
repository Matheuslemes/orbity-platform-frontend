import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { CacheControl } from "@/lib/http/cache"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ code: "UNAUTHORIZED", message: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json(
      {
        id: session.id,
        name: session.name,
        email: session.email,
        roles: session.roles,
      },
      {
        headers: CacheControl.private(),
      },
    )
  } catch (error) {
    console.error("[v0] Get user error:", error)
    return NextResponse.json({ code: "GET_USER_ERROR", message: "Failed to get user" }, { status: 500 })
  }
}
