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

function startTimeline(audio, circle, timeline_highlight) {
    $(circle).stop();
    if (audio.currentTime == 0) {
        $(circle).css({'margin-left': 0});
    }
    $(circle).animate({'margin-left': '100%'}, {
        duration: ((audio.duration - audio.currentTime)*1000), // how fast we are animating
        easing: 'linear', // the type of easing
    });

    $(timeline_highlight).stop();
    if (audio.currentTime == 0) {
        $(timeline_highlight).css({'width': 0});
    }
    $(timeline_highlight).animate({'width': '100%'}, {
        duration: ((audio.duration - audio.currentTime)*1000), // how fast we are animating
        easing: 'linear', // the type of easing
    });
}

function playMusic(audio, volume) {
    $(audio).stop();
    $(audio).animate({volume: volume}, {
        easing:'linear',
        duration: 500,
    });
    audio.play();
}

function pauseMusic(audio, circle, timeline_highlight, timeCounter) {
    $(audio).stop();
    $(audio).animate({volume: 0}, {
        easing:'linear',
        duration: 500,
        complete: function() {
            audio.pause();
            $(circle).stop();
            $(timeline_highlight).stop();
            $(timeCounter).stop();
        }
    });
}

function playTime(audio, timeLeft, timeCounter) {
    $(timeCounter).stop();
    $(timeCounter).animate({'margin-left': audio.duration + 'px'}, {
        easing:'linear',
        duration: ((audio.duration - audio.currentTime)*1000),
        step: function() {
            var currentPos = parseInt($(timeCounter).css('margin-left'));
            var minutes = Math.floor(currentPos/60 % 60);
            var seconds = Math.floor(currentPos % 60);
            if (seconds < 10) {
                $(timeLeft).text(minutes + ":0" + seconds);
            } else {
                $(timeLeft).text(minutes + ":" + seconds);
            }

        },
    });
}

