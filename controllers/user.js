const validator = require("validator");

module.exports = {
    getRegister: (req, res) => {
        res.render("register", {validationErrors: false})
    },
    postRegister: (req, res) => {
        console.log(req.body)

        const { firstName, lastName, emailAddress, password, confirmPassword, city, state } = req.body;
        const validationErrors = {emailError: false, passwordError: false, confirmError: false};
        
        // Not a valid email
        if (!validator.isEmail(emailAddress))
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
                emailAddress, 
                password,
                confirmPassword, 
                city, 
                state,
            });
        }
    }
}