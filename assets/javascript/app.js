// default time variables
var timeLeft = 30;
var answerTime = 3;
var intervalId;
var go = true;

function count() {
    timeLeft --;
    $("#time-left").text(timeLeft);
}

function run() {
    intervalId = setInterval(count, 1000);
}

run();