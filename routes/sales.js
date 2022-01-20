const express = require("express");
const router = express.Router();
const {
  getAllSales,
  createSale,
  getSale,
  updateSale,
} = require("../controller/sales");

router.get("/", getAllSales);

router.post("/", createSale);

router.get("/:id", getSale);

router.put("/:id", updateSale);

module.exports = router;
