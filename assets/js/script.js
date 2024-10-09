/* script.js */
$(document).ready(function () {
    // Smooth scrolling for links
    $('a[href^="#"]').on('click', function (event) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // Shopping cart script
    $('.btn-success').click(function () {
        alert("Item added to cart successfully!");
    });

    // Form submission alert
    $('form').submit(function (event) {
        event.preventDefault();
        alert("Message sent successfully!");
        // Add your form submission logic here
    });
});
