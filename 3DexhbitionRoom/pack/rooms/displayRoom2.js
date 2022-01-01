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
var objects=initStruc();
//生成地面
initBasicGround();
//生成天花板
initBasicCelling();
//生成周围的墙
initBasicWall();
initBasicDisplayScreen(
    "展示屏3",
    {x:-500,z:-500,y:300},
    1,
    new TdFunctionFlat(
        -5,5,80,
        -5,5,80,
        `sin(sin(x)*cos(y)+T)`,
        `
        noStroke();
        fill(sin(z*10)*120+120,map(z,-1,1,255,0),map(z,-1,1,0,255));
        rect(px,py,map(z,-1,1,0,5));`
    )
)
