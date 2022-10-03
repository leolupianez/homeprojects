module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/");
      }
    },
    ensureHomeowner: function (req, res, next) {
      if (!req.isAuthenticated() || !req.user.isProfessional) {
        return next();
      } else {
        res.redirect("/pro");
      }
    },
    ensureProfessional: function (req, res, next) {
      if (!req.isAuthenticated() || req.user.isProfessional) {
        return next();
      } else {
        res.redirect("/");
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        if(req.user.isProfessional){
          res.redirect("/pro/projects")
        }else{
          res.redirect("/projects")
        }
        
      }
    },
}