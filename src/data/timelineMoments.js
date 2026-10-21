import { photos } from "./photos.js";

function returnPhotoBasedOnKey(key) {
  const photo = photos.find((photo) => photo.key === key);
  return photo || null;
}

// Placeholder photos/captions for the "Our Story" timeline carousel — swap
// each `photo` and `caption` for the couple's real photo and memory from
// that year once available. Order matters: the carousel renders these left
// to right in array order (newest first).
export const timelineMoments = [
  {
    year: 2024,
    photo: returnPhotoBasedOnKey("2024-ring"),
    caption: "Partners for life.",
  }, // citigo
  {
    year: 2018,
    photo: returnPhotoBasedOnKey("2018-bus"),
    caption: "She fell right beside him.",
  }, // bus ok
  {
    year: 2017,
    photo: returnPhotoBasedOnKey("2017-j17"),
    caption: "He fell first.",
  }, // no1 ok
  {
    year: 2016,
    photo: returnPhotoBasedOnKey("2016-j16"),
    caption: "Partners in course.",
  }, // partner ok
  {
    year: 2014,
    photo: returnPhotoBasedOnKey("2014-d14"),
    caption: "Spot us!",
    fit: "contain", // show the whole photo instead of cropping to the frame
  }, // squad ok
];
