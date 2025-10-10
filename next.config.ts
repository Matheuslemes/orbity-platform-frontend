import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

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
    }).filter(Boolean) as string[]
    
  )
  
);

const connectSrc = [

  "'self'",
  ...serviceOrigins,
  ...(isProd ? [] : ["ws:", "http://localhost:*", "http://127.0.0.1:*"]),

].join(" ");

const imgSrc = ["'self'", "data:", "blob:"].join(" ");
const fontSrc = ["'self'", "data:"].join(" ");
const scriptSrc = ["'self'", ...(isProd ? [] : ["'unsafe-eval'"])].join(" ");
const styleSrc = ["'self'", "'unsafe-inline'"].join(" ");
const frameAncestors = ["'none'"].join(" ");

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

const securityHeaders = [

  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "no-referrer" },
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

const nextConfig: NextConfig = {

  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {

    return [{ source: "/:path*", headers: securityHeaders }];
  },

};

export default nextConfig;
