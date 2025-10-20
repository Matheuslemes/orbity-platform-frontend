"use client"
import { useRouter } from "next/navigation"

export function DevDataToggle() {
  const router = useRouter()
  const setMode = (mode:"mock"|"api") => {
    document.cookie = `use_mock=${mode==="mock"?"1":"0"}; Path=/; SameSite=Lax`
    router.refresh()
  }
  return (
    <div className="fixed bottom-4 right-4 z-50 card p-2 flex gap-2">
      <button className="btn-primary" onClick={()=>setMode("mock")}>Mock</button>
      <button className="btn-primary" onClick={()=>setMode("api")}>API</button>
    </div>
  )
}
