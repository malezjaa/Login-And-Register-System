module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }

    req.flash('error_msg', 'To reach this site you must login!')
    res.redirect('/users/login')
  },
}
