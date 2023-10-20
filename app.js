async function getProfile() {
  const profile = await liff.getProfile();
  const lid = profile.userId ;
  const lpic = profile.pictureUrl ;
  const luname = profile.displayName ;
  //console.log(profile);
  // console.log(lid);
  // document.querySelector('#upic').src = lpic ;
  // document.querySelector('#uid').innerHTML = lname;
 
  localStorage.setItem("luid", lid);
  localStorage.setItem("lupic", lpic);
  localStorage.setItem("luname", luname);
  

  getData()
}

async function getData() {
  let luid = localStorage.getItem("luid");
  let lupic = localStorage.getItem("lupic");
  let luname = localStorage.getItem("luname");
  let gas = `https://script.google.com/macros/s/AKfycbxcadeOA-J6svL1UtfXko0kdIK3uTQt6xLSyOIdlhzNMzcCwnyTPhyDRsRtdE6GZcmB/exec?user=${luid}`;
  const records = await fetch(gas);
  const data = await records.json();

 // console.log(data)

  data.user.forEach(function(user){
      let pname = user.pname
      let fname = user.fname
      let lname = user.lname
      let job = user.job
      let hos = user.hos
      let token = user.token
      let cid = user.cid
      document.querySelector('#upic').src = lupic ;
      document.querySelector('#pname').value = pname;
      document.querySelector('#fname').value = fname;
      document.querySelector('#lname').value = lname;
      document.querySelector('#job').value = job;
      document.querySelector('#hos').value = hos;
      document.querySelector('#token').value = token;
      document.querySelector('#cid').value = cid;
    

  })

}

async function updateData() {
  let luid = localStorage.getItem("luid");
  let lupic = localStorage.getItem("lupic");
  let luname = localStorage.getItem("luname");
  let pname = document.querySelector('#pname').value ;
  let fname = document.querySelector('#fname').value ;
  let lname = document.querySelector('#lname').value;
  let job = document.querySelector('#job').value;
  let hos = document.querySelector('#hos').value;
  let token = document.querySelector('#token').value;
 // let cid = document.querySelector('#cid').value;
 let cid = '';
 let msg = '';
 if (document.querySelector('#cid').value.length < 13){
       //alert("เลขบัตรประจำตัวประชาชน ต้องยาว 13 หลัก");
       msg = 'เลขบัตรประจำตัวประชาชน ต้องยาว 13 หลัก!';
  }else if(document.querySelector('#cid').value.length == 13){
    cid = md5(document.querySelector('#cid').value);
     msg = 'ปรับปรุงข้อมูลเรียบร้อยแล้ว! เลขบัตรประจำตัวประชาชนของท่านได้เข้ารหัสที่ไม่สามารถถอดได้แล้ว!'; 
    document.querySelector('#cid').value = cid;
  }else{
    cid = document.querySelector('#cid').value;
    msg = 'ปรับปรุงข้อมูลเรียบร้อยแล้ว!';
  }
    
  let ugas = `https://script.google.com/macros/s/AKfycbwAqlW4wFH_dS5Nx5YK9TIk4DtODetI47hRAdvIxZHdMB_mA_xEKzOvjNqzEsC00xenQw/exec?user=${luid}&name=${luname}&pic=${lupic}&pic=${lupic}&pname=${pname}&fname=${fname}&lname=${lname}&job=${job}&hos=${hos}&token=${token}&cid=${cid}`;
  const urecord = await fetch(ugas);
  const datas = await urecord.json();
  swal.fire({
      //icon: "success",
      title: msg,
      //html: msg,
     }).then(function() {
      liff.closeWindow();
  });
}


function Auth() {
let luid = localStorage.getItem("luid");
let url = 'https://wisanusenhom.github.io/x/edit.html' ;
let cid = 'oXTr5al05irtPoZ9pkWof9';
let noti = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${cid}&redirect_uri=${url}&scope=notify&state=${luid}`;
window.location.replace(noti);
}

function notify() {
let myParam = window.location.search;
let exc = myParam.split('code=')[1].split('&')[0];
// let excst = myParam.split('state=')[1].split('&')[0];
document.querySelector('#token').value = exc
}


async function main() {
  await liff.init({ liffId: "1654797991-V1eJqnJ4" })
    if (liff.isLoggedIn()) {
      getProfile() 
    } else {
      liff.login()
    }
}
main()
