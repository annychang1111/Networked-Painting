var remoteHost, remotePort, localPort, button;
var connectTo;
var hideReHoVal, hideRePoVal, hideLoPoVal;
var hiddenReHo = 0;
var hiddenRePo = 0;
var hiddenLoPo = 0;
var connecting;
var state = 0;

var strokeWei = 10;
var r;
var g;
var p;

var reHost, rePort, loPort;

var getStrokeWei;
var getR, getG, getB;
var getMouseX, getMouseY, getPmouseX, getPmouseY;

var osc = require('node-osc');

function setup() {
 	// createCanvas(displayWidth, displayHeight);
	createCanvas(800, 600);
	background(255);
	connectTo();

	textSize(40);
	textAlign(CENTER);
	textStyle(BOLD);
	text("Networked Painting", width/2, height/2-90);

	textSize(14);
	textAlign(CENTER);
	textStyle(ITALIC);
	text("Let's draw together!", width/2, height/2-70);

	strokeWeight(strokeWei);
	colorMode(RGB);

	r = random(0, 255);
	g = random(0, 255);
	p = random(0, 255);
}


function draw() {
}

function mouseDragged() {
	if(state == 1){
		strokeWeight(strokeWei);
		stroke(r, g, p);
		line(mouseX, mouseY, pmouseX, pmouseY);
		sendData();
	}
}

function keyPressed() {
	if (keyCode == 82) {
		r = (random(0, 255));
	}
	if(keyCode == 71){
		g = (random(0, 255));
	}
	if(keyCode == 66){
		p = (random(0, 255));
	}
	if(key == ' '){
		background(255);
	}
	if(keyCode == 69){
		r=g=p=255;
	}
	if(keyCode == 189){
		strokeWei--;
	}else if(keyCode == 187){
		strokeWei++;
	}
}

function connectTo() {
	if(state == 0){

		remoteHost = createInput('Remote Host');
		remoteHost.size(100);
		remoteHost.position(width/2 - 205, height/2 - 45);
		remoteHost.style('height', '18px');
		remoteHost.style('text-align', 'center');
		remoteHost.style('color', 'gray');
		remoteHost.style('border-radius', '4px');
		remoteHost.input(hideReHoVal);

		remotePort = createInput('Remote Port');
		remotePort.size(100);
		remotePort.position(remoteHost.x + remoteHost.width + 5, height/2 - 45);
		remotePort.style('height', '18px');
		remotePort.style('text-align', 'center');
		remotePort.style('color', 'gray');
		remotePort.style('border-radius', '4px');
		remotePort.input(hideRePoVal);

		localPort = createInput('Local Port');
		localPort.size(100);
		localPort.position(remotePort.x + remotePort.width + 5, height/2 - 45);
		localPort.style('height', '18px');
		localPort.style('text-align', 'center');
		localPort.style('color', 'gray');
		localPort.style('border-radius', '4px');
		localPort.input(hideLoPoVal);

		button = createButton('Connect !');
		button.size(100);
		button.position(localPort.x + localPort.width + 5, height/2 - 45);
		button.style('height', '25px');
		button.style('padding', '1px 3px');
		button.style('border-style', 'none');
		button.style('background-color', '#d8d8d8');
		button.style('color', '#2d2d2d')
		button.style('border-radius', '4px');
		button.mousePressed(connecting);


	}
}

function hideReHoVal() {
	if(hiddenReHo == 0){
		remoteHost.value('');
		hiddenReHo = 1;
	}
	reHost = remoteHost.value();
}

function hideRePoVal() {
	if(hiddenRePo == 0){
		remotePort.value('');
		hiddenRePo = 1;
	}
	rePort = remotePort.value();
}

function hideLoPoVal() {
	if(hiddenLoPo == 0){
		localPort.value('');
		hiddenLoPo = 1;
	}
	loPort = localPort.value();
}


function connecting() {
	background(255);
	state = 1;
	remotePort.hide();
	remoteHost.hide();
	localPort.hide();
	button.hide();

	remoteDraw();
}

function sendData() {
  	r = floor(r);
  	g = floor(g);
  	p = floor(p);

	var client = new osc.Client(reHost, loPort);
	client.send('/brushWei', strokeWei, '/brushMouseX', mouseX, '/brushMouseY', mouseY, '/brushPmouseX', pmouseX, '/brushPmouseY', pmouseY,'/brushColorRGB', r, g, p, function(){
	});
}

function remoteDraw() {


	var oscServer = new osc.Server(rePort, '0.0.0.0');
	oscServer.on("message", function(msg, rinfo){

		getStrokeWei = msg[1];

		getMouseX = msg[3];
		getMouseY = msg[5];
		getPmouseX = msg[7];
		getPmouseY = msg[9];

		getR = msg[11];
		getG = msg[12];
		getB = msg[13];

		strokeWeight(getStrokeWei);
		stroke(getR, getG, getB);
		line(getMouseX, getMouseY, getPmouseX, getPmouseY);
	});


}

