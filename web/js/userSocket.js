var websktoken = docCookies.getItem("web_sktoken");
var webuser = docCookies.getItem("web_user");
if(!websktoken){
    window.location.href="/index.html";
}
var initQueryFlags = 0;
const socket = new WebSocket('wss://www.kungreat.cn:9999');
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
const queryChartsViews ={
    uuid:"",
    url:"queryChartsViews",
    src:"queryChartsViews",
    tar:"queryChartsViews",
    charts:{
        nikeName:"",
        currentPage:1,
        totalPage:1,
        currentActiveId:"m1-charts",
        tokenSession:websktoken
    }
}
var addchatsById = document.getElementById("addchats");
var queryFriendsByid = document.getElementById("friends");
var queryAnswerFrsByid = document.getElementById("m1Notifications");
var queryChartsViewsByid = document.getElementById("m1Charts");
//聊天内容相关的element
var m6DefaultHideTop = document.getElementById("m6DefaultHide-top");
var m6DefaultHideCon = document.getElementById("m6DefaultHide-con");
var m6DefaultHideBtm = document.getElementById("m6DefaultHide-btm");
// 当一个 WebSocket 连接成功时触发。也可以通过 onopen 属性来设置。
socket.addEventListener('open', function (event) {
    console.log('open');
    console.log("未发送至服务器的字节数."+socket.bufferedAmount);
    console.log("连接所传输二进制数据的类型"+socket.binaryType);
    initQueryFlags++;
    getCurrentData();
});
// 当通过 WebSocket 收到数据时触发。
socket.addEventListener('message', function (event) {
    if(event.data){
        let recObj = JSON.parse(event.data);

        if(recObj.currentActiveId && recObj.currentActiveId == "m1-create-chart"){
            scrollFlagCreateChart = true;
            sendObjCreateChart.charts.totalPage = recObj.page.totalPage;
            sendObjCreateChart.charts.currentPage = recObj.page.currentPage;
            recObj.dataList=recObj.dataList.filter(word => word.nikeName!=webuser);
            let groupByToMap = recObj.dataList.reduce((group, product) => {
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
                            <p>${groupByToMapvalue.describes}</p>
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
            let groupByToMap = recObj.dataList.reduce((group, product) => {
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
                             <p>${groupByToMapvalue.describes}</p>
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
            let groupByToMap = recObj.dataList.reduce((group, product) => {
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

        }else if(recObj.currentActiveId && recObj.currentActiveId=="m1-charts"){
            scrollFlagChartsViews = true;
            queryChartsViews.charts.totalPage = recObj.page.totalPage;
            queryChartsViews.charts.currentPage = recObj.page.currentPage;
            for(let dtstr of recObj.dataList){
                let htmlDivElement = document.createElement("div");
                htmlDivElement.className="subContent";
                htmlDivElement.innerHTML=`<div class="group">
                        <div class="group-left">
                            <img src="${dtstr.imgPath}" data-id="${dtstr.srcTarUUID}" alt="${dtstr.nikeName}">
                        </div>
                        <div class="group-right" data-id="${dtstr.srcTarUUID}">
                            <div class="msg-title">
                                <h5 class="username">${dtstr.nikeName}</h5>
                                <span class="lasttime">${timeFormart(dtstr.registerTime).substring(5)}</span>
                            </div>
                            <div class="msg-con" title="msg">
                                ${dtstr.describes?replaceImgsrc(dtstr.describes):''}...
                            </div>
                        </div>
                    </div>
                    <div class="fixed-right" data-id="${dtstr.id}">
                        <i class="bi-bookmark-x-fill"></i>
                    </div>`;
                queryChartsViewsByid.appendChild(htmlDivElement);
            }
        }else if(recObj.currentActiveId && recObj.currentActiveId=="m1-handler-charts-view"){
            handlerChartsViews.charts.totalPage = recObj.page.totalPage;
            handlerChartsViews.charts.currentPage = recObj.page.currentPage;
            let data_id = m6DefaultHideTop.getAttribute("data-id");
            if(data_id==recObj.dataId && !scrollFlaghandlerChartsViews){
                for(let dtstr of recObj.dataList){
                    let htmlLiElement = document.createElement("li");
                    htmlLiElement.innerHTML=`
                        <h5 style=${dtstr.srcUser==webuser?'text-align:right;':'text-align:left;' }>${timeFormart(dtstr.sendTime)} <i class="bi-three-dots-vertical"></i></h5>
                        <pre style=${dtstr.srcUser==webuser?'float:right;':'float:left;' }>${replaceImgsrc(dtstr.content)}</pre>
                            `;
                    //从第一个元素追加
                    m6DefaultHideCon.insertBefore(htmlLiElement,m6DefaultHideCon.firstElementChild);
                }
                scrollFlaghandlerChartsViews=true;
            }else{
                if(recObj.dataList && recObj.dataList.length>1){
                    recObj.dataList.reverse();//反转数组
                }
                //清空数据 再添加
                m6DefaultHideTop.style.display="block";
                m6DefaultHideCon.style.display="block";
                m6DefaultHideBtm.style.display="block";
                m6DefaultHideTop.setAttribute("data-id",recObj.dataId);
                m6DefaultHideTop.querySelector("h3").innerText=document.querySelector(`.group-right[data-id='${recObj.dataId}'] .username`).innerText;
                m6DefaultHideTop.querySelector("img").src=document.querySelector(`.group-left img[data-id='${recObj.dataId}']`).src;
                m6DefaultHideCon.innerHTML="";
                for(let dtstr of recObj.dataList){
                    let htmlLiElement = document.createElement("li");
                    htmlLiElement.innerHTML=`
                        <h5 style=${dtstr.srcUser==webuser?'text-align:right;':'text-align:left;'} > ${timeFormart(dtstr.sendTime)} <i class="bi-three-dots-vertical"></i></h5>
                        <pre style=${dtstr.srcUser==webuser?'float:right;':'float:left;'} >${replaceImgsrc(dtstr.content)}</pre>
                            `;
                    m6DefaultHideCon.appendChild(htmlLiElement);
                }
                //滚动条到底 最新的一条信息
                m6DefaultHideCon.scrollTo(0,m6DefaultHideCon.scrollHeight);
            }
        }
        else if(recObj.url && recObj.url=="applyFriends"){
            addAnswerAnimation(recObj.msg);
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
            if(recObj.code=="200" && recObj.msg.includes("接受申请成功")){
                //刷新好友列表页面
                scrollFlagQueryFriends = true;
                queryCurrentFriends.charts.currentPage=1;
                queryCurrentFriends.charts.nikeName="";
                document.querySelector("#friends>.subTitle>input").value="";
                let elementNodeListOf = document.querySelectorAll("#friends>div.frePeople");
                for (let elementNodeListOfElement of elementNodeListOf) {
                    elementNodeListOfElement.remove();
                }
                objCurrentFriends();
            }
            addAnswerAnimation(recObj.msg);
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
            }else if(recObj.code=="200" && recObj.msg.includes("添加聊天视图成功")){
                //清空视图内容 重新加载一次
                scrollFlagChartsViews = true;
                queryChartsViews.charts.currentPage=1;
                queryChartsViews.charts.nikeName="";
                document.querySelector("#m1Charts>.subTitle>input").value="";
                let elementNodeListOf = document.querySelectorAll("#m1Charts>div.subContent");
                for (let elementNodeListOfElement of elementNodeListOf) {
                    elementNodeListOfElement.remove();
                }
                objChartsViews();
            }
            addAnswerAnimation(recObj.msg);
        }else if(recObj.url && recObj.url=="uploadUserImg"){
            if(recObj.code=="200"){
                docCookies.setItem('web_user_img',recObj.imgPath,null,"/");
            }
            console.log("img-load");
            addAnswerAnimation(recObj.msg);
        }else if(recObj.url && recObj.url=="handlerChartsSend"){
            //发送信息成功. 把信息追加到列表中
            if(recObj.code=="200" && recObj.srcTarUUID==m6DefaultHideTop.getAttribute("data-id")){
                let curDate = new Date();
                let htmlLiElement = document.createElement("li");
                htmlLiElement.innerHTML=`
                        <h5 style="text-align: right;" >${curDate.getHours()}:${curDate.getMinutes()} <i class="bi-three-dots-vertical"></i></h5>
                        <pre style="float: right;" >${replaceImgsrc(recObj.msg)}</pre>`;
                m6DefaultHideCon.appendChild(htmlLiElement);
                m6DefaultHideCon.scrollTo(0,m6DefaultHideCon.scrollHeight);
            }else{
                addAnswerAnimation(recObj.msg);
            }
        }else if(recObj.url && recObj.url=="handlerDesUpdate"){
            addAnswerAnimation(recObj.msg);
            docCookies.setItem('web_user_des',recObj.describes,null,"/");
        }else if(recObj.url && recObj.url=="handlerChartsViews"){
            if(recObj.code=="200" && recObj.msg=="hide"){
                let uuidTemp = recObj.uuid;
                let deleteEle = document.querySelector(`.subContent .fixed-right[data-id='${uuidTemp}']`);
                if(deleteEle){
                    deleteEle.parentElement.remove();
                }
            }
        }
        else if(recObj.url && recObj.url=="eventAddFriends"){
            addAnswerAnimation(recObj.src+":申请添加你为好友");
            //添加好友的事件通知 机构
            let datespan = queryAnswerFrsByid.querySelector(".subcon .subcon-title span");
            let strDate = formatDateCur();
            if(datespan && datespan.innerText==strDate){
                    let tempuuid = uuidLow();
                    let divhtmlele=document.createElement("div");
                    divhtmlele.className="subcon-text";
                    divhtmlele.innerHTML=` 
                            <div class="tleft">
                                <img src="${recObj.imgPath}">
                            </div>
                            <div class="tcenter">
                                <h3>${recObj.src}</h3>
                                <p>${recObj.describes}</p>
                            </div>
                            <div class="tright">
                                <i data-id="tright-fixed-${tempuuid}" class="bi-three-dots"></i>
                                <ul id="tright-fixed-${tempuuid}" data-nk="${recObj.src}" class="noClickdis-none" style="display: none">
                                    <li>reject</li>
                                    <li>accept</li>
                                    <li>delete</li>
                                </ul>
                            </div>`;
                    let subcontemp = datespan.parentElement.parentElement;
                    subcontemp.insertBefore(divhtmlele,subcontemp.querySelector(".subcon-text"));
            }else{
                let tempuuid = uuidLow();
                let divhtmlele=document.createElement("div");
                divhtmlele.className="subcon";
                divhtmlele.innerHTML=`
                        <div class="subcon-title">
                            <span>${strDate}</span>
                            <span><a href="#">Clear all</a></span>
                        </div>
                        <div class="subcon-text">
                            <div class="tleft">
                                <img src="${recObj.imgPath}">
                            </div>
                            <div class="tcenter">
                                <h3>${recObj.src}</h3>
                                <p>${recObj.describes}</p>
                            </div>
                            <div class="tright">
                                <i data-id="tright-fixed-${tempuuid}" class="bi-three-dots"></i>
                                <ul id="tright-fixed-${tempuuid}" data-nk="${recObj.src}" class="noClickdis-none" style="display: none">
                                    <li>reject</li>
                                    <li>accept</li>
                                    <li>delete</li>
                                </ul>
                            </div>
                        </div>`;
                queryAnswerFrsByid.insertBefore(divhtmlele,queryAnswerFrsByid.querySelector(".subcon"));
            }
        }else if(recObj.url && recObj.url=="eventDeleteCurFriend"){
            addAnswerAnimation(recObj.src+":把你从好友中删除了");
            let allFriendslist = queryFriendsByid.querySelectorAll(".frePeople .people li h3");
            if(allFriendslist && allFriendslist.length > 0){
                for (let allFriendslistElement of allFriendslist) {
                    if(allFriendslistElement.innerText==recObj.src){
                        let tempfrePeople = allFriendslistElement.parentElement.parentElement.parentElement;
                        if(tempfrePeople.childElementCount>2){
                            allFriendslistElement.parentElement.parentElement.remove();
                        }else{
                            tempfrePeople.remove();
                        }
                    }
                }
            }
        }else if(recObj.url && recObj.url=="eventChartSendMsg"){
            addAnswerAnimation("接收到源信息来自:"+recObj.src);
            let srcTarUUID = m6DefaultHideTop.getAttribute("data-id");
            //接收到信息通知、并且跟当前的聊天窗口一样的话就追加数据
            if(recObj.srcTarUUID==srcTarUUID){
                let htmlLiElement = document.createElement("li");
                htmlLiElement.innerHTML=`
                        <h5 style="text-align: left;" >${timeFormart(Math.floor(Date.now()/1000)).substring(5)} <i class="bi-three-dots-vertical"></i></h5>
                        <pre style="float: left;" >${replaceImgsrc(recObj.describes)}</pre>`;
                m6DefaultHideCon.appendChild(htmlLiElement);
                m6DefaultHideCon.scrollTo(0,m6DefaultHideCon.scrollHeight);
            }
            let linkMsgView = queryChartsViewsByid.querySelector(`.subContent .group .group-right[data-id='${recObj.srcTarUUID}']`);
            if(linkMsgView){
                //左边有相关的视图 删除 再在最前面插入
                linkMsgView.parentElement.parentElement.remove();
            }
            let htmlDivElement = document.createElement("div");
            htmlDivElement.className="subContent";
            let subStrTemp = recObj.describes.length>82?recObj.describes.substring(0,82)+"...":recObj.describes;
            htmlDivElement.innerHTML=`
                    <div class="group">
                        <div class="group-left">
                            <img src="${recObj.imgPath}" data-id="${recObj.srcTarUUID}" alt="${recObj.src}">
                        </div>
                        <div class="group-right" data-id="${recObj.srcTarUUID}">
                            <div class="msg-title">
                                <h5 class="username">${recObj.src}</h5>
                                <span class="lasttime">${timeFormart(Math.floor(Date.now() / 1000)).substring(5)}</span>
                            </div>
                            <div class="msg-con" title="msg">
                                ${replaceImgsrc(subStrTemp)}
                            </div>
                        </div>
                    </div>
                    <div class="fixed-right" data-id="${recObj.id}">
                        <i class="bi-bookmark-x-fill"></i>
                    </div>`;
            queryChartsViewsByid.insertBefore(htmlDivElement,queryChartsViewsByid.querySelector(".subContent"));
        }else if(recObj.url && recObj.url=="eventApplyFriend"){
            if(recObj.type=="accept"){
                addAnswerAnimation(recObj.src+":接受了你的好友申请");
                let frePeopleh5Ele = queryFriendsByid.querySelector(".frePeople h5");
                if(frePeopleh5Ele && frePeopleh5Ele.innerText=="event"){
                    let temp_ul = document.createElement("ul");
                    temp_ul.className="people";
                    let tempuuid = uuidLow();
                    temp_ul.innerHTML=`
                        <li>
                            <img src="${recObj.imgPath}">
                        </li>
                        <li>
                            <h3>${recObj.src}</h3>
                            <span>${formatDateCur()}</span>
                             <p>${recObj.describes}</p>
                        </li>
                        <li>
                            <i data-id="editFixed1${tempuuid}" data-nk="${recObj.src}" class="bi-three-dots-vertical"></i>
                            <div id="editFixed1${tempuuid}" data-nk="${recObj.src}" class="editFixed noClickdis-none" style="display: none;">
                                <p>add group</p>
                                <p>new message</p>
                                <span></span>
                                <p class="delete-red">delete user</p>
                            </div>
                        </li>`;
                    frePeopleh5Ele.parentElement.appendChild(temp_ul);
                }else{
                    let htmlDivElement = document.createElement("div");
                    htmlDivElement.className="frePeople";
                    let html5Element = document.createElement("h5");
                    html5Element.innerText="event";
                    htmlDivElement.appendChild(html5Element);
                    let temp_ul = document.createElement("ul");
                    temp_ul.className="people";
                    let tempuuid = uuidLow();
                    temp_ul.innerHTML=`
                        <li>
                            <img src="${recObj.imgPath}">
                        </li>
                        <li>
                            <h3>${recObj.src}</h3>
                            <span>${formatDateCur()}</span>
                             <p>${recObj.describes}</p>
                        </li>
                        <li>
                            <i data-id="editFixed1${tempuuid}" data-nk="${recObj.src}" class="bi-three-dots-vertical"></i>
                            <div id="editFixed1${tempuuid}" data-nk="${recObj.src}" class="editFixed noClickdis-none" style="display: none;">
                                <p>add group</p>
                                <p>new message</p>
                                <span></span>
                                <p class="delete-red">delete user</p>
                            </div>
                        </li>`;
                    htmlDivElement.appendChild(temp_ul);
                    queryFriendsByid.insertBefore(htmlDivElement,queryFriendsByid.querySelector(".frePeople"));
                }
            }else if(recObj.type=="reject"){
                addAnswerAnimation(recObj.src+":拒绝了你的好友申请");
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
//初始化调用一次
function getCurrentData() {
    document.getElementById("m1-userDetails").src= docCookies.getItem('web_user_img');
    document.getElementById("img-select").src= docCookies.getItem('web_user_img');
    document.querySelector("#isShowDetails .cons img").src= docCookies.getItem('web_user_img');
    document.querySelector("textarea[name='description']").value=docCookies.getItem('web_user_des');
    if(initQueryFlags==2){
        initSaveConnection();
        objCreateChart();
        objCurrentFriends();
        objAnswerFriends();
        objChartsViews();
    }
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
//查询 msg-view
function objChartsViews(){
    queryChartsViews.uuid=uuid();
    socket.send(JSON.stringify(queryChartsViews));
}
var scrollFlagChartsViews = true;
document.querySelector("#m1Charts>.subTitle>input").oninput=function(e){
    //查询内容变更清理数据 重新查询
    scrollFlagChartsViews = true;
    queryChartsViews.charts.currentPage=1;
    queryChartsViews.charts.nikeName=this.value;
    let elementNodeListOf = document.querySelectorAll("#m1Charts>div.subContent");
    for (let elementNodeListOfElement of elementNodeListOf) {
        elementNodeListOfElement.remove();
    }
    objChartsViews();
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
    }else if(currentActiveId=="m1-charts"){
        if(this.scrollTop + this.clientHeight > queryChartsViewsByid.clientHeight-88 && scrollFlagChartsViews){
            if(queryChartsViews.charts.currentPage<queryChartsViews.charts.totalPage){
                queryChartsViews.charts.currentPage++;
                scrollFlagChartsViews = false;
                objChartsViews();
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
function timeFormart(seconds){
    let str = "";
    if(seconds){
        let date = new Date(seconds*1000);
        let year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes();
        str = year + '-' +
            (month < 10? '0' + month : month) + '-' +
            (day < 10? '0' + day : day) + ' ' +
            (hour < 10? '0' + hour : hour) + ':' +
            (min < 10? '0' + min : min);
    }
    return str;
}
function formatDateCur(){
    let date = new Date();
    let year = date.getFullYear(),
        month = date.getMonth()+1,//月份是从0开始的
        day = date.getDate();
    let newTime = year + '-' +
        (month < 10? '0' + month : month) + '-' +
        (day < 10? '0' + day : day);
    return newTime;
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
                nikeNames:[],
                message:tx||"",
                imgPath:docCookies.getItem('web_user_img')||""
            }
        }
        for (let elementCheckeOfElement of elementCheckeOf) {
            sendObjApplyChart.charts.nikeNames.push(elementCheckeOfElement.getAttribute("data-id"));
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
                message:type,
                imgPath:docCookies.getItem('web_user_img'),
                describes:docCookies.getItem('web_user_des')
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
//聊天视图处理
var scrollFlaghandlerChartsViews = true;
var handlerChartsViews ={
    uuid:"",
    url:"handlerChartsViews",
    src:"handlerChartsViews",
    tar:"handlerChartsViews",
    charts:{
        currentActiveId:"m1-handler-charts-view",
        tokenSession:websktoken,
        nikeName:"",
        message:"",
        currentPage:1,
        totalPage:1
    }
}
m6DefaultHideCon.addEventListener("scroll",function (event) {
    if(this.scrollTop < 88 && scrollFlaghandlerChartsViews){
        if(handlerChartsViews.charts.currentPage<handlerChartsViews.charts.totalPage){
            handlerChartsViews.charts.currentPage++;
            scrollFlaghandlerChartsViews = false;
            socket.send(JSON.stringify(handlerChartsViews));
            console.log("分页执行");
        }
    }
    event.stopPropagation();
},false);
function handlerChartsViewsFun(type,primaryId){
    if(type && primaryId){
        handlerChartsViews.charts.nikeName=primaryId;
        handlerChartsViews.charts.message=type;
        handlerChartsViews.uuid=uuid();
        console.log(type,primaryId);
        socket.send(JSON.stringify(handlerChartsViews));
    }
}
function handlerChartsSendFun(msg,primaryId,Nikenm) {
    //替换特殊字符
    msg = msg.replaceAll('<', '&lt;').replaceAll(">","&gt;");
    if(msg && primaryId && Nikenm){
        let handlerChartsSend ={
            uuid:"",
            url:"handlerChartsSend",
            src:"handlerChartsSend",
            tar:"handlerChartsSend",
            charts:{
                currentActiveId:"m1-handler-charts-send",
                tokenSession:websktoken,
                srcTarUUID:primaryId,
                nikeName:Nikenm,
                message:msg,
                imgPath:docCookies.getItem('web_user_img')
            }
        }
        handlerChartsSend.uuid=uuid();
        console.log(msg,primaryId,Nikenm);
        socket.send(JSON.stringify(handlerChartsSend));
    }
}
function replaceImgsrc(con){
    for(let x=0;x<72;x++){
        if(con.includes(`[img${x}]`)){
            con = con.replaceAll(`[img${x}]`,`<img src="/images/face/${x}.gif" title="img${x}">`);
        }
    }
    return con;
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
//修改用户的描述信息
function userDesUpdate() {
   let desc = document.querySelector("textarea[name='description']").value;
   if(desc){
       let handlerDesUpdate ={
           uuid:"",
           url:"handlerDesUpdate",
           src:"handlerDesUpdate",
           tar:"handlerDesUpdate",
           charts:{
               currentActiveId:"m1-handler-desc-up",
               tokenSession:websktoken,
               message:desc
           }
       }
       handlerDesUpdate.uuid=uuid();
       socket.send(JSON.stringify(handlerDesUpdate));
   }
}
//跑马灯 信息回复提示
let animationMsgRun = document.getElementById("animation_Msg_run");
animationMsgRun.addEventListener('animationend',(ev)=> {
    ev.path = ev.path || ev.composedPath();
    ev.path[0].remove();
    if(animationMsgRun.querySelectorAll(".animation_cylon_eye").length==0){
        animationMsgRun.style.display="none";
    };
});
function addAnswerAnimation(msg){
    if(msg){
        animationMsgRun.style.display="block";
        let dicHtml = document.createElement("div");
        dicHtml.className="animation_cylon_eye";
        dicHtml.innerText=msg;
        animationMsgRun.appendChild(dicHtml);
    }
}
//页面初始完成后发送信息给后端、让后端保存相关数据 [用户、channel]
function initSaveConnection() {
    let initSaveConnection = {
        uuid:"",
        url:"initSaveConnection",
        src:"init",
        tar:"init",
        charts:{
            tokenSession:websktoken
        }
    }
    initSaveConnection.uuid=uuid();
    socket.send(JSON.stringify(initSaveConnection));
}
