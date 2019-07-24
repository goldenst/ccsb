const express = require("express");
const router = express.Router();
const { check, validator } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require("../models/Users");

// @Route   GET api/jobs
// @desc    Register a User
// @access  public
// @Status  Works
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route   POST api/users
// @desc    Create or updatre job
// @access  private
// @Status  Works
router.post("/", async (req, res) => {
  const { name, email, password, shop, isAdmin } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User Alreagy Exsists" });
    }

    user = new User({
      name,
      email,
      password,
      shop,
      isAdmin
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 43200
    }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    })

  } catch (err) {}
  console.error('err', err.message);
  res.status(500).send("Server Error  u53");
});

module.exports = router;
