const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String, 
        required: true,
        trim: true
    },
    category: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true 
    },
    zipCode: { 
        type: String, 
        unique: true,
        required: true 
    },
    images: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
  
module.exports = mongoose.model("Project", ProjectSchema);