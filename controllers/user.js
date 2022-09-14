const validator = require("validator")
const User = require('../models/User')

module.exports = {
    getRegister: (req, res) => {
        res.render("register", {validationErrors: false})
    },
    postRegister: (req, res, next) => {
        console.log(req.body)
    
        const { firstName, lastName, email, password, confirmPassword, city, state } = req.body;
        const validationErrors = {emailTakenError: false, emailError: false, passwordError: false, confirmError: false};
        
        // Not a valid email
        if (!validator.isEmail(email))
            validationErrors.emailError = true;
        // Password is not at least 6 characters
        if (!validator.isLength(password, { min:6 }))
            validationErrors.passwordError = true;
        // Does password match the password confirmation
        if (!validator.equals(confirmPassword, req.body.password))
            validationErrors.confirmError = true;
        
        if (Object.values(validationErrors).indexOf(true) > -1) {
            res.render('register', {
                validationErrors,
                firstName,
                lastName, 
                email, 
                password,
                confirmPassword, 
                city, 
                state,
            });
        }

        const user = new User({firstName, lastName, email, password})
        User.findOne({email: email}, (err, existingUser) => {
            if(err){
                return next(err)
            }
            if(existingUser){
                validationErrors.emailTakenError = true;
                res.render('register', {
                    validationErrors,
                    firstName,
                    lastName, 
                    email, 
                    password,
                    confirmPassword, 
                    city, 
                    state,
                });
            }else{
                user.save(err => {
                    if(err){
                        return next(err)
                    }
                    res.redirect('/');
                })
            }
        })
    }
}