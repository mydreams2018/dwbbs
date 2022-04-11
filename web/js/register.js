//窗体大小改变事件
window.onresize=function(event) {
    heightCenter();
};
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        heightCenter();
        console.log("dom-complete");
    }
}
const socket = new WebSocket('ws://192.168.3.2:9999');

const sendObj={
    uuid:"",
    src:"register",
    tar:"register",
    url:"register",
    charts:{
        nikeName:"",
        phone:"",
        password:"",
        firstLetter:""
    }
}
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
           document.querySelector(".container-register-top>h4").innerText=dts.msg;
       }
    }else{
        document.querySelector(".container-register-top>h4").innerText="未知错误";
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

function heightCenter() {
    let currentHeight = document.documentElement.clientHeight;
    // var currentWidth = document.documentElement.clientWidth;
    if(currentHeight < 460){
        document.getElementById("container-register").style.top='0px';
    }else{
        document.getElementById("container-register").style.top=currentHeight / 2 - 230+'px';
    }
};
/* socket.readyState
0 (WebSocket.CONNECTING)
正在链接中
1 (WebSocket.OPEN)
已经链接并且可以通讯
2 (WebSocket.CLOSING)
连接正在关闭
3 (WebSocket.CLOSED)
连接已关闭或者没有链接成功
*/
document.getElementById("subUser").addEventListener("mousedown", function( event ) {
    // 在被点击的div内显示当前被点击次数
    //  event.target.textContent = "click count: " + event.detail;
    switch(socket.readyState){
        case 0:
            document.querySelector(".container-register-top>h4").innerText="正在链接中";
            document.querySelector(".container-register-top>h4").style.color="red";
            break;
        case 1:
            document.querySelector(".container-register-top>h4").innerText="已经发送请等待响应";
            sendMsg();
            runNums = 10;
            this.disabled = true;
            late(this);
            break;
        case 2:
            document.querySelector(".container-register-top>h4").innerText="连接正在关闭";
            document.querySelector(".container-register-top>h4").style.color="red";
            break;
        case 3:
            document.querySelector(".container-register-top>h4").innerText="连接已关闭或者没有链接成功";
            document.querySelector(".container-register-top>h4").style.color="red";
            break;
        default :
            document.querySelector(".container-register-top>h4").innerText="未知错误";
    }
    event.currentTarget.style.transform="scale(0.9)";
}, false);
document.getElementById("subUser").addEventListener("mouseup", function( event ) {
    // 在被点击的div内显示当前被点击次数
    event.currentTarget.style.transform="scale(1)";
}, false);
var runNums = 10;
function late(va) {
    setTimeout(function (vainner) {
        vainner.value = "等待:" + runNums;
        runNums--;
        if(runNums==0){
            vainner.value="Create Account";
            vainner.disabled = false;
            vainner.style.transform="scale(1)";
            return;
        }
        late(vainner);
    },1000,va);
}

function sendMsg() {
    let nikeName =  document.querySelector("input[name='nikeName']").value;
    let phone =  document.querySelector("input[name='phone']").value;
    let password = document.querySelector("input[name='password']").value;
    if(nikeName && phone && password){
        sendObj.uuid = uuid();
        sendObj.charts.nikeName=nikeName;
        sendObj.charts.phone=phone;
        sendObj.charts.password=password;
        sendObj.charts.firstLetter=pinyinUtil.getFirstLetter(nikeName[0]);
        console.log(sendObj);
        socket.send(JSON.stringify(sendObj));
    }else{
        document.querySelector(".container-register-top>h4").innerText="必要的数据不能为空";
        document.querySelector(".container-register-top>h4").style.color="red";
    }
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 28; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    var uuid = s.join("");
    return uuid;
}