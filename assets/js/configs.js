/**
 * 
 */
var Config = {
    'TIMING' : {
        'timing_delay' :  60,
    },
    'task' : {
        edit_url : '/template/task/edit.html',
    }
}
$(function() {
    "user strict"
    calHeight = function() {
        $('body').css('min-height', $(window).height() + 'px');
    };
    $(window).resize(function() {
        calHeight();
    }).load(function() {
        calHeight();
    });
});