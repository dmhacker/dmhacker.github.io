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

});

var options = [
    {
        selector: '#timeline',
        offset: 100,
        callback: 'Materialize.showStaggeredList("#timeline-list")'
            }
        ];
Materialize.scrollFire(options);