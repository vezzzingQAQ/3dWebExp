// ********************************************************
// V3D 房间内的物品：
// 封装函数来修改objects.objectsList
// ********************************************************

/**
 * 
 * @param {{x:number,z:number}} param0 玩家的位置 
 * @param {{background:Array<number>}} param1 全局参数
 * @returns 
 */
function initStruc({x=0,z=0,ud=false},{background=[0]}){
    return(
        {
            player:{
                "startPosition":{
                    "x":x,
                    "z":z,
                    "y":0
                },
                "height":170,
                "moveSpeed":10,
                "moveHeightRange":9,
                "bumpR":120,
                "ud":ud,
            },
            global:{
                background:background
            },
            objectsList:[
        
            ]        
        }
    );
}

/**
 * 生成基本的长方体
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {{x:number,y:number,z:number}} size 大小
 * @param {{x:number,y:number,z:number}|null} bump 碰撞盒
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {{x:number,y:number,z:number}|null} rotation 旋转量
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {{}} paraList 携带的参数列表
 */
function initCube(name,position,size,bump=null,stroke=[200],strokeWeight=1,fill=null,rotation=null,f=null,paraList={}){
    let currentBlock={
        name:name,
        type:1,//1标准长方体
        position:position,
        rotation:rotation,
        size:size,
        strokeWeight:strokeWeight,
        stroke:stroke,
        fill:fill,
        paraList:paraList,
    }
    if(bump!=null){
        currentBlock.bump={size:bump};
    }
    if(f!=null){
        currentBlock.change=(t)=>{
            f(t,currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成基本的球体
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {{r:number}} size 大小
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {{x:number,y:number,z:number}|null} rotation 旋转量
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {{}} paraList 携带的参数列表
 */
function initSphere(name,position,size,stroke=[200],strokeWeight=1,fill=null,rotation=null,f=null,paraList={}){
    let currentBlock={
        name:name,
        type:2,//2标准球体
        position:position,
        rotation:rotation,
        size:size,
        strokeWeight:strokeWeight,
        stroke:stroke,
        fill:fill,
        paraList:paraList,
    }
    if(f!=null){
        currentBlock.change=(t)=>{
            f(t,currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成基本的圆锥
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {{r:number,h:number}} size 大小
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {{x:number,y:number,z:number}|null} rotation 旋转量
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {{}} paraList 携带的参数列表
 */
function initCone(name,position,size,stroke=[200],strokeWeight=1,fill=null,rotation=null,f=null,paraList={}){
    let currentBlock={
        name:name,
        type:3,//3标准圆锥
        position:position,
        rotation:rotation,
        size:size,
        strokeWeight:strokeWeight,
        stroke:stroke,
        fill:fill,
        paraList:paraList,
    }
    if(f!=null){
        currentBlock.change=(t)=>{
            f(t,currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成基本的圆柱
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {{r:number,h:number}} size 大小
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {{x:number,y:number,z:number}|null} rotation 旋转量
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {{}} paraList 携带的参数列表
 */
 function initCylinder(name,position,size,stroke=[200],strokeWeight=1,fill=null,rotation=null,f=null,paraList={}){
    let currentBlock={
        name:name,
        type:4,//4标准圆柱
        position:position,
        rotation:rotation,
        size:size,
        strokeWeight:strokeWeight,
        stroke:stroke,
        fill:fill,
        paraList:paraList,
    }
    if(f!=null){
        currentBlock.change=(t)=>{
            f(t,currentBlock);
        }
    }
    objects.objectsList.push(currentBlock);
}

/**
 * 生成2D函数式地板
 * @param {number} xsize x方向边长
 * @param {number} xcount x方向的切分数量
 * @param {number} zsize z方向边长
 * @param {number} zcount z方向的切分数量
 * @param {number} centerX x方向中心点位置
 * @param {number} centerZ z方向中心点位置
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {number} plRatiox x方向缩放比例
 * @param {number} plRatioz z方向缩放比例
 */
function initBasicFunctionGround(xsize=2000,xcount=20,zsize=2000,zcount=20,centerX=0,centerZ=0,f=null,stroke=[100],strokeWeight=3,fill=objects.global.background,plRatiox=1,plRatioz=1){
    for(let x=centerX-xsize/2;x<centerX+xsize/2;x+=xsize/xcount){
        for(let z=centerZ-zsize/2;z<centerZ+zsize/2;z+=zsize/zcount){
            initCube(
                "ground",
                {
                    x:x,
                    z:z,
                    y:-50,
                },
                {
                    x:xsize/xcount,
                    z:zsize/zcount,
                    y:100,
                },
                null,
                stroke,
                strokeWeight,
                fill,
                null,
                f,
                {
                    x:(x-centerX)/plRatiox,
                    z:(z-centerZ)/plRatioz,
                }
            );
        }
    }    
}

/**
 * 生成2D函数式天花板
 * @param {number} xsize x方向边长
 * @param {number} xcount x方向的切分数量
 * @param {number} zsize z方向边长
 * @param {number} zcount z方向的切分数量
 * @param {number} centerX x方向中心点位置
 * @param {number} centerZ z方向中心点位置
 * @param {number} height 天花板初始离地高度【有动效的话在函数f里设置】
 * @param {(t:number,obj:object)=>void|null} f 动效函数，obj是自身this
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {number} plRatiox x方向缩放比例
 * @param {number} plRatioz z方向缩放比例
 */
function initBasicFunctionCelling(xsize=2000,xcount=20,zsize=2000,zcount=20,centerX=0,centerZ=0,height=1300,f=null,stroke=[100],strokeWeight=3,fill=objects.global.background,plRatiox=2,plRatioz=2){
    for(let x=centerX-xsize/2;x<centerX+xsize/2;x+=xsize/xcount){
        for(let z=centerZ-zsize/2;z<centerZ+zsize/2;z+=zsize/zcount){
            initCube(
                "celling",
                {
                    x:x,
                    z:z,
                    y:height,
                },
                {
                    x:xsize/xcount,
                    z:zsize/zcount,
                    y:100,
                },
                null,
                stroke,
                strokeWeight,
                fill,
                null,
                f,
                {
                    x:(x-centerX)/plRatiox,
                    z:(z-centerZ)/plRatioz,
                    height:height,
                },
            );
        }
    }    
}

/**
 * 生成基本的墙
 * @param {number} wallHeight 墙的高度
 * @param {number} sizex 墙在X方向的长度
 * @param {number} sizez 墙在Z方向的长度
 * @param {Array<number>|null} stroke P5-stroke
 * @param {Array<number>|null} fill P5-fill
 */
function initCalWall(wallHeight=2200,sizex=2000,sizez=2000,stroke,fill){
    objects.objectsList.push(
        {
            name:"wall1",
            type:1,//1标准长方体
            position:{//中心点位置
                x:-sizex/2,
                z:0,
                y:wallHeight/2,
            },
            size:{
                x:97,
                z:sizez,
                y:wallHeight,
            },
            stroke:stroke,
            fill:fill,
            bump:{//立方体碰撞盒
                size:{
                    x:90,
                    z:sizez,
                    y:wallHeight,
                },
            }
        }
    );
    objects.objectsList.push(
        {
            name:"wall2",
            type:1,//1标准长方体
            position:{//中心点位置
                x:sizex/2,
                z:0,
                y:wallHeight/2,
            },
            size:{
                x:97,
                z:sizez,
                y:wallHeight,
            },
            stroke:stroke,
            fill:fill,
            bump:{//立方体碰撞盒
                size:{
                    x:90,
                    z:sizez,
                    y:wallHeight,
                },
            }
        }
    );
    objects.objectsList.push(
        {
            name:"wall3",
            type:1,//1标准长方体
            position:{//中心点位置
                x:0,
                z:-sizez/2,
                y:wallHeight/2,
            },
            size:{
                x:sizex,
                z:97,
                y:wallHeight,
            },
            stroke:stroke,
            fill:fill,
            bump:{//立方体碰撞盒
                size:{
                    x:sizex,
                    z:90,
                    y:wallHeight,
                },
            }
        }
    );
    objects.objectsList.push(
        {
            name:"wall4",
            type:1,//1标准长方体
            position:{//中心点位置
                x:0,
                z:sizez/2,
                y:wallHeight/2,
            },
            size:{
                x:sizex,
                z:97,
                y:wallHeight,
            },
            stroke:stroke,
            fill:fill,
            bump:{//立方体碰撞盒
                size:{
                    x:sizex,
                    z:90,
                    y:wallHeight,
                },
            }
        }
    );
}

/**
 * 生成基本墙四周的支柱
 * @param {number} wallHeight 墙的高度
 * @param {number} sizex x方向长度
 * @param {number} sizez z方向长度
 * @param {Array<number>|null} strokeColor P5-stroke值
 * @param {Array<number>|null} fillColor P5-fill值
 */
function initCalWallBlocks(wallHeight=2200,sizex=2000,sizez=2000,strokeColor,fillColor){
    objects.objectsList.push(
        {
            name:"z1",
            type:1,//1标准长方体
            position:{//中心点位置
                x:-sizex/2,
                z:sizez/2,
                y:wallHeight/2,
            },
            size:{
                x:97,
                z:97,
                y:wallHeight,
            },
            stroke:strokeColor,
            fill:fillColor,
        }
    );
    objects.objectsList.push(
        {
            name:"z2",
            type:1,//1标准长方体
            position:{//中心点位置
                x:sizex/2,
                z:sizez/2,
                y:wallHeight/2,
            },
            size:{
                x:97,
                z:97,
                y:wallHeight,
            },
            stroke:strokeColor,
            fill:fillColor,
        }
    );
    objects.objectsList.push(
        {
            name:"z2",
            type:1,//1标准长方体
            position:{//中心点位置
                x:sizex/2,
                z:-sizez/2,
                y:wallHeight/2,
            },
            size:{
                x:97,
                z:97,
                y:wallHeight,
            },
            stroke:strokeColor,
            fill:fillColor,
        }
    );
    objects.objectsList.push(
        {
            name:"z2",
            type:1,//1标准长方体
            position:{//中心点位置
                x:-sizex/2,
                z:-sizez/2,
                y:wallHeight/2,
            },
            size:{
                x:97,
                z:97,
                y:wallHeight,
            },
            stroke:strokeColor,
            fill:fillColor,
        }
    );
}

/**
 * 生成展示屏
 * @param {number} type 类型  
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {boolean} heading 朝向：true->z ; false->x
 * @param {TdFunction} fuc 展示的函数对象
 * @param {number} sw 宽度
 * @param {number} sh 高度
 * @param {number} sz 厚度
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {number} enterLen HUD显示的检测区长度
 * @param {Array<number>|null} enterStroke 进入HUD显示区时的描边颜色
 */
function initDisplayScreen(type,name,position,heading,fuc,sw=300,sh=300,sz=20,stroke=[200],strokeWeight=1,fill=null,enterLen=300,enterStroke=null){
    let size,displayCubeSize;
    if(heading){
        size={x:sw,z:sz,y:sh};
        displayCubeSize={x:sw,z:0,y:sh};
    }else{
        size={x:sz,z:sw,y:sh};
        displayCubeSize={x:0,z:sw,y:sh};
    }
    objects.objectsList.push(
        {
            name:name,
            heading:heading,
            type:type,//11展示屏
            position:position,

            originPosition:position,//保存初始位置
            size:size,
            displayCubeSize:displayCubeSize,
            fuc:fuc,
            stroke:stroke,
            strokeWeight:strokeWeight,
            fill:fill,

            enterLen:enterLen,

            enterStroke:enterStroke,

            bump:{
                size:size
            },
            checkInShowArea:function(){//检测玩家是否进入检测区
                let len=this.enterLen;
                let x=player.x;
                let z=player.z;
                if(player.thetaeh<0.38 && player.thetaeh>-0.38){
                    if(this.heading){
                        if((x<this.position.x+this.size.x/2 && x>this.position.x-this.size.x/2) && (abs(cos(player.thetarw))<0.6)){
                            if(z<this.position.z+len && z>this.position.z){
                                if(sin(player.thetarw)>0) return true; else return false;
                            }else if(z>this.position.z-len && z<this.position.z){
                                if(sin(player.thetarw)<0) return true;else return false;
                            }else{
                                return false;
                            }
                        }else{
                            return false;
                        }
                    }else{
                        if((z<this.position.z+this.size.z/2 && z>this.position.z-this.size.z/2) && (abs(cos(PI/2-player.thetarw))<0.6)){
                            if(x<this.position.x+len && x>this.position.x){
                                if(cos(player.thetarw)<0) return true; else return false;
                            }else if(x>this.position.x-len && x<this.position.x){
                                if(cos(player.thetarw)>0) return true; else return false;
                            }else{
                                return false;
                            }
                        }else{
                            return false;
                        }
                    }
                }
            },
            playerEnter(){//检测玩家进入，如果玩家在行走，就不显示
                let x=player.x;
                let z=player.z;
                if(this.checkInShowArea(x,z)){
                    if(!player.isWalking && this.enterStroke!=null){
                        this.stroke=this.enterStroke;
                    }
                }else{
                    this.stroke=[200];
                }
            },
            showHUD:function(){//显示HUD界面，玩家停下来才能看到
                let x=player.x;
                let z=player.z;
                if(!player.isWalking && this.checkInShowArea(x,z) && document.getElementById("t"+this.name)==undefined){
                    editHUDobject(this.name,this.type,this.fuc,true);
                }else if(!isRemovingHUD && !this.checkInShowArea(x,z) && document.getElementById("t"+this.name)!=undefined){
                    editHUDobject(this.name,this.type,this.fuc,false);
                }
            },
        }
    );
}

/**
 * 显示基本T11的展示屏
 * @param {string} name 名称【不能重复】
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {boolean} heading 朝向：true->z ; false->x
 * @param {TdFunction} fuc 展示的函数对象
 * @param {Array<number>|null} enterStroke 玩家进入HUD显示区时描边变色
 */
function initBasicDisplayScreen(name,position,heading,fuc,enterStroke=null){
    initDisplayScreen(11,name,position,heading,fuc,300,300,20,[200],1,null,300,enterStroke);
}

/**
 * 生成展示柜
 * @param {number} type 类型
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {GlFunction} fuc 展示的函数对象 
 * @param {{x:number,y:number,z:number}} sizeBase 底座大小
 * @param {{x:number,y:number,z:number}} sizeBox 展示盒大小
 * @param {Array<number>|null} stroke P5-stroke值
 * @param {number} strokeWeight P5-strokeWeight值
 * @param {Array<number>|null} fill P5-fill值
 * @param {number} enterR HUD显示区半径
 * @param {Array<number>|null} enterStroke 进入HUD显示区时的描边颜色
 */
function initDisplayBox(type,name,position,fuc,sizeBase,sizeBox,stroke=[200],strokeWeight=1,fill=null,enterR=300,enterStroke=null){
    objects.objectsList.push(
        {
            name:name,
            type:type,
            position:position,
            enterR:enterR,
            size:{
                x:sizeBase.x,
                z:sizeBase.z,
                y:sizeBase.y,
            },
            displayBoxSize:{//立体展柜特有
                x:sizeBox.x,
                z:sizeBox.z,
                y:sizeBox.y,
            },
            fuc:fuc,
            stroke:stroke,
            strokeWeight:strokeWeight,
            fill:fill,

            enterStroke:enterStroke,

            bump:{
                size:{
                    x:sizeBox.x,
                    z:sizeBox.z,
                    y:sizeBox.y,
                }
            },
            checkInShowArea:function(){//检测玩家是否进入检测区
                let len=this.enterR;
                let x=player.x;
                let z=player.z;
                if(player.thetaeh<0.38 && player.thetaeh>-0.38){
                    if(Math.sqrt((x-this.position.x)*(x-this.position.x)+(z-this.position.z)*(z-this.position.z))<len){
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            playerEnter(){//检测玩家进入，如果玩家在行走，就不显示
                let x=player.x;
                let z=player.z;
                if(this.checkInShowArea(x,z)){
                    if(!player.isWalking && this.enterStroke!=null){
                        this.stroke=this.enterStroke;
                    }
                }else{
                    this.stroke=[200];
                }
            },
            showHUD:function(){//显示HUD界面，玩家停下来才能看到
                let x=player.x;
                let z=player.z;
                if(!player.isWalking && this.checkInShowArea(x,z) && document.getElementById("t"+this.name)==undefined){
                    editHUDobject(this.name,this.type,this.fuc,true);
                }else if(!isRemovingHUD && !this.checkInShowArea(x,z) && document.getElementById("t"+this.name)!=undefined){
                    editHUDobject(this.name,this.type,this.fuc,false);
                }
            },
        },        
    );
}

/**
 * 生成基本的T21展示柜
 * @param {string} name 名称
 * @param {{x:number,y:number,z:number}} position 位置
 * @param {GlFunction} fuc 展示的函数对象 
 * @param {{x:number,y:number,z:number}} sizeBase 底座大小
 * @param {{x:number,y:number,z:number}} sizeBox 展示盒大小
 * @param {Array<number>|null} enterStroke 进入HUD显示区时的描边颜色
 */
function initBasicDisplayBox(name,position,fuc,sizeBase,sizeBox,enterStroke=null){
    initDisplayBox(21,name,position,fuc,
        sizeBase,
        sizeBox,
        [200],1,null,330,enterStroke);
}