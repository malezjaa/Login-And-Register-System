const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('welcome')
})

router.get('/success', (req, res) => {
  res.render('success')
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
