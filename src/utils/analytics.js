import { API_BASE_URL } from "./rsvpApi.js";

// Page-view analytics → qindom POST /analytics/collect (contract v1, see qindom
// src/analytics/AnalyticsContract.ts). Separate from pingVisit(), which only relays a
// Telegram alert. Failures are swallowed — analytics must never affect the page.

const ENDPOINT = `${API_BASE_URL}/analytics/collect`;
const SYSTEM = "jessikheng";
const SESSION_KEY = "jk_analytics_session";

// Must match the `jessikheng` row in qindom's tb_analytic_system registry.
// 800px is the PhoneFrame switch: ≤800 renders edge-to-edge, >800 inside the phone frame.
const PHONE_MAX_WIDTH = 800;

function sessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

function currentScreen() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return width <= PHONE_MAX_WIDTH
    ? { width, height, breakpoint: "phone", size: "small" }
    : { width, height, breakpoint: "desktop", size: "large" };
}

// Hash route without query params or the RSVP id (#/status/<id> → #/status).
function currentPage() {
  const hash = window.location.hash.split("?")[0].replace(/^(#\/status)\/.*/, "$1");
  return window.location.pathname + hash;
}

export function track(event, properties = {}) {
  const payload = {
    v: 1,
    system: SYSTEM,
    event,
    sessionId: sessionId(),
    timestamp: Date.now(),
    page: currentPage(),
    referrer: document.referrer,
    screen: currentScreen(),
    properties,
  };

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}

// One page_view on load, then one per hash-route change (#/status, #/sprigs, …).
export function startPageTracking() {
  track("page_view");
  window.addEventListener("hashchange", () => track("page_view"));
}
