"use client"

import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"
  const error = searchParams.get("error")

  const handleSignIn = () => {
    window.location.href = `/api/auth/login?redirect=${encodeURIComponent(redirect)}`
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
              <Rocket className="h-8 w-8" style={{ color: "var(--primary)" }} />
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
              style={{ backgroundColor: "var(--destructive)20", color: "var(--destructive)" }}
            >
              {error === "missing_params" && "Parâmetros de autenticação ausentes"}
              {error === "invalid_state" && "Estado de autenticação inválido"}
              {error === "token_exchange_failed" && "Falha na troca de tokens"}
              {error === "callback_failed" && "Falha no callback de autenticação"}
              {!["missing_params", "invalid_state", "token_exchange_failed", "callback_failed"].includes(error) &&
                "Erro ao fazer login. Tente novamente."}
            </div>
          )}

          {/* Sign In Button */}
          <Button
            size="lg"
            className="w-full glow-primary"
            style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
            onClick={handleSignIn}
          >
            Entrar com sua conta Orbity
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
          <div
            className="pt-4 border-t text-xs text-muted-foreground space-y-2"
            style={{ borderColor: "var(--border)" }}
          >
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
        </div>
      </div>
    </div>
  )
}
