/* script.js */
$(document).ready(function () {
    // Smooth scroll for navigation links
    $('a.nav-link').click(function () {
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
        return false;
    });

    // Shopping cart script
    $('.btn-success').click(function () {
        alert("Item added to cart successfully!");
    });

    // Form submission alert
    $('form').submit(function () {
        alert("Message sent successfully!");
        return false;
    });
});
