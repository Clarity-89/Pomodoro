(function ($) {
    // Default timer
    var time = 15000;
    var pauseTime = 3000;
    var t = null;
    var timer = document.getElementById('timer');
    timer.innerHTML = msToTime(time);
    var pause = document.getElementById('break');
    pause.innerHTML = msToTime(pauseTime);

    function pomodoro() {

        if (time > 0) {
            time -= 1000;
            timer.innerHTML = msToTime(time);
            if (time === 0) {
                pauseTime = 3000;
            }
        } else {
            var snd = new Audio("cell.mp3"); // buffers automatically when created
            snd.play();
            pauseTime -= 1000;
            pause.innerHTML = msToTime(pauseTime);
            if (pauseTime === 0) {
                time = 15000;
            }
        }
    }


    // Format milliseconds to hh:mm:ss
    function msToTime(s) {

        function addZ(n) {
            return (n < 10 ? '0' : '') + n;
        }

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs);
    }

    $('#start').click(function () {
        if (t === null) {
            t = setInterval(pomodoro, 1000);
            $('#reset, #pause').show();
            $('#info').remove();
        }

    });

    $('#reset').click(function () {
        clearInterval(t);
        t = null;
        //set time to default value
        time = 1500000;
        timer.innerHTML = msToTime(time);
    })
})(jQuery);