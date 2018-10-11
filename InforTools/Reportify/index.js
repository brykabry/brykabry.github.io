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
                $(".download.eleven-o-one").on("click",function(){
                    brykabry.events.download("eleven-o-one");
                })
            },
            download:function(){
                console.log("checkpoint! research about cors!");
                var url = "http://usspw565.lawson.com/lars/BuildRepositoryForWeb/list/Build(HCM,34,_niu_).ActiveListForPanel?csk.3x=true&dependentList=true&pageSize=20&pageop=load&relation=BuildStream(HCM%2C34).Build_ByBuildStream_UsingSymbolicKey_SetRel&_=";
                $.ajax({
                    crossDomain: true,
                    url: url,
                    dataType: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    success: function(data) {
                      console.log(data);
                    },
                    error:function(e){
                        console.log(e)
                    }
                  });
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