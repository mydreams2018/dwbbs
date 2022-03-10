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