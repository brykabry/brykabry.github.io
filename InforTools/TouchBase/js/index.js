$(document).ready(function(){
    $.fn.extend({
        qcss: function(css) {
           return $(this).queue(function(next) {
              $(this).css(css);
              next();
           });
        }
     });
    var src = $('.bg').css('background-image');
    var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
    
    var img = new Image();
    img.onload = function() {
        setTimeout(function(){
            tb.events.showTitle();
        },1250)
        
    }
    img.src = url;
    if (img.complete) img.onload();


    var tb = {
        events:{
            showTitle:function(){
                var timeout = 375;
                var blinker = $(".label.blinker");
                blinker
                .delay(timeout).qcss({"opacity":"1"})
                .delay(timeout).qcss({"opacity":"0"})
                .delay(timeout).qcss({"opacity":"1"})
                .delay(timeout).qcss({"opacity":"0","height":"0"})
                // .delay(timeout).qcss({"visibility":"visible"})
                .delay(timeout).qcss({"opacity":"1","height":"60px"})
                .delay(timeout).qcss({"border-left":"3px solid white"})
                var touchbase = $(".label.touchbase .wrapper");
                touchbase.delay((timeout*5)+timeout).qcss({"margin-left":"0"})

                
            }
        }
    }
})


