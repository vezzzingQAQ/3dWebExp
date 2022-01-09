// ********************************************************
// V3D 房间内的物品：
// 封装函数来修改objects.objectsList
// ********************************************************

class VBasicObject{
    /**
     * 所有物体的父类
     * @param {string} name 名称
     * @param {{x:number,y:number,z:number}} position 位置
     * @param {{x:number,y:number,z:number}|null} rotation 旋转
     */
    constructor(name,position,rotation=null){
        this.name=name;
        this.position=position;
        this.rotation=rotation;
    }
}

class VP5Object extends VBasicObject{
    /**
     * 可以用P5绘制样式的物体
     * @param {string} name 名称
     * @param {{x:number,y:number,z:number}} position 位置
     * @param {{x:number,y:number,z:number}} size 大小
     * @param {Array<number>|null} stroke P5-stroke值
     * @param {number} strokeWeight P5-strokeWeight值
     * @param {Array<number>|null} fill P5-fill值
     * @param {{x:number,y:number,z:number}|null} rotation 旋转
     */
    constructor(name,position,size,stroke=[100],strokeWeight=1,fill=null,rotation=null){
        super(name,position,rotation);
        this.size=size;
        this.stroke=stroke;
        this.strokeWeight=strokeWeight;
        this.fill=fill;
    }
    displayP5(){
        if(this.stroke!=null){
            strokeWeight(this.strokeWeight);
            stroke.apply(this.stroke);
        }
        if(this.fill!=null){
            fill.apply(this.fill);
        }
    }
}

class VAnimationObject extends VP5Object{
    /**
     * 有动画的Vobject
     * @param {string} name 名称
     * @param {{x:number,y:number,z:number}} position 位置
     * @param {{x:number,y:number,z:number}} size 大小
     * @param {(t:number)=>void} fchange 动画函数
     * @param {{}} paraList 参数列表对象
     * @param {Array<number>|null} stroke P5-stroke值
     * @param {number} strokeWeight P5-strokeWeight值
     * @param {Array<number>|null} fill P5-fill值
     * @param {{x:number,y:number,z:number}|null} rotation 旋转
     */
    constructor(name,position,size,fchange,paraList={},stroke=[100],strokeWeight=2,fill=[0],rotation=null){
        super(name,position,size,stroke,strokeWeight,fill,rotation);
        this.fchange=fchange;
    }
}

class VAnimationCube extends VAnimationObject{
    /**
     * 有动画的长方体
     * @param {string} name 名称
     * @param {{x:number,y:number,z:number}} position 位置
     * @param {{x:number,y:number,z:number}} size 大小
     * @param {(t:number,obj:Object)=>void} fchange 动画函数
     * @param {{}} paraList 参数列表对象
     * @param {Array<number>|null} stroke P5-stroke值
     * @param {number} strokeWeight P5-strokeWeight值
     * @param {Array<number>|null} fill P5-fill值
     * @param {{x:number,y:number,z:number}|null} rotation 旋转
     */
    constructor(name,position,size,fchange,paraList,stroke=[100],strokeWeight=2,fill=[0],rotation=null){
        super(name,position,size,fchange,paraList,stroke,strokeWeight,fill,rotation);
    }
    display(t){
        push();
        translate(this.position.x,this.position.y,this.position.z);
        super.fchange(t,this);
        super.super.displayP5();
        box(this.size.x,this.size.y,this.size.z);
        pop();
    }
}

/**
 * 
 * @param {{x:number,z:number}} param0 玩家的位置 
 * @param {{background:Array<number>}} param1 全局参数
 * @returns 
 */
 function initStruc({x=0,z=0},{background=[0]}){
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
                "bumpR":120
            },
            global:{
                background:background
            },
            objectsList:[
        
            ]        
        }
    );
}

function initBasicGround(xsize=2000,xcount=20,zsize=2000,zcount=20,f=(t,obj)=>{
    let zv=Math.sin(obj.paraList.x*obj.paraList.z+t/10);
    obj.size.y=(zv+1)*10;
},stroke=[100],strokeWeight=3,fill=[0],plRatiox=1,plRatioz=1){
    for(let x=-xcount/2;x<xcount/2;x++){
        for(let z=-zcount/2;z<zcount/2;z++){
            let currentBlock=new VAnimationCube(
                "ground",
                {
                    x:x*(xsize/xcount),
                    z:z*(zsize/zcount),
                    y:-50,
                },
                {
                    x:xsize/xcount,
                    z:zsize/zcount,
                    y:100,
                },
                f,
                {//携带的参数列表
                    x:x/plRatiox,
                    z:z/plRatioz,
                },
                stroke,strokeWeight,fill,null
            );
            objects.objectsList.push(currentBlock);
        }
    }    
}
