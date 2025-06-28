// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../utils/cloudinery"); // Make sure this exports your cloudinary instance

// // Image storage
// const imageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "audora/images",
//     resource_type: "image",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// // Audio storage
// const audioStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "audora/audio",
//     resource_type: "video", // Use 'video' for audio files
//     allowed_formats: ["mp3", "wav", "m4a"],
//   },
// });

// const uploadImage = multer({ storage: imageStorage });
// const uploadAudio = multer({ storage: audioStorage });

// module.exports = {
//   uploadImage,
//   uploadAudio,
// };
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Setup storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const resourceType = file.mimetype.startsWith("audio") ? "video" : "image";
    return {
      folder: "audora", // your desired Cloudinary folder
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

module.exports = { upload };
