
// TITLE ANIMATION

var TYPESPEED = 100,
    STARTTIMEOUT = 3000,
    MIDTIMEOUT = 900,

    element_name = "main-heading",
    element = document.getElementById(element_name),
    title = element.innerHTML,
    new_title = "David Hacker",
    backspace,
    forwards,
    types = 1,

    delimiter = "<span class=\"cursor-blink\">|</span>";

function main() {
    element.innerHTML = title + delimiter;
    window.setTimeout(function() {start()}, STARTTIMEOUT);
}

function start() {
    backspace = window.setInterval(function() { startBackspace() }, TYPESPEED);
}


function startBackspace() {
    title = title.substr(0, title.length - 1);
    element.innerHTML = title + delimiter;
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
    element.innerHTML = title + delimiter;
    if (title === new_title) {
        endTyping();
    }
}

function endTyping() {
    window.clearInterval(forwards);
    element.innerHTML = title + delimiter;
}

main()
