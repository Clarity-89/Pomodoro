(function ($) {
    // Default timer
    var time = 1500000;
    var t = null;
    var timer = document.getElementById('timer');
    timer.innerHTML = msToTime(time);
    function pomodoro() {

        if (time > 0) {
            time -= 1000;
            timer.innerHTML = msToTime(time);
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