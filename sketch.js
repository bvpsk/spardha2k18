function setup() {
	createCanvas(windowWidth, windowHeight);
	background(51);
	road();
	agents.forEach((ag)=>{
		ag.show();
	});
}
function draw() {
	// background(51);
	// road();
	// agents.forEach((ag)=>{
	// 	ag.show();
	// });
	// agents[0].move();
	// agents[0].look_ahead();
	// obstacles.forEach((obs)=>{
	// 	if(obs.collide(agents[0])){
	// 	}
	// });
}
function keyPressed(){
	if(keyCode == UP_ARROW){
		agents[0].sx = 0;
		agents[0].sy = -1;
	}else if(keyCode == DOWN_ARROW){
		agents[0].sx = 0;
		agents[0].sy = 1;
	}else if(keyCode == LEFT_ARROW){
		agents[0].sx = -1;
		agents[0].sy = 0;
	}else if(keyCode == RIGHT_ARROW){
		agents[0].sx = 1;
		agents[0].sy = 0;
	}
}