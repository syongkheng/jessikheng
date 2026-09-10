// The backend hands back a pre-formatted 4-digit pin (e.g. "0007") — this
// just normalizes whatever a guest types back into that same shape so
// "7", "0007", and " 0007 " all resolve to one lookup.
export function normalizePin(input) {
  if (!input) return null
  const digits = String(input).replace(/\D/g, '')
  if (!digits || digits.length > 4) return null
  return digits.padStart(4, '0')
}

// A query is treated as a pin only once stripped of spaces/dashes it's
// nothing but 1-4 digits — anything else (including a name that happens to
// contain digits) is searched as a name instead.
export function looksLikePin(input) {
  const normalized = String(input).replace(/[\s-]/g, '')
  return /^\d{1,4}$/.test(normalized)
}
