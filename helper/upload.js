const storage = require("../helper/storage");
const fileFilter = require("../helper/filefilter");
const multer = require("multer");

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  fileFilter: fileFilter,
});

module.exports = upload;
