class TdFunctionFlat{
    constructor(fromx,tox,ax,fromy,toy,ay,sf,schangef,canvasIndex){
        this.type="2d";
        this.fromx=fromx;
        this.tox=tox;
        this.fromy=fromy;
        this.toy=toy;
        this.ax=ax;
        this.ay=ay;
        
        this.sf=sf;//函数表达式
        this.schangef=schangef;//对于每个点的操作
        this.canvasIndex=canvasIndex;//画布index

        this.timeCop=this.ax*this.ay;//时间复杂度
    }
    toStr(){
        let schangeNew=this.schangef.replace(/\r\n/g,"\r\n"+"canvasList["+this.canvasIndex+"].");
        schangeNew=schangeNew.replace(/\n/g,"\r\n"+"canvasList["+this.canvasIndex+"].");
        let textTemp=
        `
        canvasList[${this.canvasIndex}].rectMode(CENTER);
        canvasList[${this.canvasIndex}].background(0);
        for(let x=${this.fromx};x<=${this.tox};x+=${(this.tox-this.fromx)/this.ax}){
            for(let y=${this.fromy};y<=${this.toy};y+=${(this.toy-this.fromy)/this.ay}){
                let z=${this.sf};
                let px=map(x,${this.fromx},${this.tox},20,180);
                let py=map(y,${this.fromy},${this.toy},20,180);
                ${schangeNew}
            }
        }
        `
        return(textTemp);
    }
    err(){
        return(
        `
        fill(255);
        canvasList[${this.canvasIndex}].text("ERRRR",50,50);
        `
        );
    }
}
class GlFunction{
    constructor(fromx,tox,ax,fromy,toy,ay,sf,schangef){
        this.type="3d";
        this.fromx=fromx;
        this.tox=tox;
        this.fromy=fromy;
        this.toy=toy;
        this.ax=ax;
        this.ay=ay;
        
        this.sf=sf;//函数表达式
        this.schangef=schangef;//对于每个点的操作

        this.timeCop=this.ax*this.ay;//时间复杂度
    }
    toStr(){
        let textTemp=
        `
        push();
            for(let x=${this.fromx};x<=${this.tox};x+=${(this.tox-this.fromx)/this.ax}){
                for(let y=${this.fromy};y<=${this.toy};y+=${(this.toy-this.fromy)/this.ay}){
                    let z=${this.sf};
                    push();
                    translate(map(x,${this.fromx},${this.tox},-40,40),z*15,map(y,${this.fromy},${this.toy},-40,40));
                    ${this.schangef}
                    pop();
                }
            }
        pop();
        `
        return(textTemp);
    }
    err(){
        return(
        `
        noFill();
        strokeWeight(0.8);
        stroke(255);
        box(10);
        `
        );
    }
}
