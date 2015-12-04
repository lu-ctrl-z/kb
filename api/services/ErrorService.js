/**
 * validate Model
 */
exports.addError = function(error, errorMessage) {
    var validation_error = error;
    if(!validation_error instanceof Array) {
        validation_error = new Array();
    }
    validation_error.push(errorMessage);
    return validation_error;
};