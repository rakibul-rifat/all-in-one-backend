// middleware/upload.js
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // ✅ must match folder served above
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // avoid duplicates
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
