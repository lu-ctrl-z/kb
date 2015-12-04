/**
 * 
 */
$.fn.myTime = function(config) {
    var $config = $.extend({
        min: 1, // 1 mimute
        minHour: 8.5,
        maxHour: 17.5,
    }, config);
    var $this = $(this);
    $this.wrap("<div class= style='position: relative; display: inline;'></div>");
    //var $scroll = $()
    return;
    $this.scroll(function(){
        $("span").text( x+= 1);
    });
};