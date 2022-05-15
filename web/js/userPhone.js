//初始化 、 onresize 事件触发
function phoneCssHandler() {
   let bodyWidth = document.body.offsetWidth;
   if(bodyWidth <= 900){
       let mainElement = document.querySelector("#userMain");
       let elementm3 = mainElement.querySelector(".main-3");
       let elementm6 = mainElement.querySelector(".main-6");
       if(elementm3.style.display != "none" ){
           elementm6.style.display = "none";
           for (let child of elementm3.children) {
               if(child.style.display!="none"){
                   if(child.id=="addchats"){
                       document.getElementById("fixedBottom").style.bottom="63px";
                       child.style.paddingBottom="110px";
                   }else{
                       child.style.paddingBottom="60px";
                   }

               }
           }
       }
       if(bodyWidth>700){
           let userisShowDetails = document.getElementById("isShowDetails");
           userisShowDetails.style.width="60%";
           userisShowDetails.style.marginLeft="20%";
       }else{
           let userisShowDetails = document.getElementById("isShowDetails");
           userisShowDetails.style.width="70%";
           userisShowDetails.style.marginLeft="15%";
       }
       document.getElementById("phone-show").style.display="";
       if(bodyWidth < 500){
           m6DefaultHideTop.querySelector("img").style.maxWidth="20%";
           m6DefaultHideTop.querySelector("h3").style.left="23%";
       }
   }else{
       let mainElement = document.querySelector("#userMain");
       let elementm3 = mainElement.querySelector(".main-3");
       for (let child of elementm3.children) {
           if(child.id=="addchats"){
               document.getElementById("fixedBottom").style.bottom="10px";
               child.style.paddingBottom="58px";
           }
           else{
               child.style.paddingBottom="0";
           }
       }
       let elementm6=mainElement.querySelector(".main-6");
       elementm6.style.display = "block";
       let userisShowDetails = document.getElementById("isShowDetails");
       userisShowDetails.style.width="36%";
       userisShowDetails.style.marginLeft="32%";
       elementm3.style.display="block";
       mainElement.querySelector(".main-1").style.display="block";
       document.getElementById("phone-show").style.display="none";
       m6DefaultHideTop.querySelector("img").style.maxWidth="10%";
       m6DefaultHideTop.querySelector("h3").style.left="13%";
   }
}

document.addEventListener("click", function(event) {
    //main-1 的图标切换功能
    let mid = event.path[0].id;
    if(m1IDS.includes(mid)){
        phoneCssHandler();
    }
    //查询聊天视图 关联的聊天内容
    if(event.path[0].className=="msg-con" && event.path[4].id=="m1Charts"){
        toggleM3M6();
    }
    if(event.path[0].id=="phone-show"){
        backm1m3();
    }
}, false);

// phone 端的话 需要隐藏m3-m1 显示m6 区域
function toggleM3M6() {
    let bodyWidth = document.body.offsetWidth;
    if (bodyWidth <= 900) {
        let mainElement = document.querySelector("#userMain");
        let elementm1 = mainElement.querySelector(".main-1");
        let elementm3 = mainElement.querySelector(".main-3");
        let elementm6 = mainElement.querySelector(".main-6");
        elementm1.style.display="none";
        elementm3.style.display="none";
        elementm6.style.display="block";
    }
}
function backm1m3() {
    let bodyWidth = document.body.offsetWidth;
    if (bodyWidth <= 900) {
        let mainElement = document.querySelector("#userMain");
        let elementm1 = mainElement.querySelector(".main-1");
        let elementm3 = mainElement.querySelector(".main-3");
        let elementm6 = mainElement.querySelector(".main-6");
        elementm1.style.display="block";
        elementm3.style.display="block";
        elementm6.style.display="none";
    }
}
