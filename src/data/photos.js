// Swap this for the real CDN base URL once photos are hosted.
// Each photo's `src` is resolved as `${CDN_BASE_URL}${file}`, unless the
// entry has a `local` path — those are served straight from public/ for
// photos that haven't been uploaded to the CDN yet.
export const CDN_BASE_URL = "https://api.awense.com/api/img/";

// c0f4b592 == 63744223, non-edited vs edited

// compressed: 3358d888, original: 448a848f
const files = [
  { code: "3358d888", local: "/background/DSC_6971.jpeg" },
  { code: "63744223", local:"/background/Calendar.jpg" },
  "e10a8279",
  "759fa3b7",
  "be8af780",
];

export const photos = files.map((file, index) => {
  const code = typeof file === "string" ? file : file.code;
  const local = typeof file === "string" ? null : file.local;
  return {
    id: index + 1,
    src: local || `${CDN_BASE_URL}${code}`,
    alt: `Jessi and Kheng photo ${index + 1}`,
  };
});
