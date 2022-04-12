var websktoken = docCookies.getItem("web_sktoken");
var webuser = docCookies.getItem("web_user");
if(!websktoken){
    window.location.href="/index.html";
}
const socket = new WebSocket('ws://192.168.3.2:9999');
const sendObj ={
    uuid:"",
    url:"",
    src:"",
    tar:"",
    charts:{
        phone:"",
        nikeName:"",
        currentPage:1,
        currentActiveId:""
    }
}
var addchatsById = document.getElementById("addchats");
// 当一个 WebSocket 连接成功时触发。也可以通过 onopen 属性来设置。
socket.addEventListener('open', function (event) {
    console.log('open');
    console.log("未发送至服务器的字节数."+socket.bufferedAmount);
    console.log("连接所传输二进制数据的类型"+socket.binaryType);
});
// 当通过 WebSocket 收到数据时触发。
socket.addEventListener('message', function (event) {
    if(event.data){
        let recObj = JSON.parse(event.data);
        if(recObj.currentActiveId == "m1-create-chart"){
            let groupByToMap = recObj.datas.reduce((group, product) => {
                let { sortFirst } = product;
                group[sortFirst] = group[sortFirst] ?? [];
                group[sortFirst].push(product);
                return group;
            }, {});
            for (let groupByToMapKey in groupByToMap) {
                let htmlDivElement = document.createElement("div");
                htmlDivElement.className="subPeople";
                let html5Element = document.createElement("h5");
                html5Element.innerText=groupByToMapKey;
                htmlDivElement.appendChild(html5Element);
                for (let groupByToMapvalue of groupByToMap[groupByToMapKey]) {
                    let temp_ul = document.createElement("ul");
                    temp_ul.className="people";
                    temp_ul.innerHTML=`<li>
                            <img src="${groupByToMapvalue.imgPath}">
                        </li>
                        <li>
                            <h3>${groupByToMapvalue.nikeName}</h3>
                            <span>${groupByToMapvalue.registerTime}</span>
                        </li>
                        <li>
                            <input type="checkbox" name="addUser">
                        </li>`;
                    htmlDivElement.appendChild(temp_ul);
                }
                addchatsById.insertBefore(htmlDivElement,document.getElementById("fixedBottom"));
            }
        }
    }
    console.log('Message from server ', event.data);
});

// 监听可能发生的错误
socket.addEventListener('error', function (event) {
    console.log('WebSocket error: ', event);
});

// Connection close
socket.addEventListener('close', function (event) {
    console.log('WebSocket close: ', event.code);
});
function getCurrentData() {
    if(currentActiveId=="m1-create-chart"){
        //当前是用户添加
        sendObj.uuid=uuid();
        sendObj.src="queryUsers";
        sendObj.tar="queryUsers";
        sendObj.url="queryUsers";
        sendObj.charts.nikeName="";
        sendObj.charts.currentActiveId="m1-create-chart";
        socket.send(JSON.stringify(sendObj));
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