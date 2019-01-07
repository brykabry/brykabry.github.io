//https://www.pse.com.ph/stockMarket/companyInfoSecurityProfile.html?method=getListedRecords&common=yes&ajax=true&limit=99994
var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);
setTimeout(() => {
    stockList = JSON.parse($("body").html()).records;
    HaramiQualifiedList = [];
    currentStock = ""
    CArray = [];
    SAjax = function(url,success){
        $.ajax({
            url: url,
            async: false
        })
        .done(success);
    }
    isHaramiOrTweezerOrEngulfing = function(CH,CO,CC,CL,PH,PO,PC,PL){
        //red or doji candle
        // current low >= previous low
        if(PO>=PC && CL>=PL && CC >= CO){
            return true
        }else{ return false}

    }
    for(var i = 0, k = stockList.length; k > i; i++){
        s = stockList[i];
        var stockSecurityId = s.securitySymbolId;
        var stockSecuritySymbol = s.securitySymbol;
        currentStock = stockSecuritySymbol
        // CArray[stockSecuritySymbol] = {}
        //get current price
        if(s.securityStatus == "O"){
            SAjax("https://www.pse.com.ph/stockMarket/companyInfoHistoricalData.html?method=getRecentSecurityQuoteData&ajax=true&security="+stockSecurityId,function(e){
                //e.records[0]
                try {
                    
                    var c =JSON.parse(e).records[0] ,CH,CO,CC,CL;
                    CH = c.sqHigh;
                    CO = c.sqOpen; 
                    CC = c.lastTradePrice;
                    CL = c.sqLow;
                    var p =JSON.parse(e).records[1] ,PH,PO,PC,PL;
                    PH = p.sqHigh;
                    PO = p.sqOpen; 
                    PC = p.lastTradePrice;
                    PL = p.sqLow;
                    if (isHaramiOrTweezerOrEngulfing(CH,CO,CC,CL,PH,PO,PC,PL)){//&&c.totalValue>=1000000&&p.totalValue>=1000000
                        CArray.push(currentStock);
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        }
    }
    console.log(CArray);
    $("body").html(CArray.join("\n"))
}, 1000);
