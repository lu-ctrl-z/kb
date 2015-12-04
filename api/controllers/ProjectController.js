module.exports = {

    getAdd: function (req, res) {
        var user_id = req.session.user['id'];
        Project.find({ where: { delete_flg: 0, create_user: user_id } }).exec(function(err, project) {
            if(err) {
                var error = ErrorService.addError([], 'An error occured');
                res.view('project/add', {
                    message : error
                });
            } else {
                res.view('project/add', {
                    listProject: project,
                    message: req.flash('message')
                });
            }
        });
    },

    postAdd: function (req, res) {
        var project_name = req.param("project_name");
        var create_user = req.session.user['id'];

        Project.create({project_name: project_name, create_user: create_user }, function(error, project) {
            var validator = require('sails-validator-tool');
            if(error) {
                if(error.ValidationError) {
                    error_object = validator([], Project, error.ValidationError);
                    req.flash('message', error_object);
                    res.redirect('project/add');
                }
            } else {
                res.redirect('project/add');
            }
        });

    },

    getManager: function(req, res) {
        var project_id = req.param("project_id");
        var user_id = req.session.user['id'];
        Project.findOne({ where: { id: project_id, create_user: user_id, delete_flg: 0 } })
               .exec(function(err, project) {
               if(err || !project) {
                   var error = ErrorService.addError([], 'Có lỗi xẩy ra hoặc không tồn tại dự án.');
                   req.flash('message', error);
                   return res.redirect('project/add');
               }
               UsersProject.find({ where: { project_id: project_id, delete_flg: 0 } })
               .populate('user_id').exec(function(err, t_project) {
                      if(err) {
                          var error = ErrorService.addError([], 'Có lỗi xẩy ra.');
                          req.flash('message', error);
                          return res.redirect('project/add');
                       }
                       res.view('project/manager/index', {
                          listProject: t_project,
                          project: project,
                          message: req.flash('message')
                      });
               });
        });

    },
    postSprint: function(req, res) {
        var project_id = req.param("project_id");
        var start_date = req.param("start_date");
        var end_date = req.param("end_date");
        Sprint.find({
            where: {
                project_id: project_id
            }
        }).exec(function(err, sprint) {
            if(err) {
                var error = ErrorService.addError([], 'An error occured');
                req.flash('message', error);
                return res.redirect('/');
            }
            var sprint_name = sprint.length + 1;
            Sprint.create({sprint_name: sprint_name, project_id: project_id, start_date: start_date, end_date: end_date }, function(error, project) {
                var validator = require('sails-validator-tool');
                if(error) {
                    if(error.ValidationError) {
                        error_object = validator([], Project, error.ValidationError);
                        req.flash('message', error_object);
                        res.redirect('/');
                    }
                } else {
                    res.redirect('/?pid=' + project_id);
                }
            });
            return;
        });
        /*Sprint.create({sprint_name: 1, project_id: project_id, start_date: start_date, end_date: end_date }, function(error, project) {
            var validator = require('sails-validator-tool');
            if(error) {
                if(error.ValidationError) {
                    error_object = validator([], Project, error.ValidationError);
                    req.flash('message', error_object);
                    res.redirect('project/add');
                }
            } else {
                res.redirect('project/add');
            }
        });*/
    },
    addMember: function(req, res) {
        var project_id = req.param("project_id");
        var user_name = req.param("user_name");
        var email = req.param("email");
        var data = Users.searchUserNotInProject(project_id, user_name, email);
        console.log(data);
        if(data) {
            res.json(200, {
                status: "OK",
                content: data
            });
        } else {
            res.json(200, {
                status: "NG",
                message: 'không tìm thấy user.',
                content: ''
            });
        }
    }
};