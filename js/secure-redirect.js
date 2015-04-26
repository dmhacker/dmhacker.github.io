var host = "dmhacker.github.io";
var page_protocol = "https:";

if ((host == window.location.host) && (window.location.protocol != page_protocol))
    window.location.protocol = page_protocol;