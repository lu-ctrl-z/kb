/**
 * 
 */
$.fn.sleepy = function() {
    $(this).click(function() {
        var $this = $(this);
        var $is_sleep = $this.hasClass('sleep');
        var $task = $this.parents('.task');
        $task.find('.task-item').addClass('sleep');
        $this.removeClass('sleep').find('.popup').removeClass('active');
    });
    return this;
};
$.fn.taskRemove = function() {
    var $task = $(this).parents('.task-item');
    $task.addClass('wait-for-remove');
    setTimeout( function() {
        $task.remove();
    }, 300)
};
$.fn.taskRecived = function($task) {
    $task.addClass('wait-for-remove');
    var $this = $(this);
    $this.append($task);
    $task.click();
    setTimeout( function() {
        $task.removeClass('wait-for-remove');
    }, 300)
};
$.fn.taskProcessTiming = function() {
    var $this = $(this);
    setInterval(function() {
        $this.find('.task-item').each(function() {
            var $task = $(this);
            try{
                $done = $task.attr('timing') ? $task.attr('timing') : 0;
            } catch(e) {
                var $done = 0;
            }
            $task.attr('timing', ++$done);
            if($done%Config.TIMING.timing_delay == 0) {
                var hour = parseInt($done/3600);
                var minus = ($done-(hour*3600))/60;
                $task.attr('show-time', hour + "h " + minus + 'm');
            }
        });
    }, 1000);
};
$.fn.lockScreen = function () {
    $('body').addClass('lock');
    var $popup = $('body > .popup-box');
    var margin_left = - $popup.width()/2;
    var margin_top = - $popup.height()/2;
    $popup.css('margin-left', margin_left).css('margin-top', margin_top);
    $('overlay').click(function() {
        $('body').unlockScreen();
    });
};
$.fn.unlockScreen = function() {
    $('body').removeClass('lock');
    $('body > .popup-box').remove();
    $('overlay').unbind('click');
}
$(function() {
    $('[role^="cmd-"]').click(function() {
        return false;
    });
    $('.task-doing').taskProcessTiming();
    $('.task-item').sleepy().addClass('sleep');
    $('[role="cmd-sleep"]').click(function() {
        $(this).parents('.task-item').addClass('sleep');
    });
    $('[role="cmd-toggle"]').click(function() {
        $(this).parents('.task-item').find('.popup').toggleClass('active').focus();
    });
    $('[role="cmd-remove"]').click(function() {
        $(this).taskRemove();
    });
    $('[role="cmd-sendto-done"]').click(function() {
        var $task = $(this).parents('.task-item');
        var $todo = $(this).parents('tr').find('.task-done');
        socket.emit( 'changeStatus', { task_id: $task.attr('id'), target: $todo.attr('id') } );
    });
    $('[role="cmd-sendto-suppend"]').click(function() {
        var $task = $(this).parents('.task-item');
        var $suppend = $(this).parents('tr').find('.task-suppend');
        socket.emit( 'changeStatus', { task_id: $task.attr('id'), target: $suppend.attr('id') } );
    });
    $('[role="cmd-sendto-review"]').click(function() {
        var $task = $(this).parents('.task-item');
        var $review = $(this).parents('tr').find('.task-review');
        socket.emit( 'changeStatus', { task_id: $task.attr('id'), target: $review.attr('id') } );
    });
    $('[role="cmd-sendto-review-waiting"]').click(function() {
        var $task = $(this).parents('.task-item');
        var $waiting = $(this).parents('tr').find('.task-review-waiting');
        socket.emit( 'changeStatus', { task_id: $task.attr('id'), target: $waiting.attr('id') } );
    });
    $('[role="cmd-sendto-doing"]').click(function() {
        var $task = $(this).parents('.task-item');
        var $doing = $(this).parents('tr').find('.task-doing');
        socket.emit( 'changeStatus', { task_id: $task.attr('id'), target: $doing.attr('id') } );
    });
    $('[role="cmd-sendto-to-do"]').click(function() {
        var $task = $(this).parents('.task-item');
        var $to_do = $(this).parents('tr').find('.task-to-do');
        socket.emit( 'changeStatus', { task_id: $task.attr('id'), target: $to_do.attr('id') } );
    });
    $('overlay > *').click(function() {
        return false;
    });
    $('body').on('change', '.task-form input[name="type"]', function() {
        var $val = $(this).val();
        var $class = 'task-form ';
        if($val == 1) {
            $class += 'green';
        } else if($val == 2) {
        	$class += 'orange';
        } else if($val == 3) {
            $class += 'red';
        }
        $(this).parents('.task-form').attr('class', '').addClass($class);
    });
});