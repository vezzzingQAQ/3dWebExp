//物件列表规范
/*
type:
1:长方体
2:球
3:圆锥
4:圆柱

11:没有说明的画框
12:没有说明的画框2
*/
var objects={
    player:{
        startPosition:{
            x:0,
            z:0,
            y:50,
        },
        height:180,
        moveSpeed:15,
        moveHeightRange:9,
        bumpR:120,
    },
    objectsList:[

    ]
}

//生成地面
for(let x=-20;x<20;x++){
    for(let z=-20;z<20;z++){
        let zValue=Math.sin((x/3)*(x/3)+(z/3)*(z/3))+1;
        objects.objectsList.push(
            {
                name:"ground",
                type:1,//1标准长方体
                paraList:{//携带的参数列表
                    x:x/5,
                    z:z/5,
                },
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
                stroke:null,
                fill:[0],
                change(t){
                    let zv=Math.sin(this.paraList.x*this.paraList.z+t/10);
                    this.stroke=[
                        zv*120+120,
                        120-zv*120,
                        zv*60+60,
                    ];
                    this.strokeWeight=(zv+1)*10;
                },
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
                paraList:{//携带的参数列表
                    x:x/5,
                    z:z/5,
                },
                position:{
                    x:x*100,
                    z:z*100,
                    y:1500-zValue*100,
                },
                rotation:{
                    x:0,
                    z:0,
                    y:0,
                },
                size:{
                    x:100,
                    z:100,
                    y:100,
                },
                strokeWeight:10,
                stroke:[zValue*120+120,120-zValue*120,120],
                fill:[0],
                change(t){
                    this.rotation.y+=0.02;
                    this.position.y=Math.sin(this.paraList.x*this.paraList.x+this.paraList.z*this.paraList.z+t/30)*550+1300;
                },
            }
        )
    }
}

