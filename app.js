(function ($) {
    // Default timer
    var defaultTime = 15000, // 25 minutes
        pauseTime = 3000,
        userSetTime, //the length of  pomodoro set by user (if different from the default time)
        t = null,
        timer = document.getElementById('timer');
    var snd = new Audio("cell.mp3");

    function setTime() {
        return timer.innerHTML = msToTime(defaultTime, true);
    }

    function runTimer() {
        defaultTime -= 1000;
        timer.innerHTML = msToTime(defaultTime, true);
    }

    function runBreak() {
        pauseTime -= 1000;
        timer.innerHTML = msToTime(pauseTime, true);
    }

    // Format milliseconds to hh:mm:ss
    function msToTime(s, seconds) {

        function addZ(n) {
            return (n < 10 ? '0' : '') + n;
        }

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        // var hrs = (s - mins) / 60;

        return seconds ? addZ(mins) + ':' + addZ(secs) : addZ(mins);
    }

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
                defaultTime = userSetTime;
            }
        }
    }

    $('#increase').click(function () {
        if (t === null) {
            defaultTime = (defaultTime + 300000) % 3600000;
            setTime();
        }
    });

    $('#decrease').click(function () {
        if (t === null) {
            defaultTime = (defaultTime - 300000) % 3600000;
            setTime();
        }
    });

    $('#start').click(function () {
        if (t === null) {
            t = setInterval(pomodoro, 1000);
            $('#reset').show();
            userSetTime = defaultTime;
            console.log(userSetTime);
        }
    });

    $('#reset').click(function () {
        clearInterval(t);
        t = null;
        //set time to default value
        defaultTime = userSetTime;
        setTime();
    });
    setTime();
})(jQuery);