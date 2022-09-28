const validator = require('validator')
const zipcodes = require('zipcodes')
const Project = require('../../models/Project')

module.exports = {
    getProjects: (req, res) => {
        res.render("professional/projects/index", {
            layout: './layouts/pro',
            isLoggedIn: req.isAuthenticated()
        })
    },
}