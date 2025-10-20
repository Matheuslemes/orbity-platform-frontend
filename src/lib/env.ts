// Environment variables with validation
export const env = {
  // API Gateway
  apiGatewayUrl: process.env.API_GATEWAY_URL || "http://localhost:8080",

  // OIDC
  oidcIssuer: process.env.OIDC_ISSUER || "",
  oidcClientId: process.env.OIDC_CLIENT_ID || "",
  oidcClientSecret: process.env.OIDC_CLIENT_SECRET || "",
  oidcRedirectUri: process.env.OIDC_REDIRECT_URI || "",

  // Session
  sessionCookieName: process.env.SESSION_COOKIE_NAME || "orbity_session",
  sessionSecret: process.env.SESSION_SECRET || "",

  // Public
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  cdnUrl: process.env.NEXT_PUBLIC_CDN_URL || "",
} as const

// Validate required env vars
export function validateEnv() {
  const required = ["API_GATEWAY_URL", "SESSION_SECRET"] as const

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn(`[v0] Missing environment variables: ${missing.join(", ")}`)
  }
}
