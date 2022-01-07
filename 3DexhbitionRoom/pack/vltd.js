var canvasList=[];//储存房间里的画板列表
var calFrameCount=0;//计算过后的应有帧数

/*鼠标转向*/
var xrotation;
var xdelta=0;
function setup(){
    createCanvas(windowWidth,windowHeight,WEBGL);
    smooth();
    class Player{
        constructor(player,objects){
            this.x=player.startPosition.x;
            this.z=player.startPosition.z;
            this.y=player.startPosition.y+player.height/2;

            this.height=player.height;
            this.originHeight=player.height;
            this.moveSpeed=player.moveSpeed;
            this.originMoveSpeed=player.moveSpeed;//原有speed
            this.moveHeightRange=player.moveHeightRange;
            this.bumpR=player.bumpR;
            this.objectsList=objects;
            
            this.isWalking=false;//是否在行走

            this.isWalkingForward=false;
            this.isWalkingBackward=false;
            this.isWalkingLeft=false;
            this.isWalkingRight=false;

            this.thetarw=0;
            this.thetaeh=0;
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
            this.isWalking=true;
            this.moveSpeed=this.originMoveSpeed*(deltaTime/(50/3));//根据帧率计算行走速度
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
            this.x+200*cos(this.thetarw),
            this.y+this.height-300*tan(this.thetaeh),
            this.z-200*sin(this.thetarw),
            0,-1,0);
        }
        update(){
            //鼠标转向，x防线在mouseMove中实现
            this.thetaeh=map(mouseY,0,height,-PI/2+Number.MIN_VALUE,PI/2-Number.MIN_VALUE);

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
    for(let i=0;i<objects.objectsList.length;i++){
        currentObject=objects.objectsList[i];
        if(currentObject.type==11){//需要canvas画布
            canvasList.push(createGraphics(200,200));
            currentObject.fuc.canvasIndex=canvasList.length-1;
        }
    }
}
function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}
function draw(){
    background(0);
    T=calFrameCount/20;
    {//渲染场景中的每个物体
        // try{
            for(let i=0;i<objects.objectsList.length;i++){
                let currentObject=objects.objectsList[i];
                {//渲染物体
                    if(currentObject.hasOwnProperty("strokeWeight") && currentObject.strokeWeight!=null){
                        strokeWeight(currentObject.strokeWeight);
                    }else{
                        strokeWeight(1);
                    }
                    if(currentObject.hasOwnProperty("stroke") && currentObject.stroke!=null){
                        stroke.apply(null,currentObject.stroke);
                    }else{
                        noStroke();
                    }
                    if(currentObject.hasOwnProperty("fill") && currentObject.fill!=null){
                        fill.apply(null,currentObject.fill);
                    }else{
                        noFill();
                    }
                    //解析运动函数
                    if(currentObject.hasOwnProperty("change") && currentObject.change!=null){
                        // eval(currentObject.change(calFrameCount));
                        currentObject.change(calFrameCount);
                    }
                    //HUD界面渲染
                    if(currentObject.hasOwnProperty("showHUD") && currentObject.showHUD!=null){
                        currentObject.showHUD();
                    }
                    //如果有玩家进入检测区效果就执行
                    if(currentObject.hasOwnProperty("playerEnter") && currentObject.playerEnter!=null){
                        currentObject.playerEnter();
                    }
                }
                push();
                    translate(currentObject.position.x,currentObject.position.y,currentObject.position.z);
                    if(currentObject.hasOwnProperty("rotation") && currentObject.rotation!=null){
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
                            //绘制画板
                            try{
                                eval(currentObject.fuc.toStr());
                            }catch{
                                eval(currentObject.fuc.err());
                            }
                            texture(canvasList[currentObject.fuc.canvasIndex]);
                            box(currentObject.displayCubeSize.x,currentObject.displayCubeSize.y,currentObject.displayCubeSize.z);
                            break;
                        case 21:
                            box(currentObject.size.x,currentObject.size.y,currentObject.size.z);
                            translate(0,currentObject.size.y/2+currentObject.containCubeSize.y/2,0);
                            noFill();
                            box(currentObject.containCubeSize.x,currentObject.containCubeSize.y,currentObject.containCubeSize.z);
                            push();
                                try{
                                    eval(currentObject.fuc.toStr());
                                }catch{
                                    pop();
                                    eval(currentObject.fuc.err());
                                }
                            pop();
                            break;
                        default:
                            console.log("无法识别的物体类型");
                            break;
                    }
                pop();
            }
        // }catch{
        //     console.log("导入物体出错");
        // }
    }
    {//测试代码
        if(frameCount==10){
            console.log(objects);
        }
    }
    //加入玩家视角
    player.update();
    //处理帧率
    calFrameCount+=deltaTime/(50/3);
}
function mouseMoved(){
    {//实现视线转向
        let delta=mouseX-pmouseX;
        if(delta>0){
            xrotation=true;
            xdelta=delta;
        }else if(delta<0){
            xrotation=false;
            xdelta=-delta;
        }
        let rotateValue=0.008;
        if(xrotation){
            player.thetarw+=rotateValue*xdelta;
        }else{
            player.thetarw-=rotateValue*xdelta;
        }
    }
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
            player.isWalking=false;  
            break;
        case 83:
            player.isWalkingBackward=false;  
            player.isWalking=false;  
            break;
        case 65:
            player.isWalkingLeft=false; 
            player.isWalking=false;  
            break;
        case 68:
            player.isWalkingRight=false;
            player.isWalking=false;  
            break;
    }
}
