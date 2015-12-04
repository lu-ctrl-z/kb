module.exports = function isLogin (req, res, next) {
    if (req.session.authenticated) {
        var project_id = req.param("pid");
        res.locals.sysPid = project_id;
        var sprint_id = req.param("sid");
        res.locals.sysSid = sprint_id;
        if(project_id) {
            Sprint.find({
                where: {
                    project_id: project_id
                }
            }).exec(function(err, sprint) {
                if(err) return next(err);
                res.locals({
                    sysSprint : sprint
                });
                //last sprint
                if(!sprint_id) {
                    res.locals.sysSid = sprint.length;
                }
                next();
            });
        } else {
            next();
        }
    } else {
        return res.redirect('/login');
    }
};