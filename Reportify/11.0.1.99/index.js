$(document).ready(function(){
    var brykabry = {
        events:{
           init:function(){
                $(".title-wrapper").on("mouseenter",function(){
                    setTimeout(function(){$(".borderbottom").css({"width":"550px"})},200);
                    setTimeout(function(){$(".borderleft").css({"height":"100px"})},400);
                    setTimeout(function(){$(".bordertop").css({"width":"550px"})},600);
                    setTimeout(function(){$(".borderright").css({"height":"100px"})},800);
                    
                }).on("mouseleave",function(){
                    setTimeout(function(){$(".borderright").css({"height":"0"})},200);
                    setTimeout(function(){$(".bordertop").css({"width":"0"})},400);
                    setTimeout(function(){$(".borderleft").css({"height":"0"})},600);
                    setTimeout(function(){$(".borderbottom").css({"width":"0"})},800);
                })
           
           }
            
        }
    }
    brykabry.events.init();
})