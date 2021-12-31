var player;
var displayList=[];
function setup() {
    createCanvas(windowWidth,windowHeight,WEBGL);
    smooth();
    class Player{
        constructor(player,objects){
            this.x=player.startPosition.x;
            this.y=player.startPosition.y;
            this.z=player.startPosition.z+player.height/2;
            this.height=player.height;
            this.originHeight=player.height;
            this.moveSpeed=player.moveSpeed;
            this.moveHeightRange=player.moveHeightRange;
            this.bumpR=player.bumpR;
            this.objectsList=objects;
            
            this.isWalkingForward=false;
            this.isWalkingBackward=false;
            this.isWalkingLeft=false;
            this.isWalkingRight=false;
        }
        _calBump(x,z,cube){//返回x,z位置坐标的值
            if(cube.hasOwnProperty("bump") && cube.position.y+cube.bump.size.y/2>(this.y+player.height)/2){
                let leftBound=cube.position.x-cube.bump.size.x/2-this.bumpR;
                let rightBound=cube.position.x+cube.bump.size.x/2+this.bumpR;
                let upperBound=cube.position.z+cube.bump.size.z/2+this.bumpR;
                let lowerBound=cube.position.z-cube.bump.size.z/2-this.bumpR;
                if((x<rightBound && x>leftBound) && (z<upperBound && z>lowerBound)){
                    let distLeftBound=abs(x-leftBound);
                    let distRightBound=abs(x-rightBound);
                    let distUpperBound=abs(z-upperBound);
                    let distLowerBound=abs(z-lowerBound);
                    let minDist=(min(distLeftBound,distRightBound,distUpperBound,distLowerBound));
                    if(minDist==distLeftBound){
                        return({x:leftBound,z:z});
                    }else if(minDist==distRightBound){
                        return({x:rightBound,z:z});
                    }else if(minDist==distUpperBound){
                        return({x:x,z:upperBound});
                    }else{
                        return({x:x,z:lowerBound});
                    }
                }else{
                    return({x:x,z:z});
                }
            }else{
                return({x:x,z:z});
            }
        }
        _walk(){
            for(let i=0;i<this.objectsList.length;i++){
                let newPosition=this._calBump(this.x,this.z,this.objectsList[i]);
                this.x=newPosition.x;
                this.z=newPosition.z;
            }
            this.height=this.originHeight+sin(frameCount/10)*this.moveHeightRange;
        }
        walkForward(){
            this.x+=this.moveSpeed*cos(this.thetarw);
            this.z-=this.moveSpeed*sin(this.thetarw);
            this._walk();
        }
        walkBackward(){
            this.x-=this.moveSpeed*cos(this.thetarw);
            this.z+=this.moveSpeed*sin(this.thetarw);
            this._walk();
        }
        walkLeft(){
            this.x+=this.moveSpeed*sin(this.thetarw);
            this.z+=this.moveSpeed*cos(this.thetarw);
            this._walk();
        }
        walkRight(){
            this.x-=this.moveSpeed*sin(this.thetarw);
            this.z-=this.moveSpeed*cos(this.thetarw);
            this._walk();
        }
        lookAround(){
            camera(this.x,this.y+this.height,this.z,
            this.x+100*cos(this.thetarw),
            this.y+this.height-100*sin(this.thetaeh),
            this.z-100*sin(this.thetarw),
            0,-1,0);
        }
        update(){
            //鼠标转向
            this.thetarw=map(mouseX,width,0,2*PI,0);
            this.thetaeh=map(mouseY,0,height,-PI/2,PI/2);
            //走路
            if(this.isWalkingForward){
                this.walkForward();
            }
            if(this.isWalkingBackward){
                this.walkBackward();
            }
            if(this.isWalkingLeft){
                this.walkLeft();
            }
            if(this.isWalkingRight){
                this.walkRight();
            }
            this.lookAround();
        }
    }
    player=new Player(objects.player,objects.objectsList);
    displayList.push(createGraphics(200,200));//画板
    displayList.push(createGraphics(200,200));//画板
}
function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}
function draw(){
    background(0);
    {//画板1绘制
        displayList[0].rectMode(CENTER);
        displayList[0].background(0);
        displayList[0].noStroke();
        for(let x=-2;x<2;x+=0.2){
            for(let y=-2;y<2;y+=0.2){
                let z=sin(x*y+frameCount/10);
                let px=map(x,-2,2,20,180);
                let py=map(y,-2,2,20,180);
                displayList[0].fill(map(z,-1,1,0,255),map(z,-1,1,255,0),map(z,-1,1,0,155));
                displayList[0].rect(px,py,map(z,-1,1,0,20));
            }
        }
    }
    {//画板2绘制
        displayList[1].rectMode(CENTER);
        displayList[1].background(0);
        displayList[1].noStroke();
        for(let x=-2;x<2;x+=0.1){
            for(let y=-2;y<2;y+=0.1){
                let z=sin(x*x+y*y-frameCount/10);
                let px=map(x,-2,2,0,200);
                let py=map(y,-2,2,0,200);
                displayList[1].fill(220,map(z,-1,1,255,0),map(z,-1,1,0,255));
                displayList[1].rect(px,py,map(z,-1,1,0,20));
            }
        }
    }
    {//渲染场景中的每个物体
        try{
            for(let i=0;i<objects.objectsList.length;i++){
                let currentObject=objects.objectsList[i];
                {//渲染物体
                    if(currentObject.hasOwnProperty("strokeWeight")){
                        strokeWeight(currentObject.strokeWeight);
                    }else{
                        strokeWeight(1);
                    }
                    if(currentObject.stroke!=null){
                        stroke.apply(null,currentObject.stroke);
                    }else{
                        noStroke();
                    }
                    if(currentObject.fill!=null){
                        fill.apply(null,currentObject.fill);
                    }else{
                        noFill();
                    }
                    //解析运动函数
                    if(currentObject.hasOwnProperty("change")){
                        currentObject.change(frameCount);
                    }
                }
                push();
                    translate(currentObject.position.x,currentObject.position.y,currentObject.position.z);
                    if(currentObject.hasOwnProperty("rotation")){
                        rotateX(currentObject.rotation.x);
                        rotateY(currentObject.rotation.y);
                        rotateZ(currentObject.rotation.z);
                    }
                    switch(currentObject.type){
                        case 1:
                            box(currentObject.size.x,currentObject.size.y,currentObject.size.z);
                            break;
                        case 2:
                            sphere(currentObject.size.r);
                            break;
                        case 3:
                            cone(currentObject.size.r,currentObject.size.h);
                            break;
                        case 4:
                            cylinder(currentObject.size.r,currentObject.size.h);
                            break;
                        case 11:
                            box(currentObject.size.x,currentObject.size.y,currentObject.size.z);
                            texture(displayList[currentObject.canvasIndex]);
                            box(currentObject.displayCubeSize.x,currentObject.displayCubeSize.y,currentObject.displayCubeSize.z);
                            break;
                        default:
                            console.log("无法识别的物体类型");
                            break;
                    }
                pop();
            }
        }catch{
            console.log("导入物体出错");
        }
    }
    //加入玩家视角
    player.update();
}
function keyPressed(){
    switch(keyCode){
        case 87:
            player.isWalkingForward=true;   
            break;
        case 83:
            player.isWalkingBackward=true;  
            break;
        case 65:
            player.isWalkingLeft=true; 
            break;
        case 68:
            player.isWalkingRight=true;
            break;
    }
}
function keyReleased(){
    switch(keyCode){
        case 87:
            player.isWalkingForward=false;   
            break;
        case 83:
            player.isWalkingBackward=false;  
            break;
        case 65:
            player.isWalkingLeft=false; 
            break;
        case 68:
            player.isWalkingRight=false;
            break;
    }
}
