(function ($) {
    $(".navbar a[target!='_blank']").on('click', function (event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function () {
            window.location.hash = hash;
        });
    });
    $(window).scroll(function () {
        if ($(".navbar-default").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
            $('#back-to-top').fadeIn();
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
            $('#back-to-top').fadeOut();
        }
    });
    $('#back-to-top').click(function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $('#back-to-top').tooltip('show');
    $('a#social-link').on('click', function (event) {
        var win = window.open(this.attr('href'), '_blank');
        win.focus();
    });
})(jQuery);
