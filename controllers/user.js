const passport = require("passport");
const validator = require("validator")
const User = require('../models/User')

module.exports = {
    getRegister: (req, res) => {
        res.render("register", {validationErrors: false})
    },
    postRegister: (req, res, next) => {
        console.log(req.body)
    
        const { firstName, lastName, email, password, confirmPassword } = req.body;
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
            });
        }else {
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
                    });
                }else{
                    user.save(err => {
                        if(err){
                            return next(err)
                        }
                        req.logIn(user, (err) => {
                            if (err) {
                                return next(err);
                            }
                            res.redirect('/');
                        })
                    })
                }
            })
        }
    },
    getLogin: (req, res) => {
        res.render("login", {validationErrors: false})
    },
    postLogin: (req, res, next) => {
        const validationErrors = {emailError: false, passwordError: false}
        const { email, password} = req.body

        // Not a valid email
        if (!validator.isEmail(email))
            validationErrors.emailError = true;
        // Password is not at least 6 characters
        if (!validator.isLength(password, { min:6 }))
            validationErrors.passwordError = true;

        if (Object.values(validationErrors).indexOf(true) > -1) {
            res.render('login', {
                validationErrors,
                email: req.body.email
            })
        }else {
            passport.authenticate("local", (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.flash("errors", info);
                    return res.redirect("/login");
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    req.flash("success", { msg: "Success! You are logged in." });
                    res.redirect(req.session.returnTo || "/");
                });
            })(req, res, next);
        }
    },
    getLogout: (req, res, next) => {
        req.logout( err => {
            if (err) { return next(err) }
        })
        req.session.user = null
        req.session.save(function (err) {
          if (err) next(err)

          req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
          })
        })
    },
}