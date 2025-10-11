// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/** Coleta e normaliza origens dos microserviços a partir das envs públicas */
const MS_ENVS = [
  process.env.NEXT_PUBLIC_BASE_URL_CATALOG,
  process.env.NEXT_PUBLIC_BASE_URL_SEARCH,
  process.env.NEXT_PUBLIC_BASE_URL_PRICING,
  process.env.NEXT_PUBLIC_BASE_URL_INVENTORY,
  process.env.NEXT_PUBLIC_BASE_URL_CART,
  process.env.NEXT_PUBLIC_BASE_URL_CHECKOUT,
  process.env.NEXT_PUBLIC_BASE_URL_ORDERS,
  process.env.NEXT_PUBLIC_BASE_URL_CUSTOMER,
].filter(Boolean) as string[];

const serviceOrigins = Array.from(
  new Set(
    MS_ENVS.map((u) => {
      try {
        const x = new URL(u);
        return `${x.protocol}//${x.host}`;
      } catch {
        return null;
      }
    }).filter(Boolean) as string[],
  ),
);

/** Monta a diretiva connect-src conforme o ambiente */
const connectSrc = [
  "'self'",
  ...serviceOrigins,
  // Em dev o HMR usa websockets + chamadas ao dev server
  ...(isProd ? [] : ["ws:", "wss:", "http://localhost:*", "http://127.0.0.1:*"]),
].join(" ");

/** Diretivas base independentes de ambiente */
const imgSrc = ["'self'", "data:", "blob:"].join(" ");
const fontSrc = ["'self'", "data:"].join(" ");
const styleSrc = ["'self'", "'unsafe-inline'"].join(" "); // inline de CSS é comum
const frameAncestors = ["'self'"].join(" "); // 'none' bloqueia embeds; 'self' é mais permissivo

/** Em dev precisamos liberar inline/eval para o Next (HMR/Refresh) */
const scriptSrc = isProd
  ? ["'self'"].join(" ")
  : ["'self'", "'unsafe-inline'", "'unsafe-eval'", "blob:"].join(" ");

/** CSP final */
const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `frame-ancestors ${frameAncestors}`,
  `script-src ${scriptSrc}`,
  `style-src ${styleSrc}`,
  `img-src ${imgSrc}`,
  `font-src ${fontSrc}`,
  `connect-src ${connectSrc}`,
  `form-action 'self'`,
].join("; ");

/** Hardening extra (não conflita com HMR) */
const baseSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "fullscreen=(self)",
      "payment=()",
      "usb=()",
      "bluetooth=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
      "clipboard-read=(self)",
      "clipboard-write=(self)",
    ].join(", "),
  },
];

/**
 * Em desenvolvimento, você pode:
 *  - usar Content-Security-Policy (ativa e relaxada)  -> aplica e não bloqueia HMR
 *  - ou usar Content-Security-Policy-Report-Only     -> só loga violações, mais permissivo
 *
 * Troque a linha comentada abaixo se preferir Report-Only.
 */
const securityHeadersDev = [
  // { key: "Content-Security-Policy-Report-Only", value: csp }, // <— alternativa
  { key: "Content-Security-Policy", value: csp },
  ...baseSecurityHeaders,
];

const securityHeadersProd = [
  { key: "Content-Security-Policy", value: csp },
  ...baseSecurityHeaders,
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: isProd ? securityHeadersProd : securityHeadersDev,
      },
    ];
  },
};

export default nextConfig;
