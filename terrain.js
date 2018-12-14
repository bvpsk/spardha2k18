class obstacle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    show(){
        rect(this.x,this.y,this.w,this.h,5);
    }
    collide(vehicle){
        return (vehicle.x<= this.x+this.w && this.x <= vehicle.x + vehicle.w && vehicle.y <= this.y + this.h && this.y <= vehicle.y + vehicle.h);
    }
    check_point(point){
        return (point[0]<= this.x+this.w && this.x <= point[0] && point[1] <= this.y + this.h && this.y <= point[1]);
    }
}
let obstacles = [];
let x = [0,0,300,400,300,300,55,175,400,850,970,400,970,1150,650,600,850,1100];
let y = [0,100,0,50,350,650,0350,220,300,300,200,600,200,50,400,450,700,500];
let w = [250,250,50,700,50,50,50,50,500,50,50,500,230,50,50,150,300,50];
let h = [50,50,300,50,250,250,250,450,50,200,450,50,50,200,150,50,50,250];
for(var i = 0;i<x.length;i++){
    obstacles.push(new obstacle(x[i],y[i],w[i],h[i]));
}
function road(){
    noFill();
    stroke(255);
    strokeWeight(1);
    obstacles.forEach((obstacle)=>{
        obstacle.show();
    });
}