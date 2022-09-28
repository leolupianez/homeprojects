module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/");
      }
    },
    ensureClient: function (req, res, next) {
      if (!req.isAuthenticated() || !req.user.isProfessional) {
        return next();
      } else {
        res.redirect("/professional");
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
        res.redirect("/")
      }
    },
}