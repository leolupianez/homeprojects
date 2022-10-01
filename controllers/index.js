module.exports = {
    getIndex: (req, res) => {
        res.render("homeowner/index", {
            isLoggedIn: req.isAuthenticated()
        })
    },
    getProIndex: (req, res) => {
        res.render("professional/index", {
            isLoggedIn: req.isAuthenticated(),
            layout: './layouts/pro'
        })
    },
}