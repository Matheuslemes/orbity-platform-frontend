"use client"
import { useRouter } from "next/navigation"

export function DevAuthToggle() {
  const router = useRouter()
  const setMode = (m: "mock" | "api") => {
    document.cookie = `use_auth_mock=${m==="mock"?"1":"0"}; Path=/; SameSite=Lax`
    router.refresh()
  }
  const logout = async () => { await fetch("/api/auth/login", { method: "DELETE" }); router.refresh() }
  return (
    <div className="fixed bottom-20 right-4 card p-2 flex gap-2">
      <button className="btn-primary" onClick={()=>setMode("mock")}>Auth: Mock</button>
      <button className="btn-primary" onClick={()=>setMode("api")}>Auth: API</button>
      <button className="btn-primary" onClick={logout}>Logout</button>
    </div>
  )
}
