var websktoken = docCookies.getItem("web_sktoken");
var webuser = docCookies.getItem("web_user");
if(!websktoken){
    window.location.href="/index.html";
}
const socket = new WebSocket('ws://192.168.3.2:9999');
const sendObjCreateChart ={
    uuid:"",
    url:"queryUsers",
    src:"queryUsers",
    tar:"queryUsers",
    charts:{
        phone:"",
        nikeName:"",
        currentPage:1,
        totalPage:1,
        currentActiveId:"m1-create-chart"
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

        if(recObj.currentActiveId && recObj.currentActiveId == "m1-create-chart"){
            scrollFlagCreateChart = true;
            sendObjCreateChart.charts.totalPage = recObj.page.totalPage;
            sendObjCreateChart.charts.currentPage = recObj.page.currentPage;
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
                            <input type="checkbox" name="addUser" data-id="${groupByToMapvalue.nikeName}">
                        </li>`;
                    htmlDivElement.appendChild(temp_ul);
                }
                addchatsById.insertBefore(htmlDivElement,document.getElementById("fixedBottom"));
            }
        }else if(recObj.url && recObj.url=="applyFriends"){
            //申请添加好友的回复信息.todo
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
    objCreateChart();
}
//当前是用户添加
function objCreateChart() {
    sendObjCreateChart.uuid=uuid();
    socket.send(JSON.stringify(sendObjCreateChart));
}
document.querySelector("#addchats>.subTitle>input").oninput=function(e){
    console.log(this.value);
    //查询内容变更清理数据 重新查询
    scrollFlagCreateChart = true;
    sendObjCreateChart.charts.currentPage=1;
    sendObjCreateChart.charts.nikeName=this.value;
    let elementNodeListOf = document.querySelectorAll("#addchats>div.subPeople");
    for (let elementNodeListOfElement of elementNodeListOf) {
        elementNodeListOfElement.remove();
    }
    objCreateChart();
}
//添加好友的 滚动条标记. 因为滚动一次触发太多次了. 所以要后台响应一次后再触发.
var scrollFlagCreateChart = true;
document.querySelector(".main-3.scollbox").addEventListener("scroll", function(event) {
    if(currentActiveId=="m1-create-chart"){
        //滚动条位置  查询分页数据追加
        if(this.scrollTop + this.clientHeight > addchatsById.clientHeight-88 && scrollFlagCreateChart){
            if(sendObjCreateChart.charts.currentPage<sendObjCreateChart.charts.totalPage){
                sendObjCreateChart.charts.currentPage++;
                scrollFlagCreateChart = false;
                objCreateChart();
                console.log("分页执行");
            }
        }
    }
    event.stopPropagation();
}, false);
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

//发送好友申请的方法
function sendFriendsApply(tx) {
    let elementCheckeOf = document.querySelectorAll("#addchats .subPeople input[name='addUser']:checked");
    if(elementCheckeOf.length>0){
        let sendObjApplyChart ={
            uuid:"",
            url:"applyFriends",
            src:"applyFriends",
            tar:"applyFriends",
            charts:{
                currentActiveId:"m1-apply-chart",
                tokenSession:websktoken,
                nikeNamels:[],
                message:tx||""
            }
        }
        for (let elementCheckeOfElement of elementCheckeOf) {
            sendObjApplyChart.charts.nikeNamels.push(elementCheckeOfElement.getAttribute("data-id"));
        }
        sendObjApplyChart.uuid=uuid();
        socket.send(JSON.stringify(sendObjApplyChart));
    }

}
