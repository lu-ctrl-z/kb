/**
 * 
 */
module.exports = {

    getLogin: function (req, res) {
        res.view('user/login');
    },
    postLogin: function (req, res) {
        var username = req.param("user_name");
        var password = req.param("password");
        Users.findOne({
                    or : [
                            { user_name: username },
                            { email: username }
                          ]
                }, function(err, usr) {
                    if (err) {
                        return res.send('DB Error !', 500)
                    } else if(usr) {
                        var bcrypt = require('bcrypt-nodejs');
                        bcrypt.compare(password, usr.password, function(err, valid) {
                            if(err || !valid) {
                                var error = ErrorService.addError([], 'Invalid username and password combination !');
                                return res.view('user/login', {
                                    message: error
                                });
                            }
                            // The user has authenticated successfully, set their session
                            req.session.authenticated = true;
                            req.session.user = usr;
                            return res.redirect('/');
                        });
                    } else {
                        var error = ErrorService.addError([], 'Invalid username and password combination !');
                        return res.view('user/login', {
                            message: error
                        });
                    }
                });
    },
    //join member
    getJoin: function(req, res) {
        res.view('user/join');
    },
    signup: function (req, res) {
        var username = req.param("user_name");
        var password = req.param("password");
        var email = req.param("email");
        var member_type = req.param("member_type");
        var bcrypt = require('bcrypt-nodejs');
        // Hash the password
        bcrypt.hash(password, null, null, function(err, hash) {
            if (err) {
                var error = ErrorService.addError([], 'An error occured');
                res.json(200, {
                    status: "NG",
                    message: error,
                    content: ''
                });
            }
            if(password) password = hash;
            // Store hash in your password DB.
            Users.create({user_name: username, password: password, email: email, member_type: member_type}, function(error, user) {
                var validator = require('sails-validator-tool');
                if(error) {
                    if(error.ValidationError) {
                        var error_object = validator([], Users, error.ValidationError);
                        res.json(200, {
                            status: "NG",
                            message: error_object,
                            content: ''
                        });
                    }
                } else {
                    var error = ErrorService.addError([], username + 'created');
                    res.json(200, {
                        status: "OK",
                        message: error,
                        content: ''
                    });
                }
            });
        });
    },
    getLogout: function (req, res) {
        req.session.destroy();
        return res.redirect("/");
    }
};
