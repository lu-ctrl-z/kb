/**
 * 
 */
module.exports = {
    connection: 'mysql',
    tableName: 't_users_project',
    attributes: {
        id : {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true
        },
        project_id: {
            type: 'integer',
            required: true,
            model: 'project'
        },
        user_id: {
            type: 'integer',
            required: true,
            model: 'users'
        },
        delete_flg: {
            type: 'integer',
            required: false,
            defaultsTo: 0
        }
    },
    //model validation messages definitions
    validation_messages: { //hand for i18n & l10n
        project_id: {
            required: 'Project is required'
        },
        user_id: {
            required: 'User is required',
        }
    }

}