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
const queryCurrentFriends ={
    uuid:"",
    url:"queryUsersFriends",
    src:"queryUsersFriends",
    tar:"queryUsersFriends",
    charts:{
        nikeName:"",
        currentPage:1,
        totalPage:1,
        currentActiveId:"m1-friends",
        tokenSession:websktoken
    }
}
const queryAnswerFriends ={
    uuid:"",
    url:"queryAnswerFriends",
    src:"queryAnswerFriends",
    tar:"queryAnswerFriends",
    charts:{
        nikeName:"",
        currentPage:1,
        totalPage:1,
        currentActiveId:"m1-notifications",
        tokenSession:websktoken
    }
}
var addchatsById = document.getElementById("addchats");
var queryFriendsByid = document.getElementById("friends");
var queryAnswerFrsByid = document.getElementById("m1Notifications");
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
        }else if(recObj.currentActiveId && recObj.currentActiveId=="m1-friends"){
            scrollFlagQueryFriends = true;
            queryCurrentFriends.charts.totalPage = recObj.page.totalPage;
            queryCurrentFriends.charts.currentPage = recObj.page.currentPage;
            let groupByToMap = recObj.datas.reduce((group, product) => {
                let { sortFirst } = product;
                group[sortFirst] = group[sortFirst] ?? [];
                group[sortFirst].push(product);
                return group;
            }, {});
            for (let groupByToMapKey in groupByToMap) {
                let htmlDivElement = document.createElement("div");
                htmlDivElement.className="frePeople";
                let html5Element = document.createElement("h5");
                html5Element.innerText=groupByToMapKey;
                htmlDivElement.appendChild(html5Element);
                for (let groupByToMapvalue of groupByToMap[groupByToMapKey]) {
                    let temp_ul = document.createElement("ul");
                    temp_ul.className="people";
                    let tempuuid = uuidLow();
                    temp_ul.innerHTML=`
                        <li>
                            <img src="${groupByToMapvalue.imgPath}">
                        </li>
                        <li>
                            <h3>${groupByToMapvalue.nikeName}</h3>
                            <span>${groupByToMapvalue.registerTime}</span>
                        </li>
                        <li>
                            <i data-id="editFixed1${tempuuid}" data-nk="${groupByToMapvalue.nikeName}" class="bi-three-dots-vertical"></i>
                            <div id="editFixed1${tempuuid}" data-nk="${groupByToMapvalue.nikeName}" class="editFixed noClickdis-none" style="display: none;">
                                <p>add group</p>
                                <p>new message</p>
                                <span></span>
                                <p class="delete-red">delete user</p>
                            </div>
                        </li>`;
                    htmlDivElement.appendChild(temp_ul);
                }
                queryFriendsByid.appendChild(htmlDivElement);
            }
        }else if(recObj.currentActiveId && recObj.currentActiveId=="m1-notifications"){
            scrollFlagAnswerFriends = true;
            queryAnswerFriends.charts.totalPage = recObj.page.totalPage;
            queryAnswerFriends.charts.currentPage = recObj.page.currentPage;
            let groupByToMap = recObj.datas.reduce((group, product) => {
                let { registerTime } = product;
                group[registerTime] = group[registerTime] ?? [];
                group[registerTime].push(product);
                return group;
            }, {});
            for (let groupByToMapKey in groupByToMap) {
                let htmlDivElement = document.createElement("div");
                htmlDivElement.className="subcon";
                let innerDiv = document.createElement("div");
                innerDiv.className="subcon-title";
                innerDiv.innerHTML=`<span>${groupByToMapKey}</span>
                        <span><a href="#">Clear all</a></span>`;
                htmlDivElement.appendChild(innerDiv);
                for (let groupByToMapvalue of groupByToMap[groupByToMapKey]) {
                    let temp_ul = document.createElement("div");
                    temp_ul.className="subcon-text";
                    let tempuuid = uuidLow();
                    temp_ul.innerHTML=`<div class="tleft">
                            <img src="${groupByToMapvalue.imgPath}">
                        </div>
                        <div class="tcenter">
                            <h3>${groupByToMapvalue.nikeName}</h3>
                            <p>${groupByToMapvalue.describes}</p>
                        </div>
                        <div class="tright">
                            <i data-id="tright-fixed-${tempuuid}" class="bi-three-dots"></i>
                            <ul id="tright-fixed-${tempuuid}" data-nk="${groupByToMapvalue.nikeName}" class="noClickdis-none" style="display: none">
                                <li>reject</li>
                                <li>accept</li>
                                <li>delete</li>
                            </ul>
                        </div>`;
                    htmlDivElement.appendChild(temp_ul);
                }
                queryAnswerFrsByid.appendChild(htmlDivElement);
            }

        }
        else if(recObj.url && recObj.url=="applyFriends"){
            //申请添加好友的回复信息.todo
        }else if(recObj.url &&recObj.url=="handlerApplyFriend"){
            //删除申请 好友记录成功后  删除Element
            if(recObj.code=="200" && (recObj.msg.includes("删除申请成功") || recObj.msg.includes("拒绝申请成功") || recObj.msg.includes("接受申请成功"))){
                let template = queryAnswerFrsByid.querySelectorAll(".subcon .subcon-text .tcenter h3");
                for (let templateElement of template) {
                    if(templateElement.innerText == recObj.user){
                        if(templateElement.parentElement.parentElement.parentElement.childElementCount>2){
                            templateElement.parentElement.parentElement.remove();
                        }else{
                            templateElement.parentElement.parentElement.parentElement.remove();
                        }
                    }
                }
            }
        }else if(recObj.url && recObj.url=="handlerCurrentFriend"){
            //删除已有 好友记录成功后  删除Element
            if(recObj.code=="200" && recObj.msg.includes("删除好友成功")){
                let template = queryFriendsByid.querySelectorAll(".frePeople .people li h3");
                for (let templateElement of template){
                    if(templateElement.innerText == recObj.user){
                        if(templateElement.parentElement.parentElement.parentElement.childElementCount>2){
                            templateElement.parentElement.parentElement.remove();
                        }else{
                            templateElement.parentElement.parentElement.parentElement.remove();
                        }
                    }
                }
            }
        }else if(recObj.url && recObj.url=="uploadUserImg"){
            console.log("img-load");
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
//初始化调用一次
function getCurrentData() {
    document.getElementById("m1-userDetails").src= docCookies.getItem('web_user_img');
    document.getElementById("img-select").src= docCookies.getItem('web_user_img');
    objCreateChart();
    objCurrentFriends();
    objAnswerFriends();
}
//当前是用户添加
function objCreateChart() {
    sendObjCreateChart.uuid=uuid();
    socket.send(JSON.stringify(sendObjCreateChart));
}
//查询当前用户的好友列表
function objCurrentFriends(){
    queryCurrentFriends.uuid=uuid();
    socket.send(JSON.stringify(queryCurrentFriends));
}
//处理好友申请查询
function objAnswerFriends(){
    queryAnswerFriends.uuid=uuid();
    socket.send(JSON.stringify(queryAnswerFriends));
}
var scrollFlagAnswerFriends = true;
document.querySelector("#m1Notifications>.subTitle>input").oninput=function(e){
    //查询内容变更清理数据 重新查询
    scrollFlagAnswerFriends = true;
    queryAnswerFriends.charts.currentPage=1;
    queryAnswerFriends.charts.nikeName=this.value;
    let elementNodeListOf = document.querySelectorAll("#m1Notifications>div.subcon");
    for (let elementNodeListOfElement of elementNodeListOf) {
        elementNodeListOfElement.remove();
    }
    objAnswerFriends();
}

//查询好友 滚动条标记. 因为滚动一次触发太多次了. 所以要后台响应一次后再触发.
var scrollFlagQueryFriends = true;
document.querySelector("#friends>.subTitle>input").oninput=function(e){
    console.log(this.value);
    //查询内容变更清理数据 重新查询
    scrollFlagQueryFriends = true;
    queryCurrentFriends.charts.currentPage=1;
    queryCurrentFriends.charts.nikeName=this.value;
    let elementNodeListOf = document.querySelectorAll("#friends>div.frePeople");
    for (let elementNodeListOfElement of elementNodeListOf) {
        elementNodeListOfElement.remove();
    }
    objCurrentFriends();
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
    }else if(currentActiveId=="m1-friends"){
        if(this.scrollTop + this.clientHeight > queryFriendsByid.clientHeight-88 && scrollFlagQueryFriends){
            if(queryCurrentFriends.charts.currentPage<queryCurrentFriends.charts.totalPage){
                queryCurrentFriends.charts.currentPage++;
                scrollFlagQueryFriends = false;
                objCurrentFriends();
                console.log("分页执行");
            }
        }
    }else if(currentActiveId=="m1-notifications"){
        if(this.scrollTop + this.clientHeight > queryAnswerFrsByid.clientHeight-88 && scrollFlagAnswerFriends){
            if(queryAnswerFriends.charts.currentPage<queryAnswerFriends.charts.totalPage){
                queryAnswerFriends.charts.currentPage++;
                scrollFlagAnswerFriends = false;
                objAnswerFriends();
                console.log("分页执行");
            }
        }
    }
    event.stopPropagation();
}, false);
function uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 28; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    return s.join("");
}
function uuidLow(){
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i =0;i<12; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    return s.join("");
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
//处理好友申请
function handlerApplyFriends(type,nikName){
    if(type && nikName){
        let handlerApplyFriends ={
            uuid:"",
            url:"handlerApplyFriend",
            src:"handlerApplyFriend",
            tar:"handlerApplyFriend",
            charts:{
                currentActiveId:"m1-handler-apply",
                tokenSession:websktoken,
                nikeName:nikName,
                message:type
            }
        }
        handlerApplyFriends.uuid=uuid();
        console.log(type,nikName);
        socket.send(JSON.stringify(handlerApplyFriends));
    }
}
//现有好友处理
function handlerCurrentFriends(type,nikName){
    if(type && nikName){
        let handlerCurrentFriends ={
            uuid:"",
            url:"handlerCurrentFriend",
            src:"handlerCurrentFriend",
            tar:"handlerCurrentFriend",
            charts:{
                currentActiveId:"m1-handler-currnet-friend",
                tokenSession:websktoken,
                nikeName:nikName,
                message:type
            }
        }
        handlerCurrentFriends.uuid=uuid();
        console.log(type,nikName);
        socket.send(JSON.stringify(handlerCurrentFriends));
    }
}
//上传用户图片 文件
const readerFile = new FileReader();
const fileEncoder = new TextEncoder();
var fileType = "";
readerFile.onload = function(evt){
    if(fileType.includes("image/")){
        fileType = "."+fileType.split("/")[1];
        let oneByte = fileEncoder.encode(`uuid=xxxxx;src=${websktoken};url=uploadUserImg;tar=uploadUserImg;fileName=`+uuidLow()+fileType);
        let viewByte = new Int8Array(evt.target.result);
        socket.send(oneByte);
        socket.send(viewByte);
    }
};
