const User = require('../models/User')

module.exports = {
    postRequest: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)

            // Check if already connected
            if(user.connections.includes(req.params.id)){
                req.flash("errors", { msg: "You are already connected." });
                res.redirect('back')
            }else{
                // Add connection
                user.connections.push(req.params.id)
                user.save(err => {
                    if(err){
                        return next(err)
                    }
                    req.flash("success", { msg: "Success! You are now connected." });
                    res.redirect('back')
                })
            }
        } catch (err) {
            console.log(err)
        }
    },
    removeConnection: (req, res) => {
        User.findById(req.user.id, (err, user) => {
            if(err){
                return next(err)
            }
            const index = user.connections.indexOf(req.params.id)
            if (index > -1) {
                user.connections.splice(index, 1)
                user.save(err => {
                    if(err){
                        return next(err)
                    }
                    req.flash('success', {msg: 'Your connection was removed.'})
                    res.redirect('back')
                })
            }
        })
    }
}