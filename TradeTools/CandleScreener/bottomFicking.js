//https://www.pse.com.ph/stockMarket/companyInfoSecurityProfile.html?method=getListedRecords&common=yes&ajax=true&limit=99994
var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);
setTimeout(() => {
    try { 
        var stockListArray = JSON.parse($("body").html()).records.filter((x)=>x.securityStatus=="O");
        $("body").html(`<div class='bottomFishing'>bottomFishing: </div>`)   
        var bottomFishingArray = [];
            SAjax = function(url,success){
                $.ajax({
                    url: url,
                    async: true
                })
                .done(success);
            }
        var test = []
        for(var i = 0, k = stockListArray.length - 1; k>=i ; i++){
            SAjax("https://www.pse.com.ph/stockMarket/companyInfoHistoricalData.html?method=getRecentSecurityQuoteData&ajax=true&security="+stockListArray[i].securitySymbolId,function(e){
                try {
                    var $this = stockListArray.filter((x)=>x.securitySymbolId===this.url.split("security=")[1])[0]
                    $this.history=JSON.parse(e).records;
                    var minVal = 1000000;
                    var c =$this.history[0] ,CH,CO,CC,CL;
                        CH = c.sqHigh;
                        CO = c.sqOpen; 
                        CC = c.lastTradePrice;
                        CL = c.sqLow;
                    var p =$this.history[1] ,PH,PO,PC,PL;
                        PH = p.sqHigh;
                        PO = p.sqOpen; 
                        PC = p.lastTradePrice;
                        PL = p.sqLow;
                    var pp =$this.history[2] ,PPH,PPO,PPC,PPL;
                        PPH = pp.sqHigh;
                        PPO = pp.sqOpen; 
                        PPC = pp.lastTradePrice;
                        PPL = pp.sqLow;
                        
                    var aveVal = 0
                    for(var i = 0, k = 19; k>=i ; i++){
                        aveVal += $this.history[i].totalValue
                    }
                    aveVal = aveVal/20;

                    if (PO>PC&&CC>=CO&&p.totalVolume>c.totalVolume&&aveVal>=minVal){                        
                        $(".bottomFishing").append($this.securitySymbol+"\n");
                    }
                } catch (error) {
                    console.log(error)
                }
                    
            })
        }

    } catch (error) {
        console.log(error)
    }
}, 1000);