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

// handle user login
router.post('/login', async function(req, res) {
  try {
    const pool = promisePool
    const {
      email,
      password
    } = req.body
    if (!(password && email))
      return res.status(400).end()
      // get user attempting to login
      const [users, ...rest ] = await pool.query(`SELECT * FROM users WHERE email="${email}"`)
      // user is not found
      if (!users.length) return res.status(401).end()
      const { password: hashedPassword, user_name } = users[0]// we get users saved password
      const isMatch = await bcrypt.compare(password, hashedPassword)
      if (!isMatch) return res.status(401).end() // wrong password provided
      return res.json({user_name, email})
  } catch(e) {
    console.log(e)
    return res.status(500).end()
  }
})
// 17LCnb
module.exports = router;