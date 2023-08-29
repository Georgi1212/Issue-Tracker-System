function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { 
      return res.redirect('/homepage');
    }
    next();
}

module.exports = checkNotAuthenticated;