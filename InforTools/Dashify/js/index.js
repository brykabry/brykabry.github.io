$(document).ready(function(){
    var brykabry = {
        events:{
           init:function(){
                console.log("test")
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