var channelToken = "xxFU=";

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
  var response1 = Maps.newGeocoder().reverseGeocode(lat,long);
f= response1.results[0].formatted_address;
  // แปลภาษาอังกฤษ เป็นไทย
 var ft = LanguageApp.translate(f, 'en', 'th');
 // กำหนดรหัสตรวจสอบ
 var cck = (ctype+todaydate+user);
 var cckv = (todaydate+user);
  
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
  if (xdist < 100){var xdist = 0; // ระยะน้อยกว่า 100 เมตร เท่ากับ 0
  var xdist = xdist.toFixed(0)}
  var xunit = "ม."; //เมตร
  }

 // Logger.log(xdist);

// ตรวจสอบการเป็นสมาชิก
  var webAppSheet = ss.getSheetByName("request"); //member
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
  };

      var lastrow = sheet.getLastRow();
      var fristrow = (lastrow-20);
      var data_record = ''
      for(var r = 1 ; r <= lastrow; r++)
      {
      if(sheet.getRange(r, 1).getDisplayValue() == cck)
      {
      data_record = 'TRUE';
      }    
      }
      if(data_record == '')
      {
      data_record = 'FALSE'; 
      };
      // Logger.log(r);

// การตรวจสอบข้อมูล
   if(found_record == 'TRUE'){
          if(data_record == 'FALSE'){
          var result = {"desc": "คุณ "+name+" \nบันทึกการ Check-"+ctype+" สำเร็จ\nเวลา "+todaytime+" น.\n"+ft+"\nระยะ "+xdist+" "+xunit};
          sheet.appendRow([cck,cckv,user, name, geo, xdist+' '+xunit, xos, todaydate, todaytime, ctype, ft, ntea,new Date()]);
          }else{
          result = {"desc": "คุณ "+name+" \nบันทึกการ Check-"+ctype+" ในวันนี้แล้ว"};}
      }else{
      var result = {"desc": "บันทึกลงเวลาไม่สำเร็จ\nยังไม่มีไลน์ คุณ "+name+" ในระบบ\nกรุณาลงทะเบียน"};}
    }
Logger.log(result)
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
            var mess = [{"type":"text","text":"https://liff.line.me/xxx"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'message':
            var messageType = event.message.type;
            var messageId = event.message.id;
            var messageText = event.message.text;
            
            
            
            if(messageType == "text"){
            var mess = [{"type":"text","text":"https://liff.line.me/xxx"}];
            replyMsg(replyToken, mess, channelToken);
            }
            else{
            var mess = [{"type":"text","text":"https://liff.line.me/xxx"}];
            replyMsg(replyToken, mess, channelToken);
            }
            break;
          default:
            break;
        }
  
  
}
