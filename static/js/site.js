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

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var options = [{
        selector: '#timeline',
        offset: 100,
        callback: 'Materialize.showStaggeredList("#timeline-list")'
    }];
Materialize.scrollFire(options);