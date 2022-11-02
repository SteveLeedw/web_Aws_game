
function ball(){
	window.x = canvas.width / 2;
	window.y = canvas.height / 3;
	window.r = canvas.width/45;
	window.dx = 5;
	window.dy = -5;
}

function paddle(){
	window.pX = x;
	window.pHeight = x/15;
	window.pWidth = x/4;
	window.pLeft = false;
	window.pRight = false;
}

function brick(row, col){
	window.bricks = [];
	
	window.row = row;
	window.col = col;
	window.bW = canvas.width / (col+1);
	window.bH = canvas.height / 10;
	window.bWS = bW/10;
	
	for(let i=0; i<row; i++){
		window.bricks[i] = [];
		for(let j=0; j<col; j++){
			bricks[i][j] = {};
			bricks[i][j].x = bW/2 + j*bW;
			bricks[i][j].y = bH/2 + i*bH;
			bricks[i][j].exist = true;
		}
	}
}

function init(){
	
	window.canvas = document.getElementById('game');
	window.scr = canvas.getContext('2d');
	
	document.addEventListener('keyup', keyupHandler);
	document.addEventListener('keydown', keydownHandler);
	
	document.addEventListener('mousemove', mouseHandler);
	
	ball();
	
	paddle();
	
	brick(3, 8);
	
	window.score = 0;
	
	loop();
}

function keydownHandler(input){
	if(input.keyCode == 39){
		window.pRight = true;
	}
	if(input.keyCode == 37){
		window.pLeft = true;
	}
}

function keyupHandler(input){
	if(input.keyCode == 39){
		window.pRight = false;
	}
	if(input.keyCode == 37){
		window.pLeft = false;
	}
}

function mouseHandler(input){
	const relativeX = input.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width - pWidth){
		pX = relativeX;
	}
}

function gameOver(){
	
	document.location.reload();
	alert('game over!');
}

function colideWall(){
	if(x - r <= 0 || x + r >= canvas.width){
		dx /= Math.abs(dx);
		dx *= -5;
	}
	if(y - r <= 0){
		dy /= Math.abs(dy);
		dy *= -5;
	}
	else if(y + r >= canvas.height){
		gameOver();
	}
	
}

function colidePaddle(){
	if(pX <= x && x <= pX + pWidth && y + r >= canvas.height - pHeight){
		dy = -dy;
	}
}

function colideBrick(){
	for(let i=0; i<row; i++){
		for(let j=0; j<col; j++){
			if(bricks[i][j].x <= x && x <= bricks[i][j].x + bW - bWS){
				if(bricks[i][j].y <= y && y<= bricks[i][j].y + bH/3){
					if(bricks[i][j].exist){
						bricks[i][j].exist = false;
						dy = -dy;
						score++;
					}
				}
			}
		}
	}
}

function move(){
	x += dx;
	y += dy;	

	colideWall();

	colidePaddle();

	colideBrick();

	if(pRight && pX + pWidth + 10 <= canvas.width){
		pX += 10;
	}
	if(pLeft && pX - 10 >= 0){
		pX -= 10;
	}
	
}

function drawBall(){
	scr.beginPath();
	scr.fillStyle = 'tomato';
	scr.arc(x, y, r, 0, 2 * Math.PI);
	scr.fill();
	scr.closePath();
}

function drawPaddle(){
	scr.beginPath();
	scr.fillStyle = 'blue';
	scr.rect(pX, canvas.height - pHeight, pWidth, pHeight);
	scr.fill();
	scr.closePath();
}

function drawBrick(){

	for(let i=0; i<row; i++){
		for(let j=0; j<col; j++){
			
			if(!bricks[i][j].exist){
				continue;
			}		
			scr.beginPath();
			scr.fillStyle = 'green';
			scr.rect(bricks[i][j].x, bricks[i][j].y, bW - bWS, bH/3);
			scr.fill();
			scr.closePath();
		}
	}
}

function drawScore(){
	scr.font = '16px';
	scr.fillStyle = 'black';
	scr.fillText('score: ' + score, 14, 14);
}
function draw(){
	scr.clearRect(0, 0, canvas.width, canvas.height);
	move();
	drawBall();	
	drawPaddle();
	drawBrick();
	drawScore();
}

function loop(){
	draw();
	
	if(score == row*col){
		cancelAnimationFrame(loop);
		document.location.reload();
		alert("you win!");
	}
	
	requestAnimationFrame(loop);

	
}