//窗体大小改变事件
window.onresize=function(event) {
    heightCenter();
};
function heightCenter() {
    let currentHeight = document.documentElement.clientHeight;
    // var currentWidth = document.documentElement.clientWidth;
    if(currentHeight < 460){
        document.getElementById("container-login").style.top='0px';
    }else{
        document.getElementById("container-login").style.top=currentHeight / 2 - 230+'px';
    }
};
const socket = new WebSocket('ws://192.168.3.2:9999');
const sendObj={
    uuid:"",
    src:"login",
    tar:"login",
    url:"login",
    charts:{
        nikeName:"",
        phone:"",
        password:"",
        firstLetter:""
    }
}
var runNums = 10;
// 当一个 WebSocket 连接成功时触发。也可以通过 onopen 属性来设置。
socket.addEventListener('open', function (event) {
    console.log('open');
    console.log("未发送至服务器的字节数."+socket.bufferedAmount);
    console.log("连接所传输二进制数据的类型"+socket.binaryType);
});
// 当通过 WebSocket 收到数据时触发。
socket.addEventListener('message', function (event) {
    if(event.data){
        let dts = JSON.parse(event.data);
        if(sendObj.uuid == dts.uuid){
            document.querySelector(".container-login-top>h4").innerText=dts.msg;
            if(dts.code=="200"){
                console.log("登录success");
                docCookies.setItem('web_sktoken',dts.sktoken);
                docCookies.setItem('web_user',dts.user);
                docCookies.setItem('web_user_img',dts.imgPath);
                docCookies.setItem('web_user_des',dts.describes);
            }
        }
    }else{
        document.querySelector(".container-login-top>h4").innerText="未知错误";
    }
    console.log('message from server ', event.data);
});

// 监听可能发生的错误
socket.addEventListener('error', function (event) {
    console.log('WebSocket error: ', event);
});

// Connection opened
socket.addEventListener('close', function (event) {
    console.log('WebSocket close: ', event.code);
});

document.addEventListener('readystatechange', event => {
    heightCenter();
    if(docCookies.hasItem("web_user")){
        document.querySelector(".container-login-top>h4").innerText="用户:"+docCookies.getItem("web_user");
    }
});

document.getElementById("subUser").addEventListener("mousedown", function( event ) {
    switch(socket.readyState){
        case 0:
            document.querySelector(".container-login-top>h4").innerText="正在链接中";
            document.querySelector(".container-login-top>h4").style.color="red";
            break;
        case 1:
            document.querySelector(".container-login-top>h4").innerText="已经发送请等待响应";
            sendMsg();
            runNums = 10;
            this.disabled = true;
            late(this);
            break;
        case 2:
            document.querySelector(".container-login-top>h4").innerText="连接正在关闭";
            document.querySelector(".container-login-top>h4").style.color="red";
            break;
        case 3:
            document.querySelector(".container-login-top>h4").innerText="连接已关闭或者没有链接成功";
            document.querySelector(".container-login-top>h4").style.color="red";
            break;
        default:
            document.querySelector(".container-login-top>h4").innerText="未知错误";
    }
    event.currentTarget.style.transform="scale(0.9)";
}, false);

function sendMsg(){
    let phone =  document.querySelector("input[name='phone']").value;
    let password = document.querySelector("input[name='password']").value;
    if(phone && password){
        sendObj.charts.phone=phone;
        sendObj.charts.password=password;
        sendObj.uuid = uuid();
        console.log(sendObj);
        socket.send(JSON.stringify(sendObj));
    }else{
        document.querySelector(".container-login-top>h4").innerText="必要的数据不能为空";
        document.querySelector(".container-login-top>h4").style.color="red";
    }
}
function late(va) {
    setTimeout(function (vainner) {
        vainner.value = "等待:" + runNums;
        runNums--;
        if(runNums==0){
            vainner.value="Login to your account";
            vainner.disabled = false;
            vainner.style.transform="scale(1)";
            return;
        }
        late(vainner);
    },1000,va);
}

document.getElementById("subUser").addEventListener("mouseup", function( event ) {
    // 在被点击的div内显示当前被点击次数
    event.currentTarget.style.transform="scale(1)";
}, false);

function uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 28; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    return  s.join("");
}