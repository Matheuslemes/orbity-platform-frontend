"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirect = searchParams.get("redirect") || "/"
  const error = searchParams.get("error")
  const [remember, setRemember] = useState(false)
  const [isLoading, startTransition] = useTransition()

  const handleSignIn = () => {
    // o /api/auth/login decide MOCK ↔ OIDC conforme AUTH_MODE/cookie
    const url = `/api/auth/login?redirect=${encodeURIComponent(redirect)}${remember ? "&remember=1" : ""}`
    window.location.href = url
  }

  // Dev helper: alterna mock ↔ api por cookie (prioridade sobre AUTH_MODE)
  const setAuthMode = (mode: "mock" | "api") => {
    document.cookie = `use_auth_mock=${mode === "mock" ? "1" : "0"}; Path=/; SameSite=Lax`
    startTransition(() => router.refresh())
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div
          className="p-8 rounded-lg border text-center space-y-6"
          style={{ backgroundColor: "var(--bg-elev)", borderColor: "var(--border)" }}
        >
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <Rocket className="h-8 w-8" style={{ color: "var(--primary)" }} aria-hidden="true" />
              <span className="text-2xl font-bold">Orbity</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
            <p className="text-muted-foreground">Entre com sua conta Orbity para continuar</p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="p-3 rounded-md text-sm"
              style={{ backgroundColor: "color-mix(in oklab, var(--destructive) 20%, transparent)", color: "var(--destructive)" }}
              role="alert"
            >
              {error === "missing_params" && "Parâmetros de autenticação ausentes"}
              {error === "invalid_state" && "Estado de autenticação inválido"}
              {error === "token_exchange_failed" && "Falha na troca de tokens"}
              {error === "callback_failed" && "Falha no callback de autenticação"}
              {!["missing_params", "invalid_state", "token_exchange_failed", "callback_failed"].includes(error) &&
                "Erro ao fazer login. Tente novamente."}
            </div>
          )}

          {/* Remember me */}
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-current"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="text-muted-foreground">Manter conectado</span>
            </label>

            {/* Link esqueci minha senha (placeholder) */}
            <Link href="#" className="hover:underline text-muted-foreground">
              Esqueci minha senha
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            size="lg"
            className="w-full glow-primary disabled:opacity-70"
            style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
            onClick={handleSignIn}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Redirecionando…" : "Entrar com sua conta Orbity"}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: "var(--border)" }} />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-muted-foreground" style={{ backgroundColor: "var(--bg-elev)" }}>
                Ou
              </span>
            </div>
          </div>

          {/* Create Account */}
          <div className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="#" className="font-medium hover:underline" style={{ color: "var(--primary)" }}>
              Criar conta
            </Link>
          </div>

          {/* Footer Links */}
          <div className="pt-4 border-t text-xs text-muted-foreground space-y-2" style={{ borderColor: "var(--border)" }}>
            <p>
              Ao continuar, você concorda com nossos{" "}
              <Link href="#" className="hover:underline">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="#" className="hover:underline">
                Política de Privacidade
              </Link>
            </p>
          </div>

          {/* Dev tools (só quando AUTH_MODE=mock) */}
          {process.env.NEXT_PUBLIC_AUTH_MODE === "mock" && (
            <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="text-xs text-muted-foreground mb-2">Dev: alternar modo de autenticação</div>
              <div className="flex gap-2 justify-center">
                <button
                  className="px-3 py-1 rounded-md border"
                  style={{ borderColor: "var(--border)" }}
                  onClick={() => setAuthMode("mock")}
                  aria-label="Forçar modo de autenticação Mock"
                >
                  Auth: Mock
                </button>
                <button
                  className="px-3 py-1 rounded-md border"
                  style={{ borderColor: "var(--border)" }}
                  onClick={() => setAuthMode("api")}
                  aria-label="Forçar modo de autenticação API"
                >
                  Auth: API
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                O endpoint <code>/api/auth/login</code> escolhe o fluxo (mock ↔ OIDC) conforme <code>AUTH_MODE</code> no
                <code>.env</code> ou o cookie <code>use_auth_mock</code>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
