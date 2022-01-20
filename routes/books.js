const express = require("express");
const router = express.Router();
const upload = require("../helper/upload");
const {
  getAllBooks,
  createBooks,
  updateBook,
  uploadImage,
  getBookImage,
  getBook,
  deleteBook,
} = require("../controller/book");

router.get("/", getAllBooks);

router.post("/", createBooks);

router.put("/:id", updateBook);

router.post("/:id", upload.single("productImage"), uploadImage);

router.get("/:id", getBookImage);

router.get("/:id", getBook);

router.delete("/:id", deleteBook);

module.exports = router;
