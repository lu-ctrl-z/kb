module.exports = function isNotLogin (req, res, next) {
    if (!req.session.authenticated) {
        return next();
    } else {
        return res.redirect('/');
    }
};
