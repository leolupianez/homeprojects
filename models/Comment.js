const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String, 
        required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Comment", CommentSchema);