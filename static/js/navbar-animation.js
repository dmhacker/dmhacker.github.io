
var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

function main() {
    var nodes = document.querySelectorAll('.roll');
    for(var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (has3d) {
            node.innerHTML = '<span data-title="'+ node.text +'">' + node.innerHTML + '</span>';
        }
        else {
            node.className = node.className.replace("roll", "");
            node.className.trim();
        }
    }
    var sheet = document.createElement('style');
    if (has3d) {
        sheet.innerHTML = ".uk-navbar-nav > li:hover > a, .uk-navbar-nav > li > a:focus, .uk-navbar-nav > li.uk-open > a { background-color: lightgray; color: #444444; outline: none; }";
    }
    else {
        sheet.innerHTML = ".uk-navbar-nav > li:hover > a, .uk-navbar-nav > li > a:focus, .uk-navbar-nav > li.uk-open > a { background-color: #f5f5f5; color: #444444; outline: none; }";
    }
    document.getElementsByTagName('body')[0].appendChild(sheet);
}

main();