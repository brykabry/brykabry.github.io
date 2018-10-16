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
                $(".download.eleven-o-o").on("click",function(){
                    brykabry.events.download("eleven-o-o");
                })
            },
            download:function(version){
                if(version == "eleven-o-one"){
                    firebase.database().ref('report/110001').once('value').then(function(snapshot) {
                        brykabry.events.JSONToCSVConvertor(JSON.parse(snapshot.val().data),"", true)
                    });
                }else if(version == "eleven-o-o"){
                    firebase.database().ref('report/110000').once('value').then(function(snapshot) {
                        brykabry.events.JSONToCSVConvertor(JSON.parse(snapshot.val().data),"", true)
                    });
                }
                
            },
            JSONToCSVConvertor:function (JSONData, ReportTitle, ShowLabel) {
                var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                var CSV = '';
                if (ShowLabel) {
                    var row = "";
                    for (var index in arrData[0]) {
                        row += index + ',';
                    }
                    row = row.slice(0, -1);
                    CSV += row + '\r\n';
                }
                for (var i = 0; i < arrData.length; i++) {
                    var row = "";
                    for (var index in arrData[i]) {
                        row += '"' + arrData[i][index] + '",';
                    }
                    row.slice(0, row.length - 1);
                    CSV += row + '\r\n';
                }
                if (CSV == '') {        
                    alert("Invalid data");
                    return;
                }   
                var datenow = new Date()
                var fileName = "GHR/TM CU Report as of " + datenow.toLocaleDateString();
                fileName += ReportTitle.replace(/ /g,"_");   
                var uri = 'data:text/csv;charset=utf-8,' + CSV;
                var link = document.createElement("a");    
                link.href = uri;
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
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