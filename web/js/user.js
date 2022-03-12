//窗体大小改变事件
window.onresize=function(event) {
    heightCenterLength();
    fixedBottom();
};
function heightCenterLength() {
    var currentHeight = document.documentElement.clientHeight;
    document.getElementById("userMain").style.height=currentHeight-6+"px";
};
function fixedBottom() {
    //可以获得当前元素的上下左右距离视口的距离...有大用了
    let width = document.getElementById("addchats").getBoundingClientRect().width;
    let left = document.getElementById("addchats").getBoundingClientRect().left;
    document.getElementById("fixedBottom").style.left=left+"px";
    document.getElementById("fixedBottom").style.width=width+"px";
}
heightCenterLength();

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
fixedBottom();