function initStruc(){
    return(
        {
            objectsList:[
        
            ]        
        }
    );
}
function initBasicGround(xsize=2000,xcount=20,zsize=2000,zcount=20,f=(t,obj)=>{
        let zv=Math.sin(obj.paraList.x*obj.paraList.z+t/10);
        obj.stroke=[
            zv*120+120,
            120-zv*120,
            zv*60+60,
        ];
        obj.strokeWeight=(zv+1)*10;
},plRatiox=1,plRatioy=1){
    for(let x=-xcount/2;x<xcount/2;x++){
        for(let z=-zcount/2;z<zcount/2;z++){
            objects.objectsList.push(
                {
                    name:"ground",
                    type:1,//1标准长方体
                    paraList:{//携带的参数列表
                        x:x/plRatiox,
                        z:z/plRatioy,
                    },
                    position:{
                        x:x*(xsize/xcount),
                        z:z*(zsize/zcount),
                        y:-50,
                    },
                    size:{
                        x:xsize/xcount,
                        z:zsize/zcount,
                        y:100,
                    },
                    strokeWeight:10,
                    stroke:[100],
                    fill:[0],
                    change(t){
                        //console.log(this);
                        f(t,this);
                    },
                }
            )
        }
    }    
}
function initBasicWall(show=true,wallHeight=2200){

    let currentColor;
    let currentFill;
    if(show){
        currentColor=[255];
        currentFill=[0];
    }else{
        currentColor=null;
        currentFill=null;
    }
    
    objects.objectsList.push(
        {
            name:"wall1",
            type:1,//1标准长方体
            position:{//中心点位置
                x:-1000,
                z:0,
                y:wallHeight/2,
            },
            size:{
                x:97,
                z:2200,
                y:wallHeight,
            },
            stroke:currentColor,
            fill:currentFill,
            bump:{//立方体碰撞盒
                size:{
                    x:90,
                    z:2200,
                    y:wallHeight,
                },
            }
        },
        {
            name:"wall2",
            type:1,//1标准长方体
            position:{//中心点位置
                x:900,
                z:0,
                y:wallHeight/2,
            },
            size:{
                x:97,
                z:2200,
                y:wallHeight,
            },
            stroke:currentColor,
            fill:currentFill,
            bump:{//立方体碰撞盒
                size:{
                    x:90,
                    z:2200,
                    y:wallHeight,
                },
            }
        },
        {
            name:"wall3",
            type:1,//1标准长方体
            position:{//中心点位置
                x:0,
                z:-1000,
                y:wallHeight/2,
            },
            size:{
                x:2200,
                z:97,
                y:wallHeight,
            },
            stroke:currentColor,
            fill:currentFill,
            bump:{//立方体碰撞盒
                size:{//中心点位置
                    x:2200,
                    z:97,
                    y:wallHeight,
                },
            }
        },
        {
            name:"wall4",
            type:1,//1标准长方体
            position:{//中心点位置
                x:0,
                z:900,
                y:wallHeight/2,
            },
            size:{
                x:2200,
                z:97,
                y:wallHeight,
            },
            stroke:currentColor,
            fill:currentFill,
            bump:{//立方体碰撞盒
                size:{//中心点位置
                    x:2200,
                    z:97,
                    y:wallHeight,
                },
            }
        },
        //支柱
        {
            name:"z1",
            type:1,//1标准长方体
            position:{//中心点位置
                x:-1000,
                z:-1000,
                y:wallHeight/2,
            },
            size:{
                x:100,
                z:100,
                y:wallHeight,
            },
            stroke:currentColor,
            fill:currentColor,
        },
        {
            name:"z2",
            type:1,//1标准长方体
            position:{//中心点位置
                x:900,
                z:-1000,
                y:wallHeight/2,
            },
            size:{
                x:100,
                z:100,
                y:wallHeight,
            },
            stroke:currentColor,
            fill:currentFill,
        },
        {
            name:"z3",
            type:1,//1标准长方体
            position:{//中心点位置
                x:900,
                z:900,
                y:wallHeight/2,
            },
            size:{
                x:100,
                z:100,
                y:wallHeight,
            },
            stroke:currentColor,
            fill:currentFill,
        },
        {
            name:"z4",
            type:1,//1标准长方体
            position:{//中心点位置
                x:-1000,
                z:900,
                y:wallHeight/2,
            },
            size:{
                x:100,
                z:100,
                y:wallHeight,
            },
            stroke:currentColor,
            fill:currentFill,
        }
    )
}
function initBasicCelling(xsize=2000,xcount=20,zsize=2000,zcount=20,height=1300,f=(t,obj)=>{
    obj.position.y=Math.sin(obj.paraList.x*obj.paraList.x+obj.paraList.z*obj.paraList.z+t/40)*150+1300;
},plRatiox=1,plRatioy=1){
    for(let x=-xcount/2;x<xcount/2;x++){
        for(let z=-zcount/2;z<zcount/2;z++){
            objects.objectsList.push(
                {
                    name:"sky",
                    type:1,//1标准长方体
                    paraList:{//携带的参数列表
                        x:x/plRatiox,
                        z:z/plRatioy,
                    },
                    position:{
                        x:x*(xsize/xcount),
                        z:z*(zsize/zcount),
                        y:height,
                    },
                    size:{
                        x:xsize/xcount,
                        z:zsize/zcount,
                        y:200,
                    },
                    strokeWeight:3,
                    stroke:[100],
                    fill:[0],
                    change(t){
                        f(t,this);
                    },
                }
            )
        }
    }    
}
function initBasicDisplayScreen(name,position,heading,fuc){
    let size,displayCubeSize;
    if(heading==0){
        size={x:300,z:20,y:300};
        displayCubeSize={x:300,z:0,y:300};
    }else{
        size={x:20,z:300,y:300};
        displayCubeSize={x:0,z:300,y:300};
    }
    objects.objectsList.push(
        {
            name:name,
            type:11,//11展示屏
            position:position,
            size:size,
            displayCubeSize:displayCubeSize,
            fuc:fuc,
            stroke:[255,255,0],
            fill:null,
            bump:{
                size:size
            }
        }
    );
}
function initBasicDisplayBox(name,position,sizeRto,fuc){
    objects.objectsList.push(
        {
            name:name,
            type:21,//21展示柜
            position:position,
            size:{
                x:100*sizeRto.x,
                z:100*sizeRto.z,
                y:100,
            },
            containCubeSize:{//立体展柜特有
                x:100*sizeRto.x,
                z:100*sizeRto.z,
                y:100*sizeRto.y,
            },
            fuc:fuc,
            stroke:[255],
            fill:[0,200],
            bump:{
                size:{
                    x:100*sizeRto.x,
                    z:100*sizeRto.z,
                    y:100*sizeRto.y,
                }
            }
        },        
    );
}