$(document).ready(function() {

    $('img').on('dragstart', function(event) { event.preventDefault(); });

    $(".card").flip({
        axis: 'y',
        trigger: 'hover',
        reverse: true,
    });

    $('.timeline').mousedown(function () {
        var timeline = $(this);
        $('.timeline').off("mouseleave");
        var audio = $(this).siblings('.audio')[0];
        var circle = $(this).find('.circle')[0];
        var timeline_highlight = $(this).find('.timeline_highlight')[0];
        var width = $(this).width();
        var start = $(this).offset().left;
        var end = start + width;
        var clickPercentage = (event.pageX - start)/width;
        clickPercentage = Math.min(Math.max(parseInt(clickPercentage*100), 0), 100)/100;
        var timeLeft = $(this).siblings('.timeLeft')[0];
        var timeRight = $(this).siblings('.timeRight')[0];
        var timeCounter = $(this).siblings('.timeCounter')[0];

        $(circle).stop();
        $(timeline_highlight).stop();
        $(circle).css({marginLeft: (100*clickPercentage).toString() + "%"});
        $(timeline_highlight).css({width: (100*clickPercentage).toString() + "%"});

        $(document).mousemove(function(e){
            e.preventDefault();
            width = $(timeline).width();
            start = $(timeline).offset().left;
            end = start + width;
            clickPercentage = (event.pageX - start)/width;
            clickPercentage = Math.min(Math.max(parseInt(clickPercentage*100), 0), 100)/100;

            $(circle).stop();
            $(timeline_highlight).stop();
            $(circle).css({marginLeft: (100*clickPercentage).toString() + "%"});
            $(timeline_highlight).css({width: (100*clickPercentage).toString() + "%"});
            $(timeCounter).stop();
            $(timeCounter).css('margin-left', audio.duration*clickPercentage + 'px');
            var currentPos = parseInt($(timeCounter).css('margin-left'));
            var minutes = Math.floor(currentPos/60 % 60);
            var seconds = Math.floor(currentPos % 60);
            if (seconds < 10) {
                $(timeLeft).text(minutes + ":0" + seconds);
            } else {
                $(timeLeft).text(minutes + ":" + seconds);
            }
        });

        $(document).mouseup(function(){
            $(this).unbind('mousemove');
            audio.currentTime = audio.duration*clickPercentage;
            $(timeCounter).css('margin-left', audio.currentTime + 'px');
            if (!audio.paused) {
                playTime(audio, timeLeft, timeCounter);
                startTimeline(audio, circle, timeline_highlight);
            }
            $('.timeline').on("mouseleave", function () {
                var circle = $(this).find('.circle')[0];
                var timeline_highlight = $(this).find('.timeline_highlight')[0];
                $(circle).css('display', 'none');
                $(timeline_highlight).css('background-color', '#999');
            });
            $(document).unbind('mouseup');
        });
    });

    $(".timeline").mouseenter(function () {
        var circle = $(this).find('.circle')[0];
        var timeline_highlight = $(this).find('.timeline_highlight')[0];
        $(circle).css('display', 'block');
        $(timeline_highlight).css('background-color', '#49dd49');
    });

    $(".timeline").mouseleave(function () {
        var circle = $(this).find('.circle')[0];
        var timeline_highlight = $(this).find('.timeline_highlight')[0];
        $(circle).css('display', 'none');
        $(timeline_highlight).css('background-color', '#999');
    });

    $(".volume").mouseenter(function () {
        var circle = $(this).find('.volume_circle')[0];
        var timeline_highlight = $(this).find('.volume_timeline_highlight')[0];
        $(circle).css('display', 'block');
        $(timeline_highlight).css('background-color', '#49dd49');
    });

    $(".volume").mouseleave(function () {
        var circle = $(this).find('.volume_circle')[0];
        var timeline_highlight = $(this).find('.volume_timeline_highlight')[0];
        $(circle).css('display', 'none');
        $(timeline_highlight).css('background-color', '#999');
    });

    $('.volume').mousedown(function () {
        $('.volume').off("mouseleave");
        var timeline = $(this);
        var timeline_highlight = $(this).find('.volume_timeline_highlight')[0];
        var audio = $(this).siblings('.audio')[0];
        var circle = $(this).find('.volume_circle')[0];
        var volume_icon = $(this).find('.volume_icon');
        var width = $(this).width();
        var start = $(this).offset().left;
        var end = start + width;
        var clickPercentage = (event.pageX - start)/width;
        clickPercentage = Math.min(Math.max(parseInt(clickPercentage*100), 0), 100)/100;
        audio.volume = clickPercentage;
        $(circle).css({marginLeft: (100*clickPercentage).toString() + "%"});
        $(timeline_highlight).css({width: (100*clickPercentage).toString() + "%"});
        if (clickPercentage > 0.66) {
            $(volume_icon).attr('src', "images/volume_max.png");
        } else if (clickPercentage > 0.33 && clickPercentage <= 0.66) {
            $(volume_icon).attr('src', "images/volume_mid.png");
        } else if (clickPercentage > 0 && clickPercentage <= 0.33) {
            $(volume_icon).attr('src', "images/volume_low.png");
        } else {
            $(volume_icon).attr('src', "images/volume_x.png");
        }

        $(document).mousemove(function(e){
            e.preventDefault();
            width = $(timeline).width();
            start = $(timeline).offset().left;
            end = start + width;
            clickPercentage = (event.pageX - start)/width;
            clickPercentage = Math.min(Math.max(parseInt(clickPercentage*100), 0), 100)/100;
            audio.volume = clickPercentage;
            $(circle).css({marginLeft: (100*clickPercentage).toString() + "%"});
            $(timeline_highlight).css({width: (100*clickPercentage).toString() + "%"});
            if (clickPercentage > 0.66) {
                $(volume_icon).attr('src', "images/volume_max.png");
            } else if (clickPercentage > 0.33 && clickPercentage <= 0.66) {
                $(volume_icon).attr('src', "images/volume_mid.png");
            } else if (clickPercentage > 0 && clickPercentage <= 0.33) {
                $(volume_icon).attr('src', "images/volume_low.png");
            } else {
                $(volume_icon).attr('src', "images/volume_x.png");
            }
        });

        $(document).mouseup(function(){
            $(this).unbind('mousemove');
            $('.volume').on("mouseleave", function () {
                var circle = $(this).find('.volume_circle')[0];
                var timeline_highlight = $(this).find('.volume_timeline_highlight')[0];
                $(circle).css('display', 'none');
                $(timeline_highlight).css('background-color', '#999');
            });
            $(document).unbind('mouseup');
        });
    });

    $('.play').mouseup(function() {
        $(this).css({"height": "50%", "width": "50%", "filter": "brightness(2)"});
        var playButton = "https://images.vexels.com/media/users/3/131784/isolated/preview/a9ff82db0cf438516e13b8c3bf918a00-play-flat-icon-by-vexels.png";
        var pauseButton = "https://images.vexels.com/media/users/3/131706/isolated/preview/80c52538116b504f0d45858a707d0c4f-pause-flat-button-by-vexels.png";
        var play = this;
        var audio = $(this).siblings('.audio')[0];
        var circle = $($(this).siblings('.timeline')[0]).find('.circle')[0];
        var timeline_highlight = $($(this).siblings('.timeline')[0]).find('.timeline_highlight')[0];
        var timeLeft = $(this).siblings('.timeLeft')[0];
        var timeRight = $(this).siblings('.timeRight')[0];
        var timeCounter = $(this).siblings('.timeCounter')[0];
        var volume = parseInt($($(this).siblings('.volume')).find('.volume_timeline_highlight').css('width'))/100;

        if (audio.readyState >= 2) {
            var minutes = Math.floor(audio.duration/60 % 60);
            var seconds = Math.floor(audio.duration % 60);
            if (seconds < 10) {
                $(timeRight).text(minutes + ":0" + seconds);
            } else {
                $(timeRight).text(minutes + ":" + seconds);
            }

            if (this.src === playButton) {
                this.src = pauseButton;
                playMusic(audio, volume);
                startTimeline(audio, circle, timeline_highlight);
                playTime(audio, timeLeft, timeCounter);
            } else {
                this.src = playButton;
                pauseMusic(audio, circle, timeline_highlight, timeCounter);
            }
            audio.onended = function() {
                play.src = playButton;
                $(timeCounter).css('margin-left', 0 + 'px');
            };
            $(this).css({"filter": "brightness(2.5)"});
        }
    });

    $(".play").mouseleave(function () {
            $(this).css({"filter": "brightness(2)"});
    });

    $(".play").mouseenter(function () {
            $(this).css({"filter": "brightness(2.5)"});
    });

    $('.play').mousedown(function() {
        $(this).css({  "height": "48%", "width": "48%", "filter": "brightness(1.5)"});
    });

    $('.card').mouseleave(function() {
        var play = $(this).find('.play')[0];
        var audio = $(play).siblings('.audio')[0];
        var circle = $($(play).siblings('.timeline')[0]).find('.circle')[0];
        var timeCounter = $(play).siblings('.timeCounter')[0];
        var timeline_highlight = $($(play).siblings('.timeline')[0]).find('.timeline_highlight')[0];
        var playButton = "https://images.vexels.com/media/users/3/131784/isolated/preview/a9ff82db0cf438516e13b8c3bf918a00-play-flat-icon-by-vexels.png";
        play.src = playButton;
        pauseMusic(audio, circle, timeline_highlight, timeCounter);
    });

    $('.card').mouseenter(function() {
        if (this.id === '0') {
            this.id = '1';
            var timeline_highlight = $(this).find('.timeline_highlight')[0];
            var timeline_feature = $(this).find('.timeline_feature')[0];
            var circle = $(this).find('.circle')[0];
            var timeLeft = $(this).find('.timeLeft')[0];
            var timeRight = $(this).find('.timeRight')[0];
            var audio = $(this).find('.audio')[0];
            var timeCounter = $(this).find('.timeCounter')[0];
            var startTime = circle.id.split(":");
            var startMinute = parseInt(startTime[0]);
            var finishSecond = parseInt(startTime[2]);
            startTime = startTime[1].split("-");
            var startSecond = parseInt(startTime[0]);
            var finishMinute = parseInt(startTime[1]);
            var totStartTime = startMinute*60 + startSecond;
            var totFinishTime = finishMinute*60 + finishSecond;

            if (audio.readyState >= 2) {
                audio.volume = 0;
                $(timeline_highlight).css('width', (totStartTime / audio.duration)*100 + "%");
                $(timeline_feature).css({'margin-left': (totStartTime / audio.duration)*100 + "%", 'width': ((totFinishTime-totStartTime) / audio.duration)*100 + '%'});
                $(circle).css('margin-left', (totStartTime / audio.duration)*100 + "%");
                $(timeCounter).css('margin-left', totStartTime);
                audio.currentTime = totStartTime;
                var minutes = Math.floor(audio.duration/60 % 60);
                var seconds = Math.floor(audio.duration % 60);
                if (seconds < 10) {
                    $(timeRight).text(minutes + ":0" + seconds);
                } else {
                    $(timeRight).text(minutes + ":" + seconds);
                }
                minutes = Math.floor(audio.currentTime/60 % 60);
                seconds = Math.floor(audio.currentTime % 60);
                if (seconds < 10) {
                    $(timeLeft).text(minutes + ":0" + seconds);
                } else {
                    $(timeLeft).text(minutes + ":" + seconds);
                }
            }
        }
    });
})

$(window).on("load",function() {
    $('#Contact').css('height', (parseInt($('#Contact').css('height')) - parseInt($('.menu_3').css('height'))) + 'px');

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
