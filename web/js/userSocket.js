docCookies.getItem("web_sktoken");
docCookies.getItem("web_user");
console.log(currentActiveId);
const socket = new WebSocket('ws://192.168.3.2:9999');
const sendObj ={
    uuid:"",
    url:"queryUsers",
    src:"queryUsers",
    tar:"queryUsers",
    charts:{
        phone:"",
        nikeName:"",
        currentPage:1
    }
}
// 当一个 WebSocket 连接成功时触发。也可以通过 onopen 属性来设置。
socket.addEventListener('open', function (event) {
    console.log('open');
    console.log("未发送至服务器的字节数."+socket.bufferedAmount);
    console.log("连接所传输二进制数据的类型"+socket.binaryType);

    //temp test
    sendObj.uuid="dfsdf";
    sendObj.charts.nikeName="";
    socket.send(JSON.stringify(sendObj));

});
// 当通过 WebSocket 收到数据时触发。
socket.addEventListener('message', function (event) {
    console.log('Message from server ', JSON.parse(event.data));
});

// 监听可能发生的错误
socket.addEventListener('error', function (event) {
    console.log('WebSocket error: ', event);
});

// Connection opened
socket.addEventListener('close', function (event) {
    console.log('WebSocket close: ', event.code);
});