
var BLINKSPEED = 300;
var TYPESPEED = 250;
var STARTTIMEOUT = 5000;
var MIDTIMEOUT = 900;

var title = document.getElementById("main-title").innerHTML;
var new_title = "David Hacker";
var backspace;
var forwards;

var blinked = false;
var blinktask = window.setInterval(function() { blink() }, BLINKSPEED);

window.setTimeout(function() {main()}, STARTTIMEOUT);

function main() {
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

var types = 1;

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
