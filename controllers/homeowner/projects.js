const validator = require('validator')
const zipcodes = require('zipcodes')
const cloudinary = require("../../middleware/cloudinary");
const Project = require('../../models/Project')
const Comment = require('../../models/Comment')

module.exports = {
    getProjects: async (req, res) => {
        try {
            const projects = await Project.find({user: req.user.id}).sort({ createdAt: "desc" }).lean();
            res.render("homeowner/projects/index", {
                isLoggedIn: req.isAuthenticated(),
                projects
            })
          } catch (err) {
            console.log(err);
        }
    },
    getProject: async (req, res) => {
        try {
            const project = await Project.findById(req.params.id).populate('user').lean()
            const connections = project.user.connections.map(n => n.toString())
            const comments = await Comment
                .find({projectId: req.params.id})
                .sort({ createdAt: "desc" })
                .populate('userId')
                .populate('replies.userId')
                .lean()
            
            res.render("homeowner/projects/single", {
                isLoggedIn: req.isAuthenticated(),
                project,
                comments,
                connections
            })
          } catch (err) {
            console.log(err);
        }
    },
    getAdd: (req, res) => {
        res.render("homeowner/projects/add", {
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

        if (Object.values(validationErrors).indexOf(true) > -1) {
            if(errors.length > 0) req.flash("errors", errors)
            res.render('homeowner/projects/add', {
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
                let photos = []
                if(req.files){
                    for (let i = 0; i < req.files.length; i++) {
                        // Upload image to cloudinary
                        const result = await cloudinary.uploader.upload(req.files[i].path)
                        photos.push(result.secure_url)
                    }
                }

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
    },
    removeProject: async (req, res, next) => {
        try {
            const project = await Project.findById(req.params.id);
            if(req.user.id == project.user.toString()){
                await project.remove(err => {
                    if(err){
                        return next(err)
                    }
                    res.redirect('/projects')
                })
            }else{
                res.redirect('/projects')
            }
        } catch (err){
            console.error(err)
        }
    },
    editProject: async (req, res, next) => {
        try {
            const project = await Project.findById(req.params.id).lean()
            if(project.user != req.user.id || !project) {
                res.redirect('/projects')
            }else{
                res.render('homeowner/projects/edit', {
                    id: project._id,
                    category: project.category,
                    title: project.title,
                    description: project.description,
                    zipCode: project.zipCode,
                    isLoggedIn: req.isAuthenticated()
                })
            }
        } catch (err){
            console.error(err)
        }
    },
    updateProject: async (req, res, next) => {
        try {
            const project = await Project.findById(req.params.id)
            if(project.user.toString() != req.user.id || !project) {
                res.redirect('/projects')
            }else{
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

                if (Object.values(validationErrors).indexOf(true) > -1) {
                    if(errors.length > 0) req.flash("errors", errors)
                    res.render('homeowner/projects/edit', {
                        validationErrors,
                        id: project._id,
                        category,
                        title,
                        description,
                        zipCode,
                        isLoggedIn: req.isAuthenticated()
                    })
                }else {
                    // Successful validation
                    let photos = []
                    if(req.files){
                        for (let i = 0; i < req.files.length; i++) {
                            // Upload image to cloudinary
                            const result = await cloudinary.uploader.upload(req.files[i].path)
                            photos.push(result.secure_url)
                        }
                    }
                    
                    project.title = title
                    project.category = category
                    project.description = description
                    project.zipCode = zipCode
                    project.images = photos.length > 0 ? photos : project.images
                    await project.save()

                    req.flash("success", { msg: "Success! Your project was updated." });
                    res.redirect(`/projects/${req.params.id}`)
                }
            }
        } catch (err){
            console.log(err)
        }
    },
    addReply: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id)
            if(comment){
                comment.replies.push({reply: req.body.reply, userId: req.user.id})
                await comment.save()
                req.flash("success", { msg: "Success! Your reply has been submitted." });
                res.redirect(`/projects/${comment.projectId}`)
            }else{
                res.redirect('/projects')
            }
        } catch (err) {
            console.error(err)
        }
    },
    removeReply: async (req, res) => {
        try {
            const comment = await Comment.findByIdAndUpdate(req.params.commentId, { 
                '$pull': {
                    'replies': {'_id': req.params.replyId }
                }
            })
            res.redirect(`/projects/${comment.projectId}`)
        } catch (err) {
            console.error(err)
        }
    }
}