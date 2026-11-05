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
    year: 2014,
    photo: returnPhotoBasedOnKey("2014-d14"),
    caption:
      "We first met in 2014 at NPCC CIBTC D14. We spent three weeks in the same squad and camp together, but honestly, neither of us remembers making much of an impression on the other.",
    fit: "contain", // show the whole photo instead of cropping to the frame
  }, // squad ok
  {
    year: 2016,
    photo: returnPhotoBasedOnKey("2016-j16"),
    caption:
      "We signed up to be CIBTC J16 instructors and were assigned to the same mentoring group. When the course finally came around, we were paired up as partners and had no choice but to stick together.",
  }, // partner ok
  {
    year: 2017,
    photo: returnPhotoBasedOnKey("2017-j17"),
    caption:
      "We signed up for the course a couple more times, and with each round, we got to know each other a little better. Somewhere along the way, friendship turned into something more. Little did we know that the two people who barely remembered each other from 2014 would one day build a life together.",
  }, // no1 ok
  {
    year: 2018,
    photo: returnPhotoBasedOnKey("2018-bus"),
    caption:
      "He enlisted for National Service while she started university. Two very different chapters of life, but somehow, we stayed in each other's lives.",
  }, // bus ok

  {
    year: 2021,
    photo: returnPhotoBasedOnKey("2021-house-studio"),
    caption:
      "She was in her final year of university while he was somewhere in the middle of his. Two broke students trying to recreate the photo studio experience from the comfort of home. Back then, budget dates like these were our kind of thing, and honestly, some of our favourites.",
  }, // bus ok
  {
    year: 2024,
    photo: returnPhotoBasedOnKey("2024-ring"),
    caption:
      "Our first trip to China together, where he proposed while she was lying in bed scrolling through TikTok. Naturally, she made him do it all over again.",
  }, // citigo
  {
    year: 2027,
    photo: returnPhotoBasedOnKey("2027-pws"),
    caption:
      "And here we are, 13 years after we first crossed paths and almost 10 years since we started dating. From CIBTC campmates to partners in life, we're finally tying the knot! Here's to the next chapter, and to a lifetime of making memories together. ❤️",
  }, // citigo
];
