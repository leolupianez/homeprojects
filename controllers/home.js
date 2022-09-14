module.exports = {
    getIndex: (req, res) => {
        res.render("index", {
            isLoggedIn: req.isAuthenticated()
        })
    },
}