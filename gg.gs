var channelToken = "INLyfV5vdpNpW6qpk7/bTBcJ+9zRuIcpxFmgkLSy+2fzUeNEf729NY+UY2yC3Rdoma2Nc/bvbdI4okh9vPWFmXWJk+pZHA7cL0JnzoG7jHVc5fQVixLB0JoQI8h8pzLdF9APKrmNdF+xlG/HQULfnAdB04t89/1O/w1cDnyilFU=";

function replyMsg(replyToken, mess, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': mess
    })
  };
  UrlFetchApp.fetch(url, opt);
}

function distance(lat1, lon1, lat2, lon2, unit) {
    	var radlat1 = Math.PI * lat1/180
    	var radlat2 = Math.PI * lat2/180
    	var theta = lon1-lon2
    	var radtheta = Math.PI * theta/180
    	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    	if (dist > 1) {
    		dist = 1;
    	}
    	dist = Math.acos(dist)
    	dist = dist * 180/Math.PI
    	dist = dist * 60 * 1.1515
    	if (unit=="K") { dist = dist * 1.609344 }
    	if (unit=="N") { dist = dist * 0.8684 }
    	return dist
    }

function doGet(e) {
  var ss = SpreadsheetApp.openByUrl("xxx");
  var sheet = ss.getSheetByName("checkin");
  var lat = e.parameter.lat;
  var long = e.parameter.long;
  var geo = (e.parameter.lat +","+e.parameter.long);
  var user = e.parameter.user;
  var name = e.parameter.name;
  var xos = e.parameter.xos;
  var ctype = e.parameter.ctype;
  var ntea = e.parameter.ntex;

  //var checkwithuid = e.parameter.checkwithuid;
  var latx = "17.8916205";
  var longx = "103.8742401";
  var todaydate = Utilities.formatDate(new Date(), "GMT+7", "dd-MM-yyyy");
  var todaytime = Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss");
  
  // แปลงค่าพิกัด เป็นข้อความสถานที่
  var response1 = Maps.newGeocoder().reverseGeocode(e.parameter.lat, e.parameter.long);
f= response1.results[0].formatted_address;
  // แปลภาษาอังกฤษ เป็นไทย
 var ft = LanguageApp.translate(f, 'en', 'th');
 // ตรวจสอบ
 var cck = (ctype+todaydate+username);
  
  var xdist = distance(latx, longx, lat, long, "K");
 // var typex = e.parameter.sel;
 // var vday = e.parameter.vday;
//  var vday2 = e.parameter.vday2;
 // var sels = e.parameter.sels;
 
  
  if(xdist > 2000){ //ปรับระยะห่างที่กำหนด
    var result = {"desc": "คุณอยู่ห่าง "+xdist.toFixed(0)+" กม. ซึ่งเกินที่กำหนด 2000 กม."};
  }else{ 
        
  var xdist = xdist.toFixed(2)
  var xunit = "กม."; //กิโลเมตร
  if(xdist < 1){
  var xdist = xdist*1000;
  var xdist = xdist.toFixed(0)
  var xunit = "ม."; //เมตร
  }

// ตรวจสอบการเป็นสมาชิก
  var url = 'xx';
  var sss = SpreadsheetApp.openByUrl(url);
  var webAppSheet = sss.getSheetByName("member");
  var getLastRow =  webAppSheet.getLastRow();
  //var username = 'U46c24622beca6cb3c352b202fadeecd0';
  var found_record = '';
  for(var i = 1; i <= getLastRow; i++)
  {
   if(webAppSheet.getRange(i, 1).getDisplayValue() == user)
   {
     found_record = 'TRUE';
   }    
  }
  if(found_record == '')
  {
    found_record = 'FALSE'; 
  }


// การตรวจสอบข
   if(found_record == 'TRUE'){
                    


    var result = {"desc": "คุณ "+name+" \nบันทึกการ Check-"+ctype+" สำเร็จ เวลา "+todaytime+" น.\n"+ft};
   sheet.appendRow([user, name, geo, xdist+' '+xunit, xos, todaydate, todaytime, ctype, ft, ntea, cck]);
    }else{
    var result = {"desc": "บันทึกลงเวลาไม่สำเร็จ\nยังไม่มีไลน์ คุณ "+name+" ในระบบ\nกรุณาลงทะเบียน"};}
    }

   //var result = {"desc": "คุณ "+name+" บันทึกการ Check-"+ctype+" สำเร็จ เวลา "+todaytime+" น."};
 //  sheet.appendRow([user, name, geo, xdist+' '+xunit, xos, todaydate, todaytime, ctype, ft, typex, vday, vday2, sels, ntea]);
  //} 
  
  return ContentService.createTextOutput(JSON.stringify(result) ).setMimeType(ContentService.MimeType.JSON); 
  }




function doPost(e) {
        var value = JSON.parse(e.postData.contents);
        var events = value.events;
        var event = events[0];
        var type = event.type;
        var replyToken = event.replyToken;
        var sourceType = event.source.type;
        var userId = event.source.userId;
        var groupId = event.source.groupId;
        var timeStamp = event.timestamp;
 
        switch (type) {
          case 'follow':
            var mess = [{"type":"text","text":"https://liff.line.me/1654797991-nolGabGZ"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'message':
            var messageType = event.message.type;
            var messageId = event.message.id;
            var messageText = event.message.text;
            
            
            
            if(messageType == "text"){
            var mess = [{"type":"text","text":"https://liff.line.me/1654797991-nolGabGZ"}];
            replyMsg(replyToken, mess, channelToken);
            }
            else{
            var mess = [{"type":"text","text":"https://liff.line.me/1654797991-nolGabGZ"}];
            replyMsg(replyToken, mess, channelToken);
            }
            break;
          default:
            break;
        }
  
  
}
