const express = require('express')
const mongoose = require('mongoose')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const { port, mongoose1 } = require('./config')

require('./config/passport')(passport)

const mainRouter = require('./routes/index')
const userRouter = require('./routes/users')

mongoose
  .connect(mongoose1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

app.use('/', mainRouter)
app.use('/users', userRouter)

app.listen(port, function () {
  console.log('server running on port: http://localhost:' + port)
})
