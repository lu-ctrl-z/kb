module.exports = function authenticate (req, res, next) {
    res.locals.title = 'kanban';
    res.locals.listMessage = false;
    res.locals.isAdmin = false;
    if (req.session.authenticated && req.session.user['auth_type'] == 2) {
        res.locals.isAdmin = true;
    } 
    if(req.session.authenticated && req.session.user['id']) {
        var user_id = req.session.user['id'];
    }
    /*if(!req.session.pid) {
        res.locals.pid = true;
    }*/
    next();
};
