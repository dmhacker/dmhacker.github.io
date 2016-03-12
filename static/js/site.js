var firebaseRef = new Firebase('https://dmh.firebaseio.com');
var commentsRef = firebaseRef.child('comments');
var commentProcessing = false;

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('#top').scrollfire({
        bottomOffset: 50,
        onTopHidden: function (elm) {
            $('#navbar-main').addClass('hide');
            $('#navbar-main-fixed').removeClass('hide');
        },

        onBottomHidden: function (elm) {
            $('#navbar-main').addClass('hide');
            $('#navbar-main-fixed').removeClass('hide');
        },

        onTopIn: function (elm) {
            $('#navbar-main-fixed').addClass('hide');
            $('#navbar-main').removeClass('hide');
        },

        onBottomIn: function (elm) {
            $('#navbar-main-fixed').addClass('hide');
            $('#navbar-main').removeClass('hide');
        },
    });
    /*
    $('#profile').scrollfire({
        bottomOffset: 50,
        onTopIn: function (elm) {
            $('#profile-item').addClass('active');
        },

        onBottomIn: function (elm) {
            $('#profile-item').addClass('active');
        },

        onTopHidden: function (elm) {
            $('#profile-item').removeClass('active');
        },

        onBottomHidden: function (elm) {
            $('#profile-item').removeClass('active');
        }
    });
    $('#timeline').scrollfire({
        onTopIn: function (elm) {
            $('#timeline-item').addClass('active');
        },

        onBottomIn: function (elm) {
            $('#timeline-item').addClass('active');
        },

        onTopHidden: function (elm) {
            $('#timeline-item').removeClass('active');
        },

        onBottomHidden: function (elm) {
            $('#timeline-item').removeClass('active');
        }
    });
    $('#contact').scrollfire({
        onTopIn: function (elm) {
            $('#contact-item').addClass('active');
        },

        onBottomIn: function (elm) {
            $('#contact-item').addClass('active');
        },

        onTopHidden: function (elm) {
            $('#contact-item').removeClass('active');
        },

        onBottomHidden: function (elm) {
            $('#contact-item').removeClass('active');
        }
    });
    */
    $("#commentForm").submit(function (event) {
        event.preventDefault();
        
        if (commentProcessing) {
            return;
        }
        
        commentProcessing = true;
        $("#commentSubmit").addClass("disabled");

        var $inputs = $('#commentForm :input');
        var values = {};
        $inputs.each(function () {
            if (this.id.length && this.id !== 'commentSubmit') {
                values[this.id] = $(this).val();
            }
        });
        values['date'] = new Date().toUTCString();

        commentsRef.child(guid()).set(values, function (error) {
            if (error) {
                Materialize.toast(err.message, 4000);
            }
            else {
                Materialize.toast("Thank you for the feedback!", 4000);
                $('#commentForm').trigger('reset');
            }
            $("#commentSubmit").removeClass("disabled");
            commentProcessing = false;
        })
    });

});

var options = [{
        selector: '#timeline',
        offset: 100,
        callback: 'Materialize.showStaggeredList("#timeline-list")'
    }];
Materialize.scrollFire(options);

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

// Credits to http://stackoverflow.com/questions/10063380/javascript-smooth-scroll-without-the-use-of-jquery
function smoothScroll() {
    var speed = 300; // In milliseconds
    var moving_frequency = 1; // Affects performance !
    var links = document.getElementsByTagName('a');
    var href;
    for(var i=0; i<links.length; i++)
    {   
        href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
        if(href !== null && href.length > 1 && href.substr(0, 1) == '#')
        {
            links[i].onclick = function()
            {
                var element;
                var href = this.attributes.href.nodeValue.toString();
                if(element = document.getElementById(href.substr(1)))
                {
                    var hop_count = speed/moving_frequency
                    var getScrollTopDocumentAtBegin = getScrollTopDocument();
                    var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

                    for(var i = 1; i <= hop_count; i++)
                    {
                        (function()
                        {
                            var hop_top_position = gap*i;
                            setTimeout(function(){  window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency*i);
                        })();
                    }
                }

                return false;
            };
        }
    }

    var getScrollTopElement =  function (e)
    {
        var top = 0;

        while (e.offsetParent != undefined && e.offsetParent != null)
        {
            top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
            e = e.offsetParent;
        }

        return top;
    };

    var getScrollTopDocument = function()
    {
        return document.documentElement.scrollTop + document.body.scrollTop;
    };
}

smoothScroll();