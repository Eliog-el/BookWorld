const { Book, validate } = require("../models/book");
const { Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();
const sharp = require("sharp");
const upload = require("../helper/upload");

const getAllBooks = async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
};

const createBooks = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  let book = await Book.findOne({
    $and: [{ title: req.body.title }, { author: req.body.author }],
  });
  if (book) return res.status(400).send("Book already in store, Update!");

  book = new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    price: req.body.price,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
  });
  await book.save();

  res.send(book);
};

const updateBook = async (req, res) => {
  console.log("req:", req.body);

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
};

const uploadImage = async (req, res) => {
  try {
    console.log(req.params.id);
    const book = await Book.findById(req.params.id);

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
    book.productImage = req.file.path;
    let savedbook = await book.save();
    res.send(savedbook);
  } catch (error) {
    console.error(error);
  }
};

const getBookImage = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book || !book.productImage) {
      return res.status(400).send("Book or book's image not found");
    }
    res.send(book.productImage);
    console.log(book.productImage);
  } catch (e) {
    res.status(404).send(e);
  }
};

const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);

  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  res.send(book);
};

module.exports = {
  getAllBooks,
  createBooks,
  updateBook,
  uploadImage,
  getBookImage,
  getBook,
  deleteBook,
};
