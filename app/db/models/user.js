const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { validateEmail } = require('../validators')

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Email is required!'],
			lowercase: true,
			trim: true,
			unique: true,
			validate: (value) => [validateEmail(value), 'Email is not valid!'],
		},
		username: {
			type: String,
			required: [true, 'Name is required!'],
			minLength: [3, 'The name should have min. 3 characters!'],
		},
		password: {
			type: String,
			required: true,
			minLength: [4, 'The password should be min. 4 characters!'],
		},
	},
	{ timestamps: true }
)

userSchema.pre('save', function (next) {
	const user = this
	if (!user.isModified('password')) return next()
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(user.password, salt)
	user.password = hash
	next()
})

userSchema.post('save', function (error, doc, next) {
	if (error.code === 11000) {
		error.errors = {
			email: { message: 'This email is already taken!' },
		}
	}
	next(error)
})

userSchema.methods = {
	comparePassword(password) {
		return bcrypt.compareSync(password, this.password)
	},
}

const User = mongoose.model('User', userSchema)

module.exports = User
