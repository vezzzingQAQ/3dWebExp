var objects=initStruc();
//生成地面
initBasicGround(1000,10,1000,10,(t,obj)=>{
    let zv=Math.sin(obj.paraList.x*obj.paraList.z+t/10);
    obj.strokeWeight=(zv+1)*10;
});
//生成天花板
initBasicCelling(1000,10,1000,10,(t,obj)=>{
    obj.position.y=Math.sin(obj.paraList.x*obj.paraList.x+obj.paraList.z*obj.paraList.z+t/40)*150+1300;
});
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
