
const fileFilter = (req, file, cb) => {
  // reject or accept a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    // cb(null, false);
    return cb(new Error("Please upload an image"));
  }
};

module.exports = fileFilter
