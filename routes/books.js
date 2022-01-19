const { Book, validate } = require("../models/book");
const { Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();
const sharp = require("sharp");
const upload = require("../helper/upload");

router.get("/", async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
});

router.post("/", upload.single("productImage"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  sharp(req.file.path)
    .resize(250, 370)
    .toFile(
      "uploads/" + "thumbnails-" + req.file.originalname,
      (err, resizeImage) => {
        if (err) {
          console.log(err);
        } else {
          console.log(resizeImage);
        }
      }
    );

  let book = await Book.findOne({
    $and: [{ title: req.body.title }, { author: req.body.author }],
  });
  if (book) return res.status(400).send("Book already in store, Update!");

  book = new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    productImage: req.file.path,
    price: req.body.price,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
  });
  await book.save();

  res.send(book);
});

router.patch("/:id", async (req, res) => {
  console.log('req:', req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      price: req.body.price,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
    },
    { new: true }
  );

  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
});

router.delete("/:id", async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);

  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
});

module.exports = router;
