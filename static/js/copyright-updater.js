
var element_name = "copyright-text";

function main() {
    var d = new Date();
    var year = d.getFullYear();
    var copyright = document.getElementById(element_name);
    copyright.innerHTML = "&copy; "+year+" David Hacker &mdash; All Rights Reserved";
}

main();