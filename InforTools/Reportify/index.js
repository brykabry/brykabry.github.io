$(document).ready(function(){
    var brykabry = {
        events:{
            init:function(){
                brykabry.events.animateBorder(".reportify");
                $(".title-wrapper.reportify").on("click",function(){
                    $(".title-wrapper.reportify").css({"transform":"scale(1.5)"}).on("mouseleave",function(){$(".borderbottom, .bordertop").css({"margin-left":"0"});$(".borderright, .borderleft").css({"margin-top":"0"});});
                    setTimeout(function(){$(".title-wrapper.reportify").css({"transform":"scale(0)"})},200);
                    setTimeout(function(){brykabry.events.showDownload();},400);
                })
            },
            animateBorder:function(labelclass){
                var className = ".title-wrapper" + labelclass;
                $(className).css({"transform":"scale(1.5)"})
                
                $(className).find(".borderbottom").css({"margin-left":"-550px"});
                $(className).find(".borderright").css({"margin-top":"105px"});
                $(className).find(".borderleft").css({"margin-top":"-105px"});
                $(className).find(".bordertop").css({"margin-left":"550px"});  
                setTimeout(function(){$(className).css({"transform":"scale(1)"})},200);
                $(className).on("mouseenter",function(){
                    $(this).find(".borderbottom, .bordertop").css({"margin-left":"0"});
                    $(this).find(".borderright, .borderleft").css({"margin-top":"0"});
                }).on("mouseleave",function(){
                    $(this).find(".borderbottom").css({"margin-left":"-550px"});
                    $(this).find(".borderright").css({"margin-top":"105px"});
                    $(this).find(".borderleft").css({"margin-top":"-105px"});
                    $(this).find(".bordertop").css({"margin-left":"550px"});    
                })
            },
            showDownload:function(){
                brykabry.events.animateBorder(".download");
                setTimeout(function(){$(".title-wrapper.download").css({"transform":"scale(1)"})},200);
            },
            download:function(){

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