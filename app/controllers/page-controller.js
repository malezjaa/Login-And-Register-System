class PageController {
	async showMainPage(req, res) {
		res.render('pages/home')
	}
}

module.exports = new PageController()
