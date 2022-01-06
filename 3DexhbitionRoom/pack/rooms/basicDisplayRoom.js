var objects=initStruc(0,0);
let sizeX=1000;
let sizeZ=2000;
//生成地面
initBasicGround(sizeX,10,sizeZ,20,(t,obj)=>{
    let zv=Math.sin(obj.paraList.x*obj.paraList.z+t/10);
    obj.strokeWeight=(zv+1)*10;
});
//生成天花板
initBasicCelling(sizeX,10,sizeZ,20,1300,(t,obj)=>{
    obj.position.y=Math.sin(obj.paraList.x*obj.paraList.x+obj.paraList.z*obj.paraList.z+t/40)*150+1300;
});
//生成周围的墙
initCalWall(2200,sizeX,sizeZ,[100],[0]);
initCalWallBlocks(2200,sizeX,sizeZ,[100],[0]);
initBasicDisplayScreen(
    "displayscreen1",
    {x:0,z:-500,y:300},
    0,
    new TdFunctionFlat(
        {author:"vezzzing",date:"2022.1.6",name:"233"},
        -5,5,80,
        -5,5,80,
        `sin(x*y+T)`,
        `
        noStroke();
        fill(sin(z*10)*120+120,map(z,-1,1,255,0),map(z,-1,1,0,255));
        rect(px,py,map(z,-1,1,0,5));`
    )
);
initBasicDisplayScreen(
    "displayscreen2",
    {x:0,z:500,y:300},
    0,
    new TdFunctionFlat(
        {author:"vezzzing",date:"2022.1.6"},
        -5,5,20,
        -5,5,20,
        `sin(x*x+y*y+T)`,
        `
        noStroke();
        fill(map(x,-5,5,0,255),map(z,-1,1,255,0),map(z,-1,1,0,255));
        rect(px,py,map(z,-1,1,0,5));`
    )
);

