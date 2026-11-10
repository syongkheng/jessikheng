import { VISIT_ENDPOINT } from "./rsvpApi.js";

const SESSION_KEY = "visitPinged";

// Tells the backend someone opened the page (it relays a Telegram alert; nothing
// is stored). Once per browser tab session, and skipped in dev. Failures are
// swallowed — analytics must never affect the page.
export function pingVisit() {
  if (import.meta.env.DEV) return;
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // sessionStorage blocked: fall through and ping anyway
  }

  const body = JSON.stringify({
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${window.screen.width}x${window.screen.height}`,
    referrer: document.referrer,
    path: window.location.pathname + window.location.hash.split("?")[0],
  });

  fetch(VISIT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}
