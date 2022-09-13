module.exports = {
    getRegister: (req, res) => {
        res.render("register")
    },
    postRegister: (req, res) => {
        console.log(req.body)
        res.render("register")
    }
}