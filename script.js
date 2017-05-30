function clickService(service, subject_id){
    document.getElementById(subject_id).value = "SUBJECT: JOB - " + service;
}

function messageSent(name_id, email_id, subject_id, message_id, submit_id){
    var name = document.getElementById(name_id), email = document.getElementById(email_id), subject = document.getElementById(subject_id), message = document.getElementById(message_id), submit = document.getElementById(submit_id);
    if (document.getElementById(submit_id).value === "MESSAGE SENT!") {
        document.getElementById(submit_id).value = "SEND";
    } else if (name.value === ""){
        name.placeholder = "Please provide your name";
    } else if (email.value === ""){
        email.placeholder = "Please provide your e-mail address";
    } else if (subject.value === ""){
        subject.placeholder = "Please provide a subject";
    } else if (message.value === ""){
        message.placeholder = "Please provide a message";
    } else {
        name.value = "";
        email.value = "";
        subject.value = "";
        message.value = "";
        name.placeholder = "NAME";
        email.placeholder = "E-MAIL";
        subject.placeholder = "SUBJECT";
        message.placeholder = "MESSAGE";
        submit.value = "MESSAGE SENT!";
    }
}

function showStuff(id) {
    x = document.getElementById(id);
    if (!x.style.display || x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

function scrollToDiv(el) {
    var offset = $('.menu').height();
    var top = $("#" + el).offset().top - offset + 0.5;
    $("html, body").animate({ scrollTop: top }, 1000);
}

function scrollToTop() {
    var top = 0;
    $("html, body").animate({ scrollTop: top }, 1000);
}

$(document).ready(function() {
    $(".card").flip({
        axis: 'y',
        trigger: 'hover',
        reverse: true,
    });
})

$(window).on("load",function() {


  function fade(pageLoad) {
    var windowTop=$(window).scrollTop(), windowBottom=windowTop+$(window).innerHeight();
    var min=0, max=1.8, threshold=0.01;

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
