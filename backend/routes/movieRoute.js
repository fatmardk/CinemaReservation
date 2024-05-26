const express = require("express");
const router = express.Router();
const { listMovies, addMovie, updateMovie, deleteMovie, fetchById } = require("../controllers/movieController");
// Örnek bir GET route tanımı
router.get("/list", listMovies);
router.get("/:id", fetchById);
router.post("/add", addMovie);
router.put("/update/:id", updateMovie);
router.delete("/delete/:id", deleteMovie);

module.exports = router;
