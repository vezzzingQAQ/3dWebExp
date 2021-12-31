//物件列表规范
/*
type:
1:长方体
2:球
3:圆锥
4:圆柱
*/
var objects={
    player:{
        startPosition:{
            x:400,
            z:400,
            y:50,
        },
        height:180,
        moveSpeed:9,
        moveHeightRange:9,
        bumpR:120,
    },
    objectsList:[
        {
            name:"wall1",
            type:1,//1标准长方体
            position:{
                x:-1000,
                z:0,
                y:1000,
            },
            size:{
                x:97,
                z:2200,
                y:2000,
            },
            stroke:[255],
            fill:[0],
            bump:{//立方体碰撞盒
                size:{
                    x:90,
                    z:2200,
                    y:2000,
                },
            }
        },
        {
            name:"wall2",
            type:1,//1标准长方体
            position:{
                x:900,
                z:0,
                y:1000,
            },
            size:{
                x:97,
                z:2200,
                y:2000,
            },
            stroke:[255],
            fill:[0],
            bump:{//立方体碰撞盒
                size:{
                    x:90,
                    z:2200,
                    y:2000,
                },
            }
        },
        {
            name:"wall3",
            type:1,//1标准长方体
            position:{
                x:0,
                z:-1000,
                y:1000,
            },
            size:{
                x:2200,
                z:97,
                y:2000,
            },
            stroke:[255],
            fill:[0],
            bump:{//立方体碰撞盒
                size:{
                    x:2200,
                    z:97,
                    y:2000,
                },
            }
        },
        {
            name:"wall4",
            type:1,//1标准长方体
            position:{
                x:0,
                z:900,
                y:1000,
            },
            size:{
                x:2200,
                z:97,
                y:2000,
            },
            stroke:[255],
            fill:[0],
            bump:{//立方体碰撞盒
                size:{
                    x:2200,
                    z:97,
                    y:2000,
                },
            }
        },
        //支柱
        {
            name:"z1",
            type:1,//1标准长方体
            position:{
                x:-1000,
                z:-1000,
                y:1000,
            },
            size:{
                x:100,
                z:100,
                y:2000,
            },
            stroke:null,
            fill:[100],
        },
        {
            name:"z2",
            type:1,//1标准长方体
            position:{
                x:900,
                z:-1000,
                y:1000,
            },
            size:{
                x:100,
                z:100,
                y:2000,
            },
            stroke:null,
            fill:[100],
        },
        {
            name:"z3",
            type:1,//1标准长方体
            position:{
                x:900,
                z:900,
                y:1000,
            },
            size:{
                x:100,
                z:100,
                y:2000,
            },
            stroke:null,
            fill:[100],
        },
        {
            name:"z1",
            type:1,//1标准长方体
            position:{
                x:-1000,
                z:900,
                y:1000,
            },
            size:{
                x:100,
                z:100,
                y:2000,
            },
            stroke:null,
            fill:[100],
        },
        //球体实验
        {
            name:"ball1",
            type:2,//1标准球体
            position:{
                x:0,
                z:0,
                y:300,
            },
            size:{
                r:100,
            },
            stroke:[255],
            fill:null,
        },
        {
            name:"platform",
            type:1,//1标准长方体
            position:{
                x:0,
                z:0,
                y:80,
            },
            size:{
                x:100,
                z:100,
                y:100,
            },
            strokeWeight:3,
            stroke:[255],
            fill:null,
            bump:{//立方体碰撞盒
                size:{
                    x:100,
                    z:100,
                    y:100,
                },
            }
        },
        //圆锥实验
        {
            name:"cone",
            type:3,//3标准圆锥
            position:{
                x:-500,
                z:0,
                y:300,
            },
            size:{
                r:60,
                h:170,
            },
            stroke:[255,255,0],
            fill:null,
        },
        {
            name:"platform",
            type:1,//1标准长方体
            position:{
                x:-500,
                z:0,
                y:80,
            },
            size:{
                x:100,
                z:100,
                y:100,
            },
            strokeWeight:3,
            stroke:[255],
            fill:null,
            bump:{//立方体碰撞盒
                size:{
                    x:100,
                    z:100,
                    y:100,
                },
            }
        },
        //圆柱实验
        {
            name:"cld",
            type:4,//4标准圆柱
            position:{
                x:500,
                z:0,
                y:300,
            },
            size:{
                r:60,
                h:193,
            },
            stroke:[255,100],
            fill:[0,255,0,100],
        },
        {
            name:"platform",
            type:1,//1标准长方体
            position:{
                x:500,
                z:0,
                y:80,
            },
            size:{
                x:100,
                z:100,
                y:100,
            },
            strokeWeight:3,
            stroke:[255],
            fill:null,
            bump:{//立方体碰撞盒
                size:{
                    x:100,
                    z:100,
                    y:100,
                },
            }
        },        
    ]
}

//生成地面
for(let x=-10;x<10;x++){
    for(let z=-10;z<10;z++){
        let zValue=Math.sin((x/3)*(z/3))+1;
        objects.objectsList.push(
            {
                name:"ground",
                type:1,//1标准长方体
                position:{
                    x:x*100,
                    z:z*100,
                    y:-50,
                },
                size:{
                    x:100,
                    z:100,
                    y:100,
                },
                strokeWeight:10,
                stroke:[zValue*60+60,60-zValue*120,100],
                fill:[0],
            }
        )
    }
}
//生成天花板
for(let x=-10;x<10;x++){
    for(let z=-10;z<10;z++){
        let zValue=Math.sin((x/3)*(x/3)+(z/3)*(z/3))+1;
        objects.objectsList.push(
            {
                name:"sky",
                type:1,//1标准长方体
                position:{
                    x:x*100,
                    z:z*100,
                    y:1500-zValue*100,
                },
                size:{
                    x:100,
                    z:100,
                    y:zValue*200,
                },
                strokeWeight:10,
                stroke:[zValue*60+60,60-zValue*120,100],
                fill:[0],
            }
        )
    }
}

