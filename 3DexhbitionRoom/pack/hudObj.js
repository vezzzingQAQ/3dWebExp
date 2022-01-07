// ********************************************************
// V3D HUD动画：
// 进入通过CSS动画
// 退出依靠...Out函数，同时自动删除对象
// ********************************************************

var isRemovingHUD=false;//是否正在移除HUD对象，避免多次移除同一个对象

/**
 * 淡出HUD屏
 * @param {HTMLElement} obj 要淡出的DOM物体
 * @param {number} time 淡出的持续时间
 */
function fadeOut(obj,time){
    console.log(obj)
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

/**
 * 控制HUD对象
 * @param {string} name 对应RoomObj的name属性，用于指定HUD屏的ID
 * @param {number} id 对应RoomObj的Type属性，用于区分不同的RoomObj类型
 * @param {{}} discribeObj 描述对象，通常传入函数对象的acobj，记录作者、日期、名字等信息
 * @param {boolean} aom 指定是移入还是移出：true->移入 ; false->移出
 */
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