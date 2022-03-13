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

//全局的click事件 再根据当前元素ID处理
document.addEventListener('click', event => {
    let id = event.path[0].id;
    if("editFixedChange" == id){
        document.getElementById("editFixed").style.display="block";
    }else{
        document.getElementById("editFixed").style.display="none";
    }
});