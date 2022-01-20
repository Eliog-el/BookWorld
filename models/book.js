const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  author: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 115,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    default: 0
  },
  productImage: {
    type: String,
  },
});

const Book = mongoose.model("books", bookSchema);

function validatebook(book) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    author: Joi.string().min(5).max(115).required(),
    description: Joi.string().required(),
    genreId: Joi.objectId().required(),
    price: Joi.number().required(),
    numberInStock: Joi.number().min(0).required(),
    productImage: Joi.any()
  });

  return schema.validate(book);
}

exports.Book = Book;
exports.validate = validatebook;
