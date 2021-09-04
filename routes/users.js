const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/users/login',
    failureFlash:
      'Fill in all the fields or check the correctness of the given data!',
  })(req, res, next)
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Fill in all fields!' })
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match!' })
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password is too short! Must be 6 letters.' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
    })
  } else {
    User.findOne({ email: email }).exec((err, user) => {
      if (user) {
        errors.push({ msg: 'Email already exists!' })

        res.render('register', { errors, name, email, password, password2 })
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        })

        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(value => {
                console.log('value')
                req.flash('success_msg', 'You have successfully registered!')
                res.redirect('/users/login')
              })
              .catch(value => console.log(value))
          })
        )
      }
    })
  }
})

//logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logged out!')
  res.redirect('/users/login')
})

module.exports = router
