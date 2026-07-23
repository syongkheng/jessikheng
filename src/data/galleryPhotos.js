// Placeholder gallery photos — swap these for real photos as they come in.
const ImageBaseUrl = "https://api.awense.com/api/img/";

const ImageIdentifiers = ["b5c7e0d4", "02936e2a", "120785c0", "42fb49f3"];

export const galleryPhotos = ImageIdentifiers.map((file, index) => ({
  id: index + 1,
  src: `${ImageBaseUrl}${file}`,
  alt: `Jessi and Kheng moment ${index + 1}`,
}));