var objects=initStruc({x:0,z:0},{background:[250]});
let sizeX=1500;
let sizeZ=1500;
let placeR=400;
initBasicDisplayScreen(
    "displayscreen4",
    {x:placeR,z:0,y:300},
    false,
    new TdFunctionFlat(
        {author:"vezzzing",date:"2022.1.7"},
        -5,5,80,
        -5,5,80,
        `sin(x*x+sin(y)*y+T)`,
        `
        stroke(0);
        fill(map(x,-5,5,0,255),map(z,-1,1,255,0),map(z,-1,1,0,255));
        rect(px,py,map(z,-1,1,0,5));`
    ),null
);

