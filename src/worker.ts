import handler from "@tanstack/react-start/server-entry";
import { renderErrorPage } from "./lib/error-page";

function securityHeaders(response: Response, nonce: string, request: Request): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}'`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'none'",
      "form-action 'none'",
      "frame-ancestors 'none'",
    ].join("; "),
  );
  if (new URL(request.url).protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=31536000");
  }
  // Each HTML response contains a fresh nonce and must not share a cached CSP.
  if (headers.get("content-type")?.includes("text/html")) {
    headers.set("Cache-Control", "no-store");
  }
  return new Response(request.method === "HEAD" ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request) {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(18))));
    try {
      // Always replace any client-supplied value before the router reads it.
      const headers = new Headers(request.headers);
      headers.set("x-internal-csp-nonce", nonce);
      const response = await handler.fetch(new Request(request, { headers }));
      return securityHeaders(response, nonce, request);
    } catch {
      // Do not put exception payloads, request bodies or query strings in logs.
      console.error(JSON.stringify({ event: "request_failed", requestId: crypto.randomUUID() }));
      return securityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
        nonce,
        request,
      );
    }
  },
} satisfies ExportedHandler<Env>;
