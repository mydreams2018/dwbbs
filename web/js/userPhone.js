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
   }
}

document.addEventListener("click", function(event) {
    //main-1 的图标切换功能
    let mid = event.path[0].id;
    if(m1IDS.includes(mid)){
        phoneCssHandler();
    }
}, false);