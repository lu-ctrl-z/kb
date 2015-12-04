/**
 * 
 */
module.exports = {
    connection: 'mysql',
    tableName: 'm_project',
    attributes: {
        id : {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true
        },
        project_name: {
            type: 'string',
            required: true,
            unique: true
        },
        create_user: {
            type: 'integer',
            required: true
        },
        delete_flg: {
            type: 'integer',
            required: false,
            defaultsTo: 0
        }
    },
    //model validation messages definitions
    validation_messages: { //hand for i18n & l10n
        project_name: {
            required: 'Project name is required',
            unique: 'Project name is already taken'
        },
        create_user: {
            required: 'Create user is required',
        }
    }

}