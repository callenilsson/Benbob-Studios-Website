function showStuff(id) {
    x = document.getElementById(id);
    if (!x.style.display || x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

function scrollToDiv(el) {
    var top = $("#" + el).offset().top - 100;
    $("html, body").animate({ scrollTop: top }, 1000);
}

function scrollToTop() {
    var top = 0;
    $("html, body").animate({ scrollTop: top }, 1000);
}

shots = $(".part").fadeTo(0, 0.05);

$('.part').scroll(function(d,h) {
    shots.each(function(i) {
        a = $(this).offset().top + $(this).height();
        b = $('#portfolio').scrollTop() + $('.container').height();
        if (a < b) $(this).fadeTo(500,1);
    });
});

$(window).on("load",function() {
  function fade(pageLoad) {
    var windowTop=$(window).scrollTop(), windowBottom=windowTop+$(window).innerHeight();
    var min=0, max=1, threshold=0.01;

    $(".part, .part_first").each(function() {
      /* Check the location of each desired element */
      var objectHeight=$(this).outerHeight(), objectTop=$(this).offset().top, objectBottom=$(this).offset().top+objectHeight;

      /* Fade element in/out based on its visible percentage */
      if (objectTop < windowTop) {
        if (objectBottom > windowTop) {$(this).fadeTo(0,min+((max-min)*((objectBottom-windowTop)/objectHeight)));}
        else if ($(this).css("opacity")>=min+threshold || pageLoad) {$(this).fadeTo(0,min);}
      } else if (objectBottom > windowBottom) {
        if (objectTop < windowBottom) {$(this).fadeTo(0,min+((max-min)*((windowBottom-objectTop)/objectHeight)));}
        else if ($(this).css("opacity")>=min+threshold || pageLoad) {$(this).fadeTo(0,min);}
      } else if ($(this).css("opacity")<=max-threshold || pageLoad) {$(this).fadeTo(0,max);}
    });
  } fade(true); //fade elements on page-load
  $(window).scroll(function(){fade(false);}); //fade elements on scroll
});
