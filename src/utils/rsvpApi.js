export const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://api.awense.com";
export const RSVP_ENDPOINT = `${API_BASE_URL}/wedding/rsvp`;
export const RSVP_STATUS_ENDPOINT = `${RSVP_ENDPOINT}/status`;
