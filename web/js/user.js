//窗体大小改变事件
window.onresize=function(event) {
    heightCenterLength();
};
function heightCenterLength() {
    var currentHeight = document.documentElement.clientHeight;
    console.log(currentHeight);
    document.getElementById("userMain").style.height=currentHeight-6+"px";
};
heightCenterLength();

function searchColor(num) {
    if(num){
        document.getElementById("bi-search").style.color="tomato";
    }else {
        document.getElementById("bi-search").style.color="black";
    }
}