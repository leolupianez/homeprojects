const Project = require('../../models/Project')
const User = require('../../models/User')
const Comment = require('../../models/Comment')
const zipcodes = require('zipcodes')

module.exports = {
    getProjects: async (req, res) => {
        const user = await User.findById(req.user.id).lean()
        const projects = await Project.find({zipCode: { $in: user.company.zipCodes}, status: 'open'})

        res.render("professional/projects/index", {
            layout: './layouts/pro',
            isLoggedIn: req.isAuthenticated(),
            zipCodes: user.company.zipCodes,
            viewAll: false,
            projects
        })
    },
    getProject: async (req, res) => {
        try {
            const project = await Project.findById(req.params.id).lean();
            const comment = await Comment.findOne({userId: req.user.id, projectId: req.params.id}).lean();
            res.render("professional/projects/single", {
                layout: './layouts/pro',
                isLoggedIn: req.isAuthenticated(),
                project,
                comment,
                company: req.user.company.companyName
            })
          } catch (err) {
            console.log(err);
        }
    },
    getAllProjects: async (req, res) => {
        const user = await User.findById(req.user.id).lean()
        const projects = await Project.find({status: 'open'})

        res.render("professional/projects/index", {
            layout: './layouts/pro',
            isLoggedIn: req.isAuthenticated(),
            zipCodes: user.company.zipCodes,
            viewAll: true,
            projects
        })
    },
    addZip: async (req, res) => {
        try {
            const zipCode = req.body.zip
            let errors = []

            // Invalid zip code
            if(!zipcodes.lookup(zipCode)){
                errors.push({msg: 'Invalid zipcode.'})
            }
            if(errors.length > 0){
                req.flash("errors", errors)
                res.redirect('/pro/projects')
            }else{
                User.findById(req.user.id, (err, user) => {
                    if(err){
                        return next(err)
                    }

                    if(user.company.zipCodes.includes(zipCode)){
                        req.flash("errors", {msg: 'You have already added this zip code.'})
                        res.redirect('/pro/projects')
                    }else{
                        user.company.zipCodes.push(zipCode)
                        user.save(err => {
                            if(err){
                                return next(err)
                            }
                            res.redirect('/pro/projects')
                        })
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    },
    removeZip: async (req, res) => {
        User.findById(req.user.id, (err, user) => {
            if(err){
                return next(err)
            }
            const index = user.company.zipCodes.indexOf(req.body.zipCode)
            if (index > -1) {
                console.log('hi')
                user.company.zipCodes.splice(index, 1)
                user.save(err => {
                    if(err){
                        return next(err)
                    }
                    res.json('Removed')
                })
            }
        })
    },
    addComment: async (req, res) => {
        const comment = new Comment({ comment: req.body.comment, userId: req.user.id, projectId: req.params.id })
        comment.save(err => {
            if(err){
                return next(err)
            }
            res.redirect(`/pro/projects/${req.params.id}`)
        })
    }
}