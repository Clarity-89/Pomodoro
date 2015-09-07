(function ($) {
    // Default timer
    var defaultTime = 1500000 / 100, // 25 minutes
        pauseTime = 3000, // 5 minutes for a short break
        userSetTime, //the length of  pomodoro set by user (if different from the default time)
        t = null, // a switch to check if the timer has been started
        increase = $('#increase'),
        decrease = $('#decrease'),
        session = $('#session'),
        count = 1, // number of sessions
        audio = true,
        timer = document.getElementById('timer'),
        alarm = new Audio('audio/bell.mp3'),
        clock = new Audio('audio/clock.mp3'),
        winding = new Audio('audio/winding.mp3');

    function setTime() {
        return timer.innerHTML = msToTime(defaultTime, true);
    }

    function runTimer() {
        defaultTime -= 1000;
        timer.innerHTML = msToTime(defaultTime, true);
        if (audio) clock.play();
        else clock.pause();
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

        return seconds ? addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs) : addZ(hrs) + ':' + addZ(mins);
    }

    function pomodoro() {

        if (defaultTime > 0) {
            runTimer();
            if (defaultTime === 0 && count < 4) {
                pauseTime = 3000 * 4;
                if (pauseTime = 3000 * 4) {
                    clock.pause();
                    alarm.play();
                }
            } else if (defaultTime === 0 && count === 4) {
                count = 0;
                pauseTime = 3000 * 5;
                clock.pause();
                alarm.play();
            }
        } else {
            if (count === 0) session.text('Long break!');
            else session.text('Break!');
            clock.pause();

            runBreak();
            if (pauseTime === 0) {
                count += 1;
                defaultTime = userSetTime;
                alarm.play();
                session.text('Session: ' + count);
            }
        }
    }

    increase.click(function () {
        if (audio) {
            winding.play();
        }
        if (t === null && defaultTime < 3600000) {
            defaultTime = (defaultTime + 300000);
            setTime();
        }
    });

    decrease.click(function () {
        if (audio) {
            winding.play();
        }
        if (t === null && defaultTime > 300000) {
            defaultTime = (defaultTime - 300000);
            setTime();
        }
    });

    $('#start').click(function () {
        if (t === null) {
            t = setInterval(pomodoro, 1000);
            increase.hide();
            decrease.hide();
            userSetTime = defaultTime;
            session.text('Session: ' + count);
        }
    });

    $('#reset').click(function () {
        clearInterval(t);
        t = null;
        //set time to default value
        defaultTime = userSetTime || defaultTime;
        setTime();
        clock.pause();
        alarm.pause();
        increase.show();
        decrease.show();
        count = 1;
        session.html('&nbsp;');
    });
    $('#volume').click(function () {
        if (audio) {
            $(this).attr('class', 'fa fa-volume-off fa-3x');
            audio = false;
        } else {
            $(this).attr('class', 'fa fa-volume-up fa-3x');
            audio = true;
        }
    });
    setTime();
})(jQuery);