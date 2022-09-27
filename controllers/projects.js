const validator = require('validator')
const zipcodes = require('zipcodes')
const cloudinary = require("../middleware/cloudinary");
const Project = require('../models/Project')
const user = require('./user')

module.exports = {
    getIndex: async (req, res) => {
        try {
            const projects = await Project.find({user: req.user.id}).sort({ createdAt: "desc" }).lean();
            res.render("projects/index", {
                isLoggedIn: req.isAuthenticated(),
                projects
            })
          } catch (err) {
            console.log(err);
        }
    },
    getAdd: (req, res) => {
        res.render("projects/add", {
            isLoggedIn: req.isAuthenticated(),
        })
    },
    postAdd: async (req, res, next) => {
        const validationErrors = {categoryError: false, titleError: false, descriptionError: false, zipCodeError: false}
        const { category, title, description, zipCode } = req.body
        let errors = []

        // Invalid category
        const allowedCategories = ['air conditioning', 'plumbing', 'roofing', 'painting', 'landscape', 'electrical', 'cleaning', 'handyman']
        if (!category || !validator.isIn(category, allowedCategories) ){
            validationErrors.categoryError = true
            errors.push({msg: 'Invalid category.'})
        }
        // Title is empty or too long
        if (!validator.isLength(title.trim(), {min: 5, max: 120})){
            validationErrors.titleError = true
            errors.push({msg: 'Project title needs to be between 5 to 120 characters.'})
        }
        // Description is empty
        if (!validator.isLength(description.trim(), {min: 5})){
            validationErrors.descriptionError = true
            errors.push({msg: 'Project description is required.'})
        }
        // Invalid zip code
        if(!zipcodes.lookup(zipCode)){
            validationErrors.zipCodeError = true
            errors.push({msg: 'Invalid zipcode.'})
        }

        let photos = []
        if(req.files.length > 1){
            console.log('hi')
            for (let i = 0; i < req.files.length; i++) {
                // Upload image to cloudinary
                const result = await cloudinary.uploader.upload(req.files[i].path)
                photos.push(result.secure_url)
            }
        }

        if (Object.values(validationErrors).indexOf(true) > -1) {
            if(errors.length > 0) req.flash("errors", errors)
            res.render('projects/add', {
                validationErrors,
                category,
                title,
                description,
                zipCode,
                isLoggedIn: req.isAuthenticated()
            })
        }else {
            // Successful validation
            try {
                const project = new Project({user: req.user.id, title, category, description, zipCode, images: photos})
                project.save(err => {
                    if(err){
                        return next(err)
                    }
                    res.redirect('/projects')
                })
            } catch (err){
                console.error(err)
            }
        }
    }
}