const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const { sessionKeySecret } = require('./config')

const app = express()

require('./db/mongoose')

//session
app.use(
	session({
		secret: 'secretkey',
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
		resave: false,
	})
)

//view engine
app.set('view engine', 'ejs')

//ejs layout
app.use(ejsLayouts)
app.set('layout', './layouts/main')

//body parser
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//public folder
app.use(express.static('public'))

//middleware
app.use('/', require('./middlewares/variables'))
app.use('/', require('./middlewares/users'))

app.use(require('./routes/web'))

module.exports = app
