const express = require("express");
const User = require("../models/user");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("User Already Exist");
    res.send("login page");
  }
  await User.create({ name, email, password });
  return res.status(201).json({ message: "User Created Successfully" });
};

module.exports = {
  handleUserSignup,
};
