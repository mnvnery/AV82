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



$('.grid-item').hover(function (){
    $(this).children(".project-vid").toggle();
    $(this).children(".project-title").toggle();
});

$('.about-btn').click(function() {
    $('.about-btn').toggleClass("about-btn-open");
    $('.about-container').toggleClass("about-open");
    $('.arrow-down').toggle();
    $('.arrow-up').toggle();
});

$(window).click(function() {
    $('.about-btn').removeClass("about-btn-open");
    $('.about-container').removeClass("about-open");
    $('.arrow-down').hide();
    $('.arrow-up').show();
});

$('.about-btn').click(function(event){
    event.stopPropagation();
  });