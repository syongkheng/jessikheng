import { photos } from "./photos.js";

function returnPhotoBasedOnKey(key) {
  const photo = photos.find((photo) => photo.key === key);
  return photo || null;
}

// Photos and i18n caption keys (story.timeline.*) for the "Our Story" timeline carousel — swap
// each `photo` and its caption text for the couple's real photo and memory from
// that year once available. Order matters: the carousel renders these left
// to right in array order (newest first).
export const timelineMoments = [
  {
    year: 2014,
    photo: returnPhotoBasedOnKey("2014-d14"),
    captionKey: "story.timeline.y2014",
    fit: "contain", // show the whole photo instead of cropping to the frame
  }, // squad ok
  {
    year: 2016,
    photo: returnPhotoBasedOnKey("2016-j16"),
    captionKey: "story.timeline.y2016",
  }, // partner ok
  {
    year: 2017,
    photo: returnPhotoBasedOnKey("2017-j17"),
    captionKey: "story.timeline.y2017",
  }, // no1 ok
  {
    year: 2018,
    photo: returnPhotoBasedOnKey("2018-bus"),
    captionKey: "story.timeline.y2018",
  }, // bus ok

  {
    year: 2021,
    photo: returnPhotoBasedOnKey("2021-house-studio"),
    captionKey: "story.timeline.y2021",
  }, // bus ok
  {
    year: 2024,
    photo: returnPhotoBasedOnKey("2024-ring"),
    captionKey: "story.timeline.y2024",
  }, // citigo
  {
    year: 2027,
    photo: returnPhotoBasedOnKey("2027-pws"),
    captionKey: "story.timeline.y2027",
  }, // citigo
];
