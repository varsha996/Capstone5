const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// All books
router.get("/", async (req, res) => {
  const books = await Book.find().sort({ date: -1 });
  res.render("index", { books });
});

// Add book
router.post("/add", async (req, res) => {
  const { title, author, notes, rating } = req.body;
  await Book.create({ title, author, notes, rating });
  res.redirect("/");
});

// Edit form
router.get("/edit/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("edit", { book });
});

// Update book
router.post("/update/:id", async (req, res) => {
  const { title, author, notes, rating } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, notes, rating });
  res.redirect("/");
});

// Delete book
router.post("/delete/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
