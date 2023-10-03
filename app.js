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

    console.log(data)

    data.user.forEach(function(user){
        let pname = user.pname
        let fname = user.fname
        let lname = user.lname
        let job = user.job
        let hos = user.hos
        document.querySelector('#upic').src = lupic ;
        document.querySelector('#pname').value = pname
        document.querySelector('#fname').value = fname
        document.querySelector('#lname').value = lname
        document.querySelector('#job').value = job
        document.querySelector('#hos').value = hos

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

    let ugas = `https://script.google.com/macros/s/AKfycbwAqlW4wFH_dS5Nx5YK9TIk4DtODetI47hRAdvIxZHdMB_mA_xEKzOvjNqzEsC00xenQw/exec?user=${luid}&name=${luname}&pic=${lupic}&pic=${lupic}&pname=${pname}&fname=${fname}&lname=${lname}&job=${job}&hos=${hos} `;
    const urecord = await fetch(ugas);
    const datas = await urecord.json();
    swal.fire({
        icon: "success",
        title: "สำเร็จ!",
        text: "ปรับปรุงข้อมูลเรียบร้อยแล้ว!",
       }).then(function() {
        liff.closeWindow();
    });
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
