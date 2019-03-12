//https://www.pse.com.ph/stockMarket/companyInfoSecurityProfile.html?method=getListedRecords&common=yes&ajax=true&limit=99994
var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);
setTimeout(() => {
    stockList = JSON.parse($("body").html()).records;
    volumeSpikeArray=[];
    breakoutVolumeArray=[];
    bounceVolumeArray=[];
    haramiWithVolumeArray = [];
    insitutionBuyingArray = [];
    insitutionTestBuyArray = [];
    bottomFishingArray = [];
    currentStock = ""
    threeInsideUpArray = [];
    garbagerSwingArray = [];
    engulfingSwingArray = [];
    aroonBearSwingArray = [];
    donchianMidCrossSwingArray = [];
    volumeSpikeArray=[]
    // histogramStepArray=[]
    SAjax = function(url,success){
        $.ajax({
            url: url,
            async: false
        })
        .done(success);
    }
    threeInsideUp = function(CH,CO,CC,CL,PH,PO,PC,PL,PPH,PPO,PPC,PPL){
        //red or doji candle
        // current low >= previous low
        if(PPO>=PPC && PL>=PPL && PC >= PO && CL >= PL && CC >= CO){
            return true
        }else{ return false}

    }
    garbagerSwing = function(CH,CO,CC,CL,PH,PO,PC,PL,PPH,PPO,PPC,PPL){
        //red or doji candle
        // current low >= previous low
        if(PO >= PC && CL >= PL && CC >= CO && CO > PC){
            return true
        }else{ return false}

    }
    engulfingSwing = function(CH,CO,CC,CL,PH,PO,PC,PL,PPH,PPO,PPC,PPL){
        //red or doji candle
        // current low >= previous low
        if(PO >= PC && CC >= CO && CC > PH){
            return true
        }else{ return false}

    }
    aroonBearSwing = function(ze,on,tw,th,fo,fi,si,se,ei,ni,te){
        //forming higher low
        data = [ze.sqLow,on.sqLow,tw.sqLow,th.sqLow,fo.sqLow,fi.sqLow,si.sqLow,se.sqLow,ei.sqLow,ni.sqLow,te.sqLow];
        //data = [0,1,2,3,4,5,6,7,8,9,10]
        aroonBearLowOne = data[10]
        aroonBearLowIndicatorOne = 100
        for(var i = 9, k = 0; i>k;i--){
            if(data[i]<aroonBearLowOne){
                aroonBearLowOne=data[i];
                aroonBearLowIndicatorOne=100

            }else{
                aroonBearLowIndicatorOne-=10;
            }
        }
        //data = [0,1,2,3,4,5,6,7,8,9,10]
        aroonBearLowTwo = data[9]
        aroonBearLowIndicatorTwo = 100
        for(var i = 8, k = 0; i>=k;i--){
            if(data[i]<aroonBearLowTwo){
                aroonBearLowTwo=data[i];
                aroonBearLowIndicatorTwo=100

            }else{
                aroonBearLowIndicatorTwo-=10;
            }
        }
        if(aroonBearLowIndicatorOne == 100 && aroonBearLowIndicatorTwo < 100){
            
            return true
        }else{
            return false
        }


    }
    donchianMidCrossSwing=function(ze,on,tw,th,fo,fi,si,se,ei,ni,te){
        dataHigh = [ze.sqHigh,on.sqHigh,tw.sqHigh,th.sqHigh,fo.sqHigh,fi.sqHigh,si.sqHigh,se.sqHigh,ei.sqHigh,ni.sqHigh,te.sqHigh];
        dataLow = [ze.sqLow,on.sqLow,tw.sqLow,th.sqLow,fo.sqLow,fi.sqLow,si.sqLow,se.sqLow,ei.sqLow,ni.sqLow,te.sqLow];
        donchianHigh = dataHigh[9]
        donchianLow = dataLow[9];
        for(var i = 8, k = 0; i>=k;i--){
            if(dataHigh[i]>donchianHigh){
                donchianHigh = dataHigh[i];
            }
            if(donchianLow>dataLow[i]){
                donchianLow=dataLow[i]
            }
        }
        donchianMid= (donchianHigh + donchianLow)/2;
        if(donchianMid > ze.sqOpen && ze.lastTradePrice > donchianMid){
            return true
        }else{return false}
    }
    // histogramStep=function(data){
    //     var data12 = [];
    //     var data26 = [];
    //     var k12 = 2/(12+1);
    //     var ema12 = (price * k12)+ (prevEma*(1-k12))
    //     var k26 = 2/(26+1);
    //     var ema26 = (price * k26)+ (prevEma*(1-k26))
    //     for(var i = 0, k = 11; k>=i ; k--){
    //         data12.push(data.records[k].lastTradePrice);
    //     }
    //     for(var i = 0, k = 25; k>=i ; k--){
    //         data26.push(data.records[k].lastTradePrice);
    //     }
    //     console.log(data12);
    // }
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
                    var minVal = 1000000;
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
                    var pp =JSON.parse(e).records[2] ,PPH,PPO,PPC,PPL;
                    PPH = pp.sqHigh;
                    PPO = pp.sqOpen; 
                    PPC = pp.lastTradePrice;
                    PPL = pp.sqLow;
                    var aveVal = function(){
                        var tVal = 0
                        for(var i = 0, k = 19; k>=i ; i++){
                            tVal += JSON.parse(e).records[i].totalValue
                        }
                        tVal = tVal/20;
                        return tVal;
                    }
                    ;
                    var aveVol = function(){
                        var tVol = 0
                        for(var i = 0, k = 19; k>=i ; i++){
                            tVol += JSON.parse(e).records[i].totalVolume
                        }
                        tVol = tVol/20;
                        return tVol;
                    }
                    var prevAveVol = function(){
                        var tVol = 0
                        for(var i = 1, k = 19; k>=i ; i++){
                            tVol += JSON.parse(e).records[i].totalVolume
                        }
                        tVol = tVol/20;
                        return tVol;
                    }
                    if (aveVol()<c.totalVolume&&aveVal()>=minVal){//
                        volumeSpikeArray.push(currentStock);
                    }
                    if (aveVol()<c.totalVolume&&aveVal()>=minVal&&CC>CO){//
                        breakoutVolumeArray.push(currentStock);
                    }
                    if (aveVol()>c.totalVolume&&prevAveVol()>p.totalVolume&&p.totalVolume>=c.totalVolume&&CC>PC&&aveVal()>=minVal&&CC>=CO&&PC>=PO){
                        insitutionBuyingArray.push(currentStock);
                    }
                    if (aveVol()>c.totalVolume&&prevAveVol()>p.totalVolume&&pp.totalVolume>=p.totalVolume&&p.totalVolume>=c.totalVolume&&CC>PC&&aveVal()>=minVal&&CC>=CO&&PC>=PO&&PPO>PPC){
                        insitutionTestBuyArray.push(currentStock);
                    }
                    if (PO>PC&&CC>=CO&&p.totalVolume>c.totalVolume&&aveVal()>=minVal){
                        bottomFishingArray.push(currentStock);
                    }
                    if (aveVol()<c.totalVolume&&aveVal()>=minVal&&CO>CC){//
                        bounceVolumeArray.push(currentStock);
                    }
                    if (threeInsideUp(CH,CO,CC,CL,PH,PO,PC,PL,PPH,PPO,PPC,PPL)&&aveVal()>=minVal){//
                        threeInsideUpArray.push(currentStock);
                    }
                    if (garbagerSwing(CH,CO,CC,CL,PH,PO,PC,PL,PPH,PPO,PPC,PPL)&&aveVal()>=minVal){//
                        garbagerSwingArray.push(currentStock);
                    } 
                    if (garbagerSwing(CH,CO,CC,CL,PH,PO,PC,PL,PPH,PPO,PPC,PPL)&&aveVal()>=minVal&&aveVol()<c.totalVolume){//
                        haramiWithVolumeArray.push(currentStock);
                    }
                    if (engulfingSwing(CH,CO,CC,CL,PH,PO,PC,PL,PPH,PPO,PPC,PPL)&&aveVal()>=minVal){//
                        engulfingSwingArray.push(currentStock);
                    }
                    if (aroonBearSwing(JSON.parse(e).records[0],
                        JSON.parse(e).records[1],
                        JSON.parse(e).records[2],
                        JSON.parse(e).records[3],
                        JSON.parse(e).records[4],
                        JSON.parse(e).records[5],
                        JSON.parse(e).records[6],
                        JSON.parse(e).records[7],
                        JSON.parse(e).records[8],
                        JSON.parse(e).records[9],
                        JSON.parse(e).records[10])&&aveVal()>=minVal){//
                            aroonBearSwingArray.push(currentStock);
                    }
                    if (donchianMidCrossSwing(JSON.parse(e).records[0],
                        JSON.parse(e).records[1],
                        JSON.parse(e).records[2],
                        JSON.parse(e).records[3],
                        JSON.parse(e).records[4],
                        JSON.parse(e).records[5],
                        JSON.parse(e).records[6],
                        JSON.parse(e).records[7],
                        JSON.parse(e).records[8],
                        JSON.parse(e).records[9],
                        JSON.parse(e).records[10])&&aveVal()>=minVal){//
                            donchianMidCrossSwingArray.push(currentStock);
                    }
                    // if (histogramStep(JSON.parse(e))&&aveVal()>=1000000){//
                    //     histogramStepArray.push(currentStock);
                    // }
                } catch (error) {
                    console.log(error)
                }
            })
        }
    }
    console.log("volumeSpikeArray:"+volumeSpikeArray);
    console.log("breakoutVolumeArray:"+breakoutVolumeArray);
    console.log("bounceVolumeArray:"+bounceVolumeArray);
    console.log("insitutionBuyingArray:"+insitutionBuyingArray);
    console.log("insitutionTestBuyArray:"+insitutionTestBuyArray);
    console.log("bottomFishingArray:"+bottomFishingArray);
    console.log("threeInsideUpArray:"+threeInsideUpArray);
    console.log("garbagerSwingArray:"+garbagerSwingArray);
    console.log("haramiWithVolumeArray:"+haramiWithVolumeArray);
    console.log("engulfingSwingArray:"+engulfingSwingArray);
    console.log("aroonBearSwingArray:"+aroonBearSwingArray);
    console.log("aroonBearSwingArray:"+aroonBearSwingArray);
    // console.log(histogramStepArray);
    $("body").html(`
    <div class='bottomFishing'>bottomFishing: ${bottomFishingArray.join("\n")}</div>
    <div class='InstiTestBuyArray'>InstiTestBuying: ${insitutionTestBuyArray.join("\n")}</div>
    `)
    // <div class='volumeSpike'>volumeSpike: ${volumeSpikeArray.join("\n")}</div>
    // <div class='breakoutVolume'>Breakout Play: ${breakoutVolumeArray.join("\n")}</div>
    // <div class='bounceVolume'>Bounce Play: ${bounceVolumeArray.join("\n")}</div>
    // <div class='threeInsideUp'>ThreeInsideUp: ${threeInsideUpArray.join("\n")}</div>
    // <div class='garbagerSwing'>GarbagerSwing: ${garbagerSwingArray.join("\n")}</div>
    // <div class='aroonSwing'>AroonSwing: ${aroonBearSwingArray.join("\n")}</div>
    // <div class='donchianMidCrossSwing'>DonchianMidCrossSwing: ${donchianMidCrossSwingArray.join("\n")}</div>
}, 1000);
