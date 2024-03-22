const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const { register, login, updateUser } = require("../controllers/auth");
const testUser = require("../middleware/testUser");

router.post("/register", register);

router.post("/login", login);

router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
