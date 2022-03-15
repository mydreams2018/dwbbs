//窗体大小改变事件
window.onresize= function(event) {
    heightCenterLength();
    fixedBottom();
};
function heightCenterLength() {
    var currentHeight = document.documentElement.clientHeight;
    document.getElementById("userMain").style.height=currentHeight-6+"px";
};
function fixedBottom() {
    //可以获得当前元素的上下左右距离视口的距离...有大用了
    let width = document.querySelector("#addchats").getBoundingClientRect().width;
    let left = document.querySelector("#addchats").getBoundingClientRect().left;
    document.getElementById("fixedBottom").style.left=left+"px";
    document.getElementById("fixedBottom").style.width=width+"px";
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
    e.preventDefault();
}, false);
var m1IDS = ["m1-create-chart","m1-friends","m1-charts","m1-notifications","m1-settings"];
var m3IDS = ["addchats","friends","m1Charts","m1Notifications","m1Settings"];
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
        let number = event.path[0].getBoundingClientRect().top - event.path[1].getBoundingClientRect().top;
        document.getElementById(dataId).style.top=number+"px";
    }
    //main-1 的图标切换功能
    let mid = event.path[0].id;
    if(m1IDS.includes(mid)){
        for (let xi of m3IDS) {
            document.getElementById(xi).style.display="none";
        }
        document.getElementById(m3IDS[m1IDS.indexOf(mid)]).style.display="block";
        if(mid=="m1-create-chart"){
            fixedBottom();
        }
    }
});