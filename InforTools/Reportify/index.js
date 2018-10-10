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
                var global = {
                    branch:"",
                    xhr : "",
                    latestBuild: "",
                    issueList: "",
                    issueCounter: 0,
                    normalize: [],
                    currentServerBuild: ""
                }
                alert("Generating a report might take a while. Press OK to continue.");
                var url = "http://usspw565.lawson.com/lars/BuildRepositoryForWeb/list/Build(HCM,34,_niu_).ActiveListForPanel?csk.3x=true&dependentList=true&pageSize=20&pageop=load&relation=BuildStream(HCM%2C34).Build_ByBuildStream_UsingSymbolicKey_SetRel&_=" + Date.now();
                var server= "http://wiki.lawson.com/display/HCM/Human+Capital+Management+Servers"
                ajax("getCurrentServerBuild",server);
                ajax("init",url);

                var ajax = function(){
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                        switch(key){
                            case "init":
                                global.xhr = xhr.responseText
                                getLatestBuild();
                            break;
                            case "getIssueLists":
                                global.issueList = JSON.parse(xhr.responseText).dataViewSet.data;
                                global.issueCounter = global.issueList.length-1;
                                getResolutionTickets();
                            break;
                            case "getResolutionTickets":
                                getResolutionDetails(JSON.parse(xhr.responseText),url.split("http://jira.lawson.com/rest/api/2/issue/")[1])
                            break;
                            case "getResolutionDetails":
                                if(global.issueCounter!=0){
                                    addResolutionDetails(JSON.parse(xhr.responseText),url.split("http://jira.lawson.com/rest/api/2/issue/")[1]);
                                    global.issueCounter--;                    
                                }else{
                                    addResolutionDetails(JSON.parse(xhr.responseText),url.split("http://jira.lawson.com/rest/api/2/issue/")[1]);
                                    normalizeDataForDownload();
                                }
                            break;
                            case "getCurrentServerBuild":
                                global.currentServerBuild = xhr.responseText.toString().split("11.0.1.99.")[1].split("</td>")[0];
                            break;
                        }
                            
                        }
                       
                    }
                    xhr.open('GET', url, true);
                    xhr.send(null);
                }
                    




















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