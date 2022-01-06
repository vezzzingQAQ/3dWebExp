/*
V3D HUD动画：
进入通过CSS动画
退出依靠...Out函数，同时自动删除对象
*/
var isRemovingHUD=false;//是否正在移除HUD对象，避免多次移除同一个对象

function fadeOut(obj,time){
    let count=0;
    let d_opacity=1/time
    let fadeouti=setInterval(function(){
        count++;
        if(count>time){
            document.querySelector(".hudLayer").removeChild(obj);
            isRemovingHUD=false;
            clearInterval(fadeouti);
        }
        obj.style.opacity-=d_opacity;
    },1);
}
function editHUDobject(name,id,discribeObj,aom/*true/false制定移除或插入*/){
    switch(id){
        case 11:
            if(aom){
                let htmlTemp=`
                <div id="t${name}" class="t11HUD centerHUDp">
                    <p class="author">by ${discribeObj.acobj.author}</p>
                    <br>
                    <p class="date">at ${discribeObj.acobj.date}</p>
                    <br>
                    <pre class="code">${discribeObj.toDisplayStr()}</pre>
                </div>
                `;
                document.querySelector(".hudLayer").innerHTML+=htmlTemp;
            }else{
                let child=document.getElementById("t"+name);
                isRemovingHUD=true;
                fadeOut(child,10);
            }
            break;
    }
}