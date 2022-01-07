var objects=initStruc(0,0);
let sizeX=1500;
let sizeZ=1500;
let placeR=400;
//生成地面
initBasicGround(sizeX,10,sizeZ,10,(t,obj)=>{
    let zv=Math.sin(obj.paraList.x*obj.paraList.z+t/10);
    obj.size.y=(zv+1)*10;
},[255,0,0],3,[0]);
//生成天花板
initBasicFunctionCelling(sizeX,12,sizeZ,12,500,(t,obj)=>{
    obj.position.y=Math.sin(obj.paraList.x*obj.paraList.x+obj.paraList.z*obj.paraList.z+t/40)*150+900;
},[0,255,0],3,[0]);
//生成周围的墙
// initCalWall(2200,sizeX,sizeZ,null,null);
initBasicDisplayScreen(
    "displayscreen1",
    {x:0,z:-placeR,y:300},
    true,
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
    {x:0,z:placeR,y:300},
    true,
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
initBasicDisplayScreen(
    "displayscreen3",
    {x:-placeR,z:0,y:300},
    false,
    new TdFunctionFlat(
        {author:"vezzzing",date:"2022.1.7"},
        -5,5,20,
        -5,5,20,
        `sin(x*x+sin(y)*y+T)`,
        `
        noStroke();
        fill(map(x,-5,5,0,255),map(y,-5,5,255,0),map(z,-1,1,0,255));
        rect(px,py,map(z,-1,1,0,5));`
    )
);
initBasicDisplayScreen(
    "displayscreen4",
    {x:placeR,z:0,y:300},
    false,
    new TdFunctionFlat(
        {author:"vezzzing",date:"2022.1.7"},
        -5,5,20,
        -5,5,20,
        `sin(x*x+sin(y)*y+T)`,
        `
        noStroke();
        fill(map(x,-5,5,0,255),map(z,-1,1,255,0),map(z,-1,1,0,255));
        rect(px,py,map(z,-1,1,0,5));`
    )
);


