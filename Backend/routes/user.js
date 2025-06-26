const express = require("express");
const router = express.Router();
const { handleUserSignup } = require("../controller/user");

router.post("/create", handleUserSignup);

module.exports = router;
