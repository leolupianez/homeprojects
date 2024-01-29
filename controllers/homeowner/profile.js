const validator = require("validator")
const User = require('../../models/User')
const Project = require('../../models/Project')
const bcrypt = require('bcrypt')

module.exports = {
    getUserProfile: async (req, res) => {      
        const user = await User.findById(req.user.id).populate('connections')
        const projects = await Project.find({user: req.user.id}).lean()

        res.render("homeowner/profile/index", {
            isLoggedIn: req.isAuthenticated(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            projectCount: projects.length,
            connections: user.connections
        })
    },
    getEditProfile: async (req, res) => {
        const { firstName, lastName, email } = req.user

        res.render("homeowner/profile/edit", {
            isLoggedIn: req.isAuthenticated(),
            validationErrors: false,
            firstName,
            lastName,
            email
        })
    },
    postEditProfile: async (req, res) => {
        const { firstName, lastName, email, password, newPassword, confirmNewPassword } = req.body;

        const user = await User.findById(req.user.id)

        const validationErrors = {emailTakenError: false, emailError: false, passwordError: true, newPasswordError: false, confirmNewPasswordError: false};
        let errors = [] 

        // Not a valid email
        if (!validator.isEmail(email)){
            validationErrors.emailError = true
            errors.push({msg: 'Invalid email entered.'})
        }
        // Password matches the user's current password
        if(await bcrypt.compare(password, user.password)){
            validationErrors.passwordError = false
        }else{
            errors.push({msg: 'Password entered needs to much existing password.'})
        }

        // If password is being changed, password must match at least 6 characters
        if (newPassword != '' && !validator.isLength(newPassword, { min:6 })){
            validationErrors.newPasswordError = true
            errors.push({msg: 'The new password needs to be at least 6 characters.'})
        }
        // If password is being changed, confirm password must match new password 
        if (newPassword != '' && !validator.equals(confirmNewPassword, newPassword)){
            validationErrors.confirmNewPasswordError = true;
            errors.push({msg: 'New password confirmation must match new password.'})
        }

        if (Object.values(validationErrors).indexOf(true) > -1) {
            if(errors.length > 0) req.flash("errors", errors)
            res.render('homeowner/profile/edit', {
                validationErrors,
                firstName, 
                lastName, 
                email, 
                password, 
                newPassword, 
                confirmNewPassword,
                isLoggedIn: req.isAuthenticated()
            })
        }else {
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            if(newPassword.length >= 6){
                user.password = newPassword
            }

            user.save(err => {
                if(err){
                    return next(err)
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/profile');
                })
            })
        }
    }
}