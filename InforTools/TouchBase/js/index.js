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
            $(".touchbaselabel .label.ats div.letters").qcss({"opacity":"1"})
            tb.events.showTitle();
        },0) 
    }
    img.src = url;
    if (img.complete) img.onload();


    var tb = {
        events:{
            showTitle:function(){
                //opening animation
                var timeout = 375;
                var blinker = $(".label.blinker");
                blinker
                .delay(1250).qcss({"opacity":"1"})
                .delay(timeout).qcss({"opacity":"0"})
                .delay(timeout).qcss({"opacity":"1"})
                .delay(timeout).qcss({"opacity":"0","height":"0"})
                .delay(timeout).qcss({"opacity":"1","height":"60px"})
                .delay(timeout).qcss({"border-left":"3px solid white"})
                var touchbase = $(".label.touchbase .wrapper");
                touchbase.delay((timeout*7)+timeout).qcss({"margin-left":"0"})

                $(".touchbaselabel .label").on("click",function(){
                    tb.events.hideTitle();
                })
            },
            hideTitle:function(){
                $(".touchbaselabel .label.touchbase").qcss({"margin":"0"});
                $(".touchbaselabel .label.ats .wrapper").css({"margin-right":"-153px"});
                $(".touchbaselabel .label.touchbase .wrapper").css({"margin-left":"-375px"});
                // $(".label.blinker").delay(1000).qcss({"height":"0"});
                // $(".touchbaselabel").delay(1250).qcss({"display":"none"})
                $(".label.blinker").delay(1000).qcss({"height":"100%"})
                .delay(400).qcss({"width":"100%"});
                $(".title-wrapper.atstouchbase").delay(2000).qcss({"display":"none"})
                $(".content-wrapper").delay(2000).qcss({"display":"block"})
                
                $(".qa-background").delay(2050).qcss({"margin-top":"0"})
                $(".dev-background").delay(2150).qcss({"margin-top":"0"})
                
                setTimeout(function(){
                    $(".qacontent").on("mouseover",function(){
                        $(this).qcss({"width":"80%"}).find(".content-label.qa").qcss({"width":"80%"});
                        $(this).find(".qa-background-overlay").qcss({"opacity":"0"});
                        $(".devcontent, .content-label.dev").qcss({"width":"20%"})
                        $(".content-label.dev").qcss({"font-size":"1vw","opacity":"0"})
                    }).on("mouseleave",function(){
                        $(this).qcss({"width":"50%"}).find(".content-label.qa").qcss({"width":"50%"});
                        $(this).find(".qa-background-overlay").qcss({"opacity":".8"});
                        $(".devcontent, .content-label.dev").qcss({"width":"50%"})
                        $(".content-label.dev").qcss({"font-size":"4vw","opacity":"1"})
                    });
                    $(".devcontent").on("mouseover",function(){
                        $(this).qcss({"width":"80%"}).find(".content-label.dev").qcss({"width":"80%"});
                        $(this).find(".dev-background-overlay").qcss({"opacity":"0"});
                        $(".qacontent, .content-label.qa").qcss({"width":"20%",})
                        $(".content-label.qa").qcss({"font-size":"1vw","opacity":"0"})
                    }).on("mouseleave",function(){
                        $(this).qcss({"width":"50%"}).find(".content-label.dev").qcss({"width":"50%"});;
                        $(this).find(".dev-background-overlay").qcss({"opacity":".8"});
                        $(".qacontent, .content-label.qa").qcss({"width":"50%"})
                        $(".content-label.qa").qcss({"font-size":"4vw","opacity":"1"})
                    });;
                },2200)
  
                // setTimeout(function(){
                //     tb.events.showMenu();
                // },1250)
                
            },
            showMenu:function(){
                $(".hamburger").delay(200).qcss({"opacity":"1"})
                $(".hamburger.1").delay(400).qcss({"margin-top":"0"})
                $(".hamburger.2").delay(400).qcss({"margin-top":"20px"})
            }
                
        }
    }
})


