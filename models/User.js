const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const subCompanySchema = mongoose.Schema({
    companyName: {
        type: String,
    },
    logo: {
        type: String,
    },
    cloudinaryId: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    zipCodes: [{
        type: String
    }]
})

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true 
    },
    lastName: {
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    isProfessional: {
        type: Boolean,
        default: false
    },
    company: {
        type: subCompanySchema,
    },
})
  
// Password hash middleware.
UserSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
      return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})
  
// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    })
}
  
module.exports = mongoose.model("User", UserSchema);