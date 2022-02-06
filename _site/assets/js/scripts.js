$('.hamburger').click(function() {
    $('.hamburger').toggleClass("is-active");
    $('.hamburger-inner').toggleClass("dark-mode");
    $('.navmenu-container').toggleClass('navmenu-open');
});

$('.prod-title').hover(function() {
    $('.right-img').toggleClass("opacity");
});

$('.rental-title').hover(function() {
    $('.left-img').toggleClass("opacity");
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


$(document).on('click',function(e){
    if(!(($(e.target).closest(".about-container").length > 0 ) || ($(e.target).closest(".about-btn").length > 0))){
        $('.about-btn').removeClass("about-btn-open");
        $('.about-container').removeClass("about-open");
        $('.arrow-down').hide();
        $('.arrow-up').show();
}
});
