const { Sale, validate } = require("../models/sales");
const { Book } = require("../models/book");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init("mongodb://localhost/bookWorld");

const getAllSales = async (req, res) => {
  const sales = await Sale.find().sort("-dateOut");
  res.send(sales);
};

const createSale = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid book.");

  if (book.numberInStock === 0)
    return res.status(400).send("book out of stock.");

  let sale = new Sale({
    book,
  });

  try {
    new Fawn.Task()
      .save("sales", sale)
      .update(
        "books",
        { _id: book._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();

    res.send(sale);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
};

const getSale = async (req, res) => {
  const sale = await Sale.findById(req.params.id);

  if (!sale)
    return res.status(404).send("The sale with the given ID was not found.");

  res.send(sale);
};

const updateSale = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const sale = await Sale.findByIdAndUpdate(req.params.id, {
    bookId: req.body.bookId,
  });

  if (!sale)
    return res.status(404).send("The sale with the given ID was not found.");

  res.send(sale);
};

module.exports = { getAllSales, createSale, getSale, updateSale };
