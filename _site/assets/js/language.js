
$('.lang-selector').on( "click", function() {
    let language = $(this).text();
    localStorage.setItem('selectedLanguage', language);
    var x = localStorage.getItem("selectedLanguage");
    $(this).addClass('active').siblings().removeClass('active');
    if (x == 'PT') {
        $('.pt').show();
        $('.eng').hide();
    } 
    else {
        $('.eng').show();
        $('.pt').hide();
    }
});

$(function() {
    var x = localStorage.getItem("selectedLanguage");
    if (x == 'PT') {
        $('.pt').show();
        $('.eng').hide();
        $('.pt-selector').addClass('active');
        $('.eng-selector').removeClass('active');
    } 
    else {
        $('.eng').show();
        $('.pt').hide();
        $('.eng-selector').addClass('active');
        $('.pt-selector').removeClass('active');
    }
});