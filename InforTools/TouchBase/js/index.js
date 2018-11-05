$(document).ready(function(){

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
                .delay(400).qcss({"width":"100%"})
                .delay(400).qcss({"color":"black"});
                $(".title-wrapper.atstouchbase").delay(2000).qcss({"display":"none"})
                $(".content-wrapper").delay(2000).qcss({"display":"block"})
                
                tb.events.showDevQAOption();
                // setTimeout(function(){
                //     tb.events.showMenu();
                // },1250)
                
            },
            showMenu:function(){
                $(".hamburger").delay(200).qcss({"opacity":"1"})
                $(".hamburger.1").delay(400).qcss({"margin-top":"0"})
                $(".hamburger.2").delay(400).qcss({"margin-top":"20px"})
            },
            showDevQAOption:function(){
                $(".qa-background").delay(2050).qcss({"margin-top":"0"})
                $(".qa-background-overlay").delay(2050).qcss({"opacity":"0.8"})
                $(".dev-background").delay(2150).qcss({"margin-top":"0"})
                $(".dev-background-overlay").delay(2150).qcss({"opacity":"0.8"})
                $(".content-label").delay(2500).qcss({"opacity":"1"})
                
                setTimeout(function(){
                    var widthclick = {"width":"100%"}
                    var widthnotclick = {"width":"0"}
                    var widthopen = {"width":"70%"};
                    var widthclose = {"width":"30%"};
                    var widthreset =  {"width":"50%"};
                    var opacityzero = {"opacity": "0"};
                    var opacityone = {"opacity":".8"};
                    var transformhide = {"transform":"scale(0.5)","opacity":"0"};
                    var transformshow = {"transform":"scale(1)","opacity":"1"};
                    $(".qacontent").on("mouseover",function(){
                        $(this).qcss(widthopen).find(".content-label.qa").qcss(widthopen);
                        $(this).find(".qa-background-overlay").qcss(opacityzero);
                        $(".devcontent, .content-label.dev").qcss(widthclose);
                        $(".content-label.dev").qcss(transformhide);
                    }).on("mouseleave",function(){
                        $(this).qcss(widthreset).find(".content-label.qa").qcss(widthreset);
                        $(this).find(".qa-background-overlay").qcss(opacityone);
                        $(".devcontent, .content-label.dev").qcss(widthreset);
                        $(".content-label.dev").qcss(transformshow);
                    }).on("click",function(){
                        $(this).off()
                        $(this).qcss(widthclick).find(".content-label.qa").qcss(widthclick);
                        $(this).find(".qa-background-overlay").qcss(opacityzero);
                        $(".devcontent, .content-label.dev").qcss(widthnotclick)
                        $(".content-label.dev").qcss(transformhide)
                    });
                    $(".devcontent").on("mouseover",function(){
                        $(this).qcss(widthopen).find(".content-label.dev").qcss(widthopen);
                        $(this).find(".dev-background-overlay").qcss(opacityzero);
                        $(".qacontent, .content-label.qa").qcss(widthclose);
                        $(".content-label.qa").qcss(transformhide);
                    }).on("mouseleave",function(){
                        $(this).qcss(widthreset).find(".content-label.dev").qcss(widthreset);
                        $(this).find(".dev-background-overlay").qcss(opacityone);
                        $(".qacontent, .content-label.qa").qcss(widthreset);
                        $(".content-label.qa").qcss(transformshow);
                    }).on("click",function(){
                        $(this).off()
                        $(this).qcss(widthclick).find(".content-label.dev").qcss(widthclick);
                        $(this).find(".dev-background-overlay").qcss(opacityzero);
                        $(".qacontent, .content-label.qa").qcss(widthnotclick);
                        $(".content-label.qa").qcss(transformhide);
                    });
                },2500)
            }
                
        }
    }
})


