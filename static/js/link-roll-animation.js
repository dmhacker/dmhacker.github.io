function has3d() {
    if (!window.getComputedStyle) {
        return false;
    }

    var el = document.createElement('p'), 
        has3d,
        transforms = {
            'webkitTransform':'-webkit-transform',
            'OTransform':'-o-transform',
            'msTransform':'-ms-transform',
            'MozTransform':'-moz-transform',
            'transform':'transform'
        };

    // Add it to the body to get the computed style.
    document.body.insertBefore(el, null);

    for (var t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = "translate3d(1px,1px,1px)";
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
    }

    document.body.removeChild(el);

    return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}

function main(no_link_nodes, no_link_text) {
    var supported = has3d();
    var nodes = document.querySelectorAll('.roll');
    for(var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (supported) {
            var node_text = node.text;
            if (no_link_nodes.indexOf(node_text) > -1) {
                node_text = no_link_text;
            }
            node.innerHTML = '<span data-title="'+ node_text +'">' + node.innerHTML + '</span>';
        }
        else { 
            node.className = node.className.replace("roll", "");
            node.className.trim();
        }
    }
    var sheet = document.createElement('style');
    if (supported) {
        sheet.innerHTML = ".uk-navbar-nav > li:hover > a, .uk-navbar-nav > li > a:focus, .uk-navbar-nav > li.uk-open > a { background-color: lightgray; color: #444444; outline: none; }";
    }
    else {
        sheet.innerHTML = ".uk-navbar-nav > li:hover > a, .uk-navbar-nav > li > a:focus, .uk-navbar-nav > li.uk-open > a { background-color: #f5f5f5; color: #444444; outline: none; }";
    }
    document.getElementsByTagName('body')[0].appendChild(sheet);
}

main([], "Not yet!");