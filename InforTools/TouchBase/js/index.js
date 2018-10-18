$(document).ready(function(){
    var src = $('.bg').css('background-image');
    var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
    
    var img = new Image();
    img.onload = function() {
        tb.events.showTitle();
    }
    img.src = url;
    if (img.complete) img.onload();










    var tb = {
        events:{
            showTitle:function(){
                
            }
        }
    }
})


