// routes/index.js

const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

module.exports = router;
