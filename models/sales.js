const Joi = require("joi");
const mongoose = require("mongoose");

const Sale = mongoose.model(
  "sale",
  new mongoose.Schema({
    book: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailysaleRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
        price: {
          type: Number,
          required: true,
        },
      }),
      required: true,
    },

    dateSold: {
      type: Date,
      default: Date.now,
    },
    quantity: {
      type: Number,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "quantity must be an integer",
      },
    },
  })
);

function validatesale(sale) {
  const schema = Joi.object({
    bookId: Joi.objectId().required(),
  });

  return schema.validate(sale);
}

exports.Sale = Sale;
exports.validate = validatesale;
