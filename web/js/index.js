//窗体大小改变事件
window.onresize=function(event) {
    heightCenter();
};
function heightCenter() {
    var currentHeight = document.documentElement.clientHeight;
    // var currentWidth = document.documentElement.clientWidth;
    if(currentHeight < 460){
        document.getElementById("container-login").style.top='0px';
    }else{
        document.getElementById("container-login").style.top=currentHeight / 2 - 230+'px';
    }
};
heightCenter();
document.getElementById("subUser").addEventListener("mousedown", function( event ) {
    // 在被点击的div内显示当前被点击次数
    //  event.target.textContent = "click count: " + event.detail;
    event.currentTarget.style.transform="scale(0.9)";
}, false);
document.getElementById("subUser").addEventListener("mouseup", function( event ) {
    // 在被点击的div内显示当前被点击次数
    event.currentTarget.style.transform="scale(1)";
}, false);