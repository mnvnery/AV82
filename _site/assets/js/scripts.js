$('.hamburger').click(function() {
    $('.hamburger').toggleClass("is-active");
    $('.hamburger-inner').toggleClass("dark-mode");
    $('.navbar-container').toggleClass('navbar-open');
});

$('.prod-title').hover(function() {
    $('.left-img').toggleClass("opacity");
});

$('.rental-title').hover(function() {
    $('.right-img').toggleClass("opacity");
});