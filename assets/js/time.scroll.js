/**
 * 
 */
Number.prototype.padLeft = function(base, chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
};
Date.prototype.dformat = function() {
    return [this.getFullYear(), (this.getMonth()+1).padLeft(), this.getDate().padLeft()].join('-') + ' ' +
           [this.getHours().padLeft(), this.getMinutes().padLeft()].join(':');
}
Date.prototype.sformat = function(str) {
    str = str.replace(/-/g, '/');
    var dateString = str.match(/\d{4}\/\d{2}\/\d{2}\s+\d{2}:\d{2}(:\d{2})?/);
    return new Date(dateString);
}
$.fn.timeScroll = function($config) {
    var $this = $(this);
    var currentDate = new Date();
    if($this.val()) {
        currentDate = currentDate.sformat($this.val());
    }
    var startDate = new Date(currentDate.getTime() - 1*24*60*60*1000);
    var endDate = new Date(currentDate.getTime() + 1*24*60*60*1000);
    var $option = $.extend({
        'startDate' : startDate,
        'endDate' : endDate,
        '_const'  : 100,
        '_const_height': 80000,
    }, $config);
    var curentRange = currentDate.getTime() - startDate.getTime();
    var range = endDate.getTime() - startDate.getTime();
    var percent = curentRange/range;
    var $panel =  $(this).wrap('<div class="time-scroll"></div>')
           .parent().append('<div class="time-scroll-panel" tabindex="999"><div class="scroll-hidden"></div></div>')
           .find('.time-scroll-panel');
    $panel.scroll(function() {
        var newDate = new Date(startDate.getTime() + (($(this).scrollTop()*range)/$option._const_height));
        $this.val(newDate.dformat());
    });
    $panel.scrollTop(percent*$option._const_height);
    var isFocus = false;
    $panel.focus(function() {
        isFocus = true;
        $this.parents('.time-scroll').addClass('active');
    });
    $this.focus(function() {
        isFocus = true;
        $this.parents('.time-scroll').addClass('active');
    });
    $panel.blur(function() {
        isFocus = false;
        setTimeout(function() {
            if(!isFocus) {
                $this.parents('.time-scroll').removeClass('active');
            }
        }, 100);
    });
    $this.blur(function() {
        isFocus = false;
        setTimeout(function() {
            if(!isFocus) {
                $this.parents('.time-scroll').removeClass('active');
            }
        }, 100);
    });
};
$(function() {
    $("#time").timeScroll();
});