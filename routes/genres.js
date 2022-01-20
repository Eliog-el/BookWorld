const express = require("express");
const router = express.Router();
const {
  getAllGenre,
  createGenre,
  updateGenre,
  deleteGenre,
  getGenre,
} = require("../controller/genre");

router.get("/", getAllGenre);

router.post("/", createGenre);

router.put("/:id", updateGenre);

router.delete("/:id", deleteGenre);

router.get("/:id", getGenre);

module.exports = router;
