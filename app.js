(function ($) {
    // Default timer
    var defaultTime = 1500000, // 25 minutes
        pauseTime = 3000,
        userSetTime, //the length of  pomodoro set by user (if different from the default time)
        t = null,
        timer = document.getElementById('timer');
    var alarm = new Audio("alarm.wav");
    var clock = new Audio('clock.wav');

    function setTime() {
        return timer.innerHTML = msToTime(defaultTime, true);
    }

    function runTimer() {
        defaultTime -= 1000;
        timer.innerHTML = msToTime(defaultTime, true);
        clock.play();
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
        var hrs = (s - mins) / 60;

        return seconds ? addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs) : addZ(mins);
    }

    function pomodoro() {

        if (defaultTime > 0) {
            runTimer();
            if (defaultTime === 0) {
                pauseTime = 3000;

            } else {
                alarm.pause();
            }
        } else {
            clock.pause();
            alarm.play();
            runBreak();
            if (pauseTime === 0) {
                defaultTime = userSetTime;
            }
        }
    }

    $('#increase').click(function () {
        if (t === null && defaultTime < 3600000) {
            defaultTime = (defaultTime + 300000);
            setTime();
        }
    });

    $('#decrease').click(function () {
        if (t === null && defaultTime > 1200000) {
            defaultTime = (defaultTime - 300000);
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
        clock.pause();
        alarm.pause();
    });
    setTime();
})(jQuery);