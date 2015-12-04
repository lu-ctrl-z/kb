/**
 *  User.js => t_users
 */

module.exports = {
    connection: 'mysql',
    tableName: 't_sprint',
    attributes: {
        id : {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true
        },
        sprint_name: {
            type: 'string',
            required: true,
        },
        project_id: {
            model: 'project',
        },
        start_date: {
            type: 'datetime',
            required: true,
        },
        end_date: {
            type: 'datetime',
            required: true,
        },
    },
    //model validation messages definitions
    validation_messages: { //hand for i18n & l10n
        sprint_name: {
            required: 'Sprint name is required',
        },
        start_date: {
            required: 'Start date is required',
        },
        end_date: {
            required: 'End date is required',
        },
    }
};