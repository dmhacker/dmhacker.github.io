
// TITLE ANIMATION

var TYPESPEED = 100,
    STARTTIMEOUT = 3000,
    MIDTIMEOUT = 900,

    title = document.getElementById("main-title").innerHTML,
    new_title = "David Hacker",
    backspace,
    forwards,
    types = 1,

    delimiter = "<span class=\"cursor-blink\">|</span>";

main()

function main() {
    document.getElementById("main-title").innerHTML = title + delimiter;
    window.setTimeout(function() {start()}, STARTTIMEOUT);
}

function start() {
    backspace = window.setInterval(function() { startBackspace() }, TYPESPEED);
}


function startBackspace() {
    title = title.substr(0, title.length - 1);
    document.getElementById("main-title").innerHTML = title + delimiter;
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
    document.getElementById("main-title").innerHTML = title + delimiter;
    if (title === new_title) {
        endTyping();
    }
}

function endTyping() {
    window.clearInterval(forwards);
    document.getElementById("main-title").innerHTML = title + delimiter;
}
