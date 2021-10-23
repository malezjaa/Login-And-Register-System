const User = require('../db/models/user')

class UserController {
	showRegister(req, res) {
		res.render('pages/auth/register')
	}

	async register(req, res) {
		const user = new User({
			email: req.body.email,
			password: req.body.password,
			username: req.body.username,
		})

		try {
			await user.save()
			res.redirect('/login')
		} catch (e) {
			res.render('pages/auth/register', {
				errors: e.errors,
				form: req.body,
			})
		}
	}

	showLogin(req, res) {
		res.render('pages/auth/login')
	}

	async login(req, res) {
		try {
			const user = await User.findOne({ email: req.body.email })

			if (!user) {
				throw new Error('user not found')
			}

			const isVaildPasswords = user.comparePassword(req.body.password)

			if (!isVaildPasswords) {
				throw new Error('password not valid')
			}

			req.session.user = user

			res.redirect('/')
		} catch (e) {
			res.render('pages/auth/login', {
				form: req.body,
				errors: true,
			})
		}
	}

	async logout(req, res) {
		req.session.destroy()
		res.redirect('/')
	}
}

module.exports = new UserController()
