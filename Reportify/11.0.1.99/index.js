$(document).ready(function(){
    var brykabry = {
        events:{
           init:function(){
                $(".title-wrapper").on("mouseenter",function(){
                    setTimeout(function(){$(".borderbottom").css({"width":"550px"})},100);
                    setTimeout(function(){$(".borderleft").css({"height":"100px"})},200);
                    setTimeout(function(){$(".bordertop").css({"width":"550px"})},300);
                    setTimeout(function(){$(".borderright").css({"height":"100px"})},400);
                    
                }).on("mouseleave",function(){
                    setTimeout(function(){$(".borderright").css({"height":"0"})},100);
                    setTimeout(function(){$(".bordertop").css({"width":"0"})},200);
                    setTimeout(function(){$(".borderleft").css({"height":"0"})},300);
                    setTimeout(function(){$(".borderbottom").css({"width":"0"})},400);
                })
           
           }
            
        }
    }
    brykabry.events.init();
})