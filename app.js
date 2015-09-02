
(function () {
    var time = 1500000;

    function timer() {
        var timer = document.getElementById('timer');
        time -= 1000;
        timer.innerHTML = msToTime(time);
    }

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

    setInterval(timer, 1000);
})();