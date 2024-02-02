$(document).ready(function(){
    setTimeout(()=> {
        const winW = $(window).width();
        if(winW<=991){
            $('.mega-menu_dropdown').on("click", function(e){
                e.stopPropagation();
                const divID = $(this).attr('id');
                if(!$('.mega-menu_dropdown#'+divID).hasClass("open-sub-nav")){
                    $(this).addClass("open-sub-nav");
                    $('.mega-menu_dropdown, .normal-nav-link, .button-wrapper.is--nav').addClass('hidden');
                } else {
                    $('.mega-menu_dropdown, .normal-nav-link, .button-wrapper.is--nav').removeClass('hidden');
                    $('.mega-menu_dropdown').removeClass("open-sub-nav");
                }
            });
            $('.menu_icon.w-nav-button').click(function(){
                $('.mega-menu_dropdown, .normal-nav-link, .button-wrapper.is--nav').removeClass('hidden');
                $('.mega-menu_dropdown').removeClass("open-sub-nav");
            });
            $('.nav-mobile-toggle').on("click", function(e){
                e.stopPropagation();
            });
        }// END Win width
    }, 1000)
});


setTimeout(()=> {
    var cookieName2 = 'modalClosed2';
    $('.w_switcher, .lazy-loading').show();
    if(typeof Cookies.get(cookieName2) == 'undefined') {
        $('#modal2').show();
    }
    if(typeof Cookies.get(cookieName2) !== 'undefined') {
        $('#modal2').remove();
    }
    $('#close-modal2, #close-modal-x2').on('click', function(){
        Cookies.set(cookieName2, 'ok', { expires: 7 });
    })

    var cookiePrivacyBanner = 'prvcy_ak';
    if(typeof Cookies.get(cookiePrivacyBanner) == 'undefined') {
        $('#modal3').show();
    }
    if(typeof Cookies.get(cookiePrivacyBanner) !== 'undefined') {
        $('#modal3').remove();
    }
    $('#close-modal-x3').on('click', function(){
        Cookies.set(cookiePrivacyBanner, 'ok', { expires: 7 });
    })
    $('.tab-layout').hover(
        function() {
            $( this ).click();
        }
    );
}, 5000)

// Megamenu Click negative Space
$(".b-nav__negative-space").on('click', function() {
    $("#megamenuTrigger").click();
});

// Active nav tab by default

$(".w-tab-link").removeClass("w--current");
$(".w-tab-link:nth-child(1)").addClass("w--current");

$(".b-nav-option.is--tab").removeClass("w--current");
$(".b-nav-option.is--tab:nth-child(1)").addClass("w--current");

$(".b-nav-option-child.is--tab").removeClass("w--current");
$(".b-nav-option-child.is--tab:nth-child(0)").addClass("w--current");

$(".b-nav-option-child.is--second.is--tab").removeClass("w--current");
$(".b-nav-option-child.is--second.is--tab:nth-child(0)").addClass("w--current");

//Products
//$("#w-tabs-3-data-w-pane-1 .b-nav-option-child.is--second.is--tab:nth-child(1)").addClass("w--current");
//$("#w-tabs-3-data-w-pane-1 .b-nav-option-child").addClass("w--current");


// Override href tab links with custom attribute

$.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};

$( document ).ready(function() {


    $(".b-nav-option-child.w-inline-block.w-tab-link").on('click', function (){

        if($(this).hasAttr('overridelink')) {
            window.location.href= $(this).attr('overridelink');
        }
    });

    $(".b-nav-option.w-inline-block.w-tab-link").on('click', function (){

        if($(this).hasAttr('overridelink')) {
            window.location.href= $(this).attr('overridelink');
        }
    });

    //$("#w-tabs-4-data-w-tab-0").addClass("w--current");

    $("#w-tabs-1-data-w-pane-0 .b-nav-option-child").addClass("w--current");
    $("#w-tabs-3-data-w-pane-1 .b-nav-option-child").addClass("w--current");

    $("#w-tabs-3-data-w-pane-1 .b-nav-option-child.target-tab-link, #w-tabs-1-data-w-pane-0 .b-nav-option-child.target-tab-link").on('mouseover', function (){
        $(this).click();
    });

    $('.b-nav-option.is--tab').click(function() {
        console.log('mouse click 15');
        // $(this).removeClass('w--open');
        //$('.nav-link.is--dropdown').attr('aria-expanded', 'false').removeClass('w--open');
        $(this).blur();
    });

});