const express = require("express");
const router = express.Router();
const { RegisterUser, LogInUser } = require("../controllers/userControllers");
router.post("/", RegisterUser);
router.post("/login", LogInUser);
module.exports = router;
