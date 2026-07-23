// Swap this for the real CDN base URL once photos are hosted.
// Each photo's `src` is resolved as `${CDN_BASE_URL}${file}`.
export const CDN_BASE_URL = "https://api.awense.com/api/img/";

const files = ["36963193", "c0f4b592","e10a8279"];

export const photos = files.map((file, index) => ({
  id: index + 1,
  src: `${CDN_BASE_URL}${file}`,
  alt: `Jessi and Kheng photo ${index + 1}`,
}));
