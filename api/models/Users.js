/**
 *  User.js => t_users
 */

module.exports = {
    connection: 'mysql',
    tableName: 't_users',
    attributes: {
        id : {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true
        },
        user_name: {
            type: 'string',
            unique: true,
            required: true,
            maxLength: 45,
            minLength: 3,
        },
        password: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            maxLength: 60,
            minLength: 4
        },
        member_type: {
            type: 'integer',
            required: true,
            in: [1,2,3,4,5,6]
        },
        auth_type: {
            type: 'integer',
            required: false,
            defaultsTo: 1
        }
    },
    //model validation messages definitions
    validation_messages: { //hand for i18n & l10n
        email: {
            required: 'Email address is required',
            unique: 'Email address is already taken',
            maxLength: 'Email address max length 60',
            minLength: 'Email address min length 4'
        },
        user_name: {
            required: 'Username is required',
            unique: 'Username is already taken',
            maxLength: 'Username max length 45',
            minLength: 'Username min length 3'
        },
        password: {
            required: 'Password is required'
        },
        member_type: {
            required: 'Member type is required',
            in: 'Member type is valid'
        }
    },
    searchUserNotInProject: function (project_id, user_name, email) {
        var query = 'SELECT u.* FROM t_users u WHERE u.id NOT IN (SELECT user_id FROM t_users_project where project_id = ?) ';
        var param = [project_id];
        if(user_name !== 'undefined' && user_name) {
            query += ' AND u.user_name = ? ';
            param.push(user_name);
        }
        if(email !== 'undefined' && email) {
            query += ' AND u.email = ? ';
            param.push(email);
        }
        query += ' LIMIT 1';
        var data = [];
        Users.query(query, param, function(err, users) {
            if (err) return console.log(err);
            GLOBAL.data =  users;
        });
        return GLOBAL.data;
    },
};