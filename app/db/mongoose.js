const mongoose = require('mongoose')
const { database } = require('../config')

mongoose
	.connect(database, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((response) => {
		console.log('Successfully connected to db')
	})
	.catch((err) => console.log(err))
