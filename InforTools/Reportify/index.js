$(document).ready(function(){
    var brykabry = {
        events:{
            init:function(){
                brykabry.events.animateBorder();
                $(".title-wrapper").on("click",function(){
                    $(".title-wrapper.reportify").css({"transform":"scale(1.5)"}).on("mouseleave",function(){$(".borderbottom, .bordertop").css({"margin-left":"0"});$(".borderright, .borderleft").css({"margin-top":"0"});});
                    setTimeout(function(){$(".title-wrapper.reportify").css({"transform":"scale(0)"})},200);
                    brykabry.events.showDownload();
                })
            },
            animateBorder:function(){
                $(".title-wrapper").css({"transform":"scale(1.5)"})
                setTimeout(function(){$(".title-wrapper").css({"transform":"scale(1)"})},200);
                $(".title-wrapper").on("mouseenter",function(){
                    $(".borderbottom, .bordertop").css({"margin-left":"0"});
                    $(".borderright, .borderleft").css({"margin-top":"0"});
                }).on("mouseleave",function(){
                    $(".borderbottom").css({"margin-left":"-550px"});
                    $(".borderright").css({"margin-top":"105px"});
                    $(".borderleft").css({"margin-top":"-105px"});
                    $(".bordertop").css({"margin-left":"550px"});    
                })
            },
            showDownload:function(){
                $(".title-wrapper.download").css({"transform":"scale(1.5)"})
                setTimeout(function(){$(".title-wrapper.download").css({"transform":"scale(1)"})},200);
            }
        }
    }
    var src = $('.bg').css('background-image');
    var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');

    var img = new Image();
    img.onload = function() {
        setTimeout(function(){brykabry.events.init()},500);
    }
    img.src = url;
    if (img.complete) img.onload();
    
})