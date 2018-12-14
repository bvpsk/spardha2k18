
function generate_point(){
    let x,y;
    let status;
    while(!status){
        status = true;
        x = Math.random()*1100;
        y = Math.random()*700;
        for(var i = 0;i < obstacles.length;i++){
            if(obstacles[i].x <= x && obstacles[i].x+obstacles[i].w >= x && obstacles[i].y <= y && obstacles[i].y + obstacles[i].h >= y){
                status = false;
                break;
            }
        }
    }
    return [x,y];
}
class AGENT{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 10;
        this.sx = 1;
        this.sy = 1;
        this.speed = 1;
        this.angle = 0;
        this.prevx;
        this.prevy;
        this.rgb_r = Math.random()*256;
        this.rgb_g = Math.random()*256;
        this.rgb_b = Math.random()*256;
        this.eyes = [[this.x+45,this.y],[this.x+37,this.y-37],[this.x+37,this.y+37],[this.x,this.y-45],[this.x-45,this.y],[this.x-37,this.y+37],[this.x-37,this.y-37],[this.x,this.y+45]];
        this.ahead = [false,false,false,false,false,false,false,false];
    }
    show(){
        fill(this.rgb_r,this.rgb_g,this.rgb_b);
        push();
        rectMode(CENTER);
        translate(this.x,this.y);
        rotate(this.angle);
        rect(0,0,this.w,this.h);
        pop();
        for(var i = 0;i < this.eyes.length;i++){
            if(this.ahead[i]){
                stroke(255,0,0);
            }else{
                stroke(255,255,255);
            }
            line(this.x,this.y,this.eyes[i][0],this.eyes[i][1]);
        }
        
    }
    move(){
        this.prevx = this.x;
        this.prevy = this.y;
        this.x += this.sx*this.speed;
        this.y += this.sy*this.speed;
        this.eyes.forEach((eye)=>{
            eye[0] += this.sx*this.speed;
            eye[1] += this.sy*this.speed;
        });
        this.angle = Math.atan2(this.y - this.prevy,this.x - this.prevx);
    }
    look_ahead(){
        for(var i = 0;i < this.eyes.length;i++){
            this.ahead[i] = false;
            for(var j = 0;j<obstacles.length;j++){
                this.ahead[i] = obstacles[j].check_point(this.eyes[i]);
                if(this.ahead[i])
                    break;
            }
        }
    }
}
let agents = [];
let total_agents = 1;
let dp = [];
for(var i= 0;i < total_agents;i++){
    dp = generate_point();
    agents.push(new AGENT(dp[0],dp[1]));
}