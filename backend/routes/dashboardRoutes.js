const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/dashboardController");

router.use(protect);

// CRUD APIs
router.post("/", createItem);
router.get("/", getItems);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;