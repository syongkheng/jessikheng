// Swap this for the real CDN base URL once photos are hosted.
// Each photo's `src` is resolved as `${CDN_BASE_URL}${file}`, unless the
// entry has a `local` path — those are served straight from public/ for
// photos that haven't been uploaded to the CDN yet.
export const CDN_BASE_URL = "https://api.awense.com/img/";

// c0f4b592 == 63744223, non-edited vs edited

// compressed: 3358d888, original: 448a848f
const files = [
  { code: "3358d888", local: "/background/DSC_6971.jpeg" },
  { code: "63744223", local:"/background/Calendar.jpg" },
  "e10a8279",
  "759fa3b7",
  "be8af780",
  { code: "", local:"/background/bride.png", key:"bride-kunming" },
  { code: "", local:"/background/groom.png", key:"groom-kunming" },
  { code: "", local:"/background/2016-j16.jpg", key:"2016-j16" },
  { code: "", local:"/background/2017-j17.jpg", key:"2017-j17" },
  { code: "", local:"/background/2018-bus.jpg", key:"2018-bus" },
  { code: "", local:"/background/d14.jpg", key:"2014-d14" },
];

export const photos = files.map((file, index) => {
  const code = typeof file === "string" ? file : file.code;
  const local = typeof file === "string" ? null : file.local;
  const key = typeof file === "string" ? null : file.key;
  return {
    id: index + 1,
    src: local || `${CDN_BASE_URL}${code}`,
    alt: `Jessi and Kheng photo ${index + 1}`,
    key: key
  };
});
