$(document).ready(function(){
    var brykabry = {
        events:{
           init:function(){
                $(".title-wrapper").on("mouseenter",function(){
                    $(".borderbottom, .bordertop").css({"margin-left":"0"});
                    $(".borderright, .borderleft").css({"margin-top":"0"});
                }).on("mouseleave",function(){
                    $(".borderbottom").css({"margin-left":"-550px"});
                    $(".borderright").css({"margin-top":"105px"});
                    $(".borderleft").css({"margin-top":"-105px"});
                    $(".bordertop").css({"margin-left":"550px"});    
                }).on("click",function(){
                    $(".title-wrapper").css({"transform":"scale(2)"}).on("mouseleave",function(){$(".borderbottom, .bordertop").css({"margin-left":"0"});$(".borderright, .borderleft").css({"margin-top":"0"});});
                    setTimeout(function(){$(".title-wrapper").css({"transform":"scale(0)"})},400);
                })
              
           }
            
        }
    }
    brykabry.events.init();
})