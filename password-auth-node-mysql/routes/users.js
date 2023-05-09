// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { promisePool } = require("../database")

// handle user signup
router.post('/signup', async function(req, res) {
  try {
    const pool = promisePool
    const {
      password,
      username,
      email
    } = req.body
    // simple validation
    if (!(password && username && email))
      return res.status(400).end()
    const salt = await bcrypt.genSalt(10) // salt used to encrypt password
    const passwordHash = await bcrypt.hash(password, salt) // encrypting password
    await pool.query(`INSERT INTO users(user_name, email, password) VALUES("${username}", "${email}", "${passwordHash}")`)
    return res.json({"message": "user successfully created"})
  } catch(e) {
    return res.status(500).end()
  }
});

module.exports = router;