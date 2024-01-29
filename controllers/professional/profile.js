const validator = require("validator")
const User = require('../../models/User')
const Project = require('../../models/Project')
const bcrypt = require('bcrypt')
const cloudinary = require("../../middleware/cloudinary")

module.exports = {
    getProProfile: async (req, res) => {      
        const {firstName, lastName, email, company} = req.user

        res.render("professional/profile/index", {
            layout: './layouts/pro',
            isLoggedIn: req.isAuthenticated(),
            firstName,
            lastName,
            email,
            companyName: company.companyName,
            companyPhone: company.phoneNumber,
            companyLogo: company.logo,
            connectionCount: 0
        })
    },
    getProEditProfile: async (req, res) => {
        const {firstName, lastName, email, company} = req.user

        res.render("professional/profile/edit", {
            layout: './layouts/pro',
            isLoggedIn: req.isAuthenticated(),
            validationErrors: false,
            firstName,
            lastName,
            email,
            companyName: company.companyName,
            companyPhone: company.phoneNumber,
        })
    },
    postProEditProfile: async (req, res) => {
        const { firstName, lastName, email, companyName, companyPhone, password, newPassword, confirmNewPassword } = req.body;
        const user = await User.findById(req.user.id)

        const validationErrors = {emailTakenError: false, emailError: false, phoneError: false, passwordError: true, newPasswordError: false, confirmNewPasswordError: false};
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
            errors.push({msg: 'Current password entered is incorrect.'})
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
        // Not a valid phone number
        if (!validator.isMobilePhone(companyPhone)){
            validationErrors.phoneError = true
            errors.push({msg: 'Invalid phone number.'})
        }

        if (Object.values(validationErrors).indexOf(true) > -1) {
            if(errors.length > 0) req.flash("errors", errors)
            res.render('professional/profile/edit', {
                layout: './layouts/pro',
                isLoggedIn: req.isAuthenticated(),
                validationErrors,
                firstName, 
                lastName, 
                email, 
                companyName, 
                companyPhone,
                password, 
                newPassword, 
                confirmNewPassword
            })
        }else {            
            if(req.file){
                // Remove existing logo
                if(user.company.cloudinaryId)
                    await cloudinary.uploader.destroy(user.company.cloudinaryId)
                
                // Upload image to cloudinary
                const result = await cloudinary.uploader.upload(req.file.path)
                user.company.logo = result.secure_url
                user.company.cloudinaryId = result.public_id
            }

            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.company.companyName = companyName
            user.company.phoneNumber = companyPhone
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
                    res.redirect('/pro/profile');
                })
            })
        }
    }
}