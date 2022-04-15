//窗体大小改变事件
window.onresize= function(event) {
    heightCenterLength();
    fixedBottom();
    m6DefaultAutoTop();
};
function heightCenterLength() {
    let currentHeight = document.documentElement.clientHeight;
    document.getElementById("userMain").style.height=currentHeight-6+"px";
};
function fixedBottom() {
/*    可以获得当前元素的上下左右距离视口的距离...有大用了  方法返回元素的大小及其相对于视口的位置。
    如果是标准盒子模型，元素的尺寸等于width/height + padding + border-width的总和
。如果box-sizing: border-box，元素的的尺寸等于 width/height。
*/
    let width = document.querySelector("#addchats").getBoundingClientRect().width;
    let left = document.querySelector("#addchats").getBoundingClientRect().left;
    document.getElementById("fixedBottom").style.left=left+"px";
    document.getElementById("fixedBottom").style.width=width+"px";
}
function m6DefaultAutoTop() {
    let clientHeight = document.documentElement.clientHeight;
    if(clientHeight>70){
        clientHeight = Math.floor((clientHeight -70) / 2);
        document.getElementById("m6DefaultShow").style.marginTop=clientHeight+"px";
    }else{
        document.getElementById("m6DefaultShow").style.marginTop=0;
    }
}
function searchColor(num) {
    if(num){
        document.getElementById("bi-search").style.color="tomato";
    }else {
        document.getElementById("bi-search").style.color="black";
    }
}
function searchColoradd(num) {
    if(num){
        document.getElementById("add-bi-search").style.color="tomato";
    }else {
        document.getElementById("add-bi-search").style.color="black";
    }
}
function searchColorFeiends(num) {
    if(num){
        document.getElementById("fre-bi-search").style.color="tomato";
    }else {
        document.getElementById("fre-bi-search").style.color="black";
    }
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        fixedBottom();
        heightCenterLength();
        m6DefaultAutoTop();
        getCurrentData();
    }
    console.log(document.readyState);
}
document.addEventListener('readystatechange', event => {
    console.log(event.target.readyState);
});
function handleFiles() {
    if (!this.files.length){
       console.log("没有选择文件");
    } else {
        for (let i = 0; i < this.files.length; i++){
            const img = document.createElement("img");
            img.src = URL.createObjectURL(this.files[i]);
            img.onload = function() {
                URL.revokeObjectURL(this.src);
            }
            console.log(this.files[i]);
            document.getElementById("img-select").src=img.src;
            document.getElementById("img-select").onload = function() {
                URL.revokeObjectURL(this.src);
            }
        }
    }
}
const fileElem = document.getElementById("fileInput");
fileElem.addEventListener("change", handleFiles, false);
document.getElementById("fileUserImg").addEventListener("click", function (e) {
    if(fileElem){
        fileElem.click();
    }
    e.stopPropagation();
}, false);
var m1IDS = ["m1-create-chart","m1-friends","m1-charts","m1-notifications","m1-settings"];
var m3IDS = ["addchats","friends","m1Charts","m1Notifications","m1Settings"];
var currentActiveId="m1-charts";
//内容框的焦点定位
var textAreaSelectionStart = 0;
//全局的click事件 再根据当前元素ID处理
document.addEventListener('click', event => {
    let elementsByClassName = document.getElementsByClassName("noClickdis-none");
    for (let paragraph of elementsByClassName) {
        paragraph.style.display="none";
    }

    let dataId = event.path[0].getAttribute("data-id");
    if(dataId && dataId.includes("editFixed")){
        document.getElementById(dataId).style.display="block";
    }else if(dataId && dataId.includes("tright-fixed")){
        document.getElementById(dataId).style.display="block";
        //getBoundingClientRect 方法返回元素的大小及其相对于视口的位置。
        // let number = event.path[0].getBoundingClientRect().top - event.path[1].getBoundingClientRect().top;
        document.getElementById(dataId).style.top="6px";
    }
    //main-1 的图标切换功能
    let mid = event.path[0].id;
    if(m1IDS.includes(mid)){
        for (let xi of m3IDS) {
            document.getElementById(xi).style.display="none";
        }
        for (let xi of m1IDS) {
            document.getElementById(xi).style.color="#95aacc";
        }
        document.getElementById(m3IDS[m1IDS.indexOf(mid)]).style.display="block";
        document.getElementById(mid).style.color="#2787f5";
        if(mid=="m1-create-chart"){
            fixedBottom();
        }
        currentActiveId=mid;
        console.log("当前激活ID",currentActiveId);

    }
    //切换设置 显示隐藏
    if(mid=="account-bt-toggle"){
        let display = document.getElementById("accountSettingBottom").style.display;
        if("none"==display){
            document.getElementById("accountSettingBottom").style.display="block";
        }else{
            document.getElementById("accountSettingBottom").style.display="none";
        }
    }
    //用户详情 中心定位显示 隐藏
    if(mid=="m1-userDetails"){
        document.getElementById("m1UserFixed").style.display="block";
    }else{
        let userDetailsPlay = document.getElementById("m1UserFixed").style.display;
        //用户详情 是否需要隐藏
        if(userDetailsPlay != "none"){
            let pathlength = event.path.length;
            for(let xdt=0;xdt<pathlength;xdt++){
                if(event.path[xdt].id=="isShowDetails"){
                    break;
                }
                if(xdt==pathlength-1){
                    document.getElementById("m1UserFixed").style.display="none";
                }
            }
        }
    }
    //GIF 图片显示隐藏
    if(mid=="showGifFace" || mid=="showGifFace-inner"){
        document.getElementById("faceImgToggle").style.display="block";
    }else{
        let userDetailsPlay = document.getElementById("faceImgToggle").style.display;
        //用户详情 是否需要隐藏
        if(userDetailsPlay != "none"){
            let pathlength = event.path.length;
            for(let xdt=0;xdt<pathlength;xdt++){
                if(event.path[xdt].id=="addFaceImg"){
                    if(event.path[0].tagName=="IMG" && event.path[0].title.includes("img")){
                        let areaValue = document.getElementById("message-send").value;
                        let rtValue = "";
                        let imgTitle = `[${event.path[0].title}]`;
                        if(areaValue.length==0){
                            document.getElementById("message-send").value=imgTitle;
                        }else if(areaValue.length==textAreaSelectionStart){
                            document.getElementById("message-send").value=areaValue+imgTitle;
                        }else{
                            for(let xm=0;xm<areaValue.length;xm++){
                                if(xm==textAreaSelectionStart){
                                    rtValue+=imgTitle;
                                }
                                rtValue+=areaValue[xm];
                            }
                            document.getElementById("message-send").value=rtValue;
                        }
                        document.getElementById("message-send").scrollTo( 0, 1);
                        // textAreaSelectionStart+=imgTitle.length;
                        break;
                    }
                }
                if(event.path[xdt].id=="faceImgToggle"){
                    break;
                }
                if(xdt==pathlength-1){
                    document.getElementById("faceImgToggle").style.display="none";
                }
            }
        }
    }
    //发送数据
    if(mid=="userSendMsg" || mid=="userSendMsg-inner"){
        document.getElementById("message-send").value="";
        document.getElementById("message-send").style.height="auto";
        document.getElementById("faceImgToggle").style.bottom ="56px";
        textAreaSelectionStart=0;
    }
    if(mid=="message-send"){
        textAreaSelectionStart=event.path[0].selectionStart;
    }

    //添加好友的弹出框
    if(mid=="fixedBottom"){
        document.getElementById("addchatsFixed").style.display="block";
        let htmlclientHeight = document.documentElement.clientHeight;
        let addchatsFixedclientHeight = document.getElementById("addchatsFixed").clientHeight;
        if(htmlclientHeight < addchatsFixedclientHeight){
            document.getElementById("addchatsFixed").style.top=0;
        }else{
            document.getElementById("addchatsFixed").style.top=(htmlclientHeight*0.5)-(addchatsFixedclientHeight*0.5)+"px";
        }
    }else if(mid=="addchatsFixedExit"){
        document.getElementById("addchatsFixed").style.display="none";
    }else if(mid=="addchatsFixedSuccess"){
        document.getElementById("addchatsFixed").style.display="none";
        let valus = document.querySelector("#addchatsFixed textarea").value;
        sendFriendsApply(valus);
        document.querySelector("#addchatsFixed textarea").value="";
    }

    //好友申请的处理方法
    if(event.path[1].id.includes("tright-fixed-")){
        handlerApplyFriends(event.path[0].innerText ,event.path[1].getAttribute("data-nk"));
    }

});
//全局的拖拽事件
document.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if(event.path[0].id=="fileUserImg" || event.path[1].id=="fileUserImg"){
        let files = event.dataTransfer.files;
        if(files[0] && files[0].type.includes("image/")){
            const img = document.createElement("img");
            img.src = URL.createObjectURL(files[0]);
            img.onload = function() {
                URL.revokeObjectURL(this.src);
            }
            document.getElementById("img-select").src=img.src;
            document.getElementById("img-select").onload = function() {
                URL.revokeObjectURL(this.src);
            }
        }
    }
}, false);
//textarea 自增加高度
document.getElementById("message-send").addEventListener("scroll", function(event) {
    event.path[0].style.height = event.path[0].scrollHeight+"px";
    console.log("scroll");
    document.getElementById("faceImgToggle").style.bottom = (event.path[0].scrollHeight+38)+"px";
    event.preventDefault();
    event.stopPropagation();
}, false);

var addFaceImg = document.getElementById("addFaceImg");
for(let x=0;x<72;x++){
    let faceImg = document.createElement("img");
    faceImg.src=`../images/face/${x}.gif`;
    faceImg.title=`img${x}`;
    addFaceImg.appendChild(faceImg);
}
document.getElementById("message-send").oninput=function(eee){
    textAreaSelectionStart=this.selectionStart;
    //触发scroll事件
    document.getElementById("message-send").scrollTo( 0, 1);
}
