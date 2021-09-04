const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'This email is not in our database.',
            })
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              return done(err, user)
            }
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, {
                message: 'You entered the wrong password.',
              })
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    })
  )
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}
