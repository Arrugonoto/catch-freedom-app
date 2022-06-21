const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsersData,
  getCurrentUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, getUsersData);
router.get("/current", protect, getCurrentUser);

module.exports = router;
