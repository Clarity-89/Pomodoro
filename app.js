(function ($) {
    // Default timer
    var defaultTime = 15000; // 25 minutes
    var pauseTime = 3000;
    var t = null;
    var timer = document.getElementById('timer');
    timer.innerHTML = msToTime(defaultTime);

    var snd = new Audio("cell.mp3"); // buffers automatically when created

    function pomodoro() {

        if (defaultTime > 0) {
            runTimer();
            if (defaultTime === 0) {
                pauseTime = 3000;

                snd.play();
            } else {
                snd.pause();
            }
        } else {

            runBreak();
            if (pauseTime === 0) {
                defaultTime = 15000;
            }
        }
    }

    function runTimer() {
        defaultTime -= 1000;
        timer.innerHTML = msToTime(defaultTime);
    }

    function runBreak() {
        pauseTime -= 1000;
        timer.innerHTML = msToTime(pauseTime);
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