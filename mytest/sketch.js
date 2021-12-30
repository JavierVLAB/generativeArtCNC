let isPlay = true;

function keyTyped() {
  if (key == 'p' || key =='q') {
		if(isPlay){
			noLoop();
			isPlay = false;
		}
		else{
			loop();
			isPlay = true;
		}
  }
}


var myRandomSeed = 0;

var sketchParams = {
	sketchName: "",
	myWidth: 400,
	myHeight: 600
};

var params = {
	numLines: 78,
	margin: 10,
	vStep: 0.01,
	rStep: 1,
	aStep: 0.003,
	radius: 80,
	bandWidth: 3.38,
	noisePar1: 0.01,
	noisePar2: 0.01
};

var dibujar = true;

function setupGUI() {
	var gui = new dat.GUI();

	var sketchFolder = gui.addFolder('Sketch Parameters');
	sketchFolder.add(sketchParams, 'myWidth', 100, 1000, 10);
	sketchFolder.add(sketchParams, 'myHeight', 100, 1000, 10);

	var paramsFolder = gui.addFolder('Generative Parameters');
	paramsFolder.add(params, 'numLines', 0, 100, 1).onChange(function(){loop();});
	paramsFolder.add(params, 'margin', 0, 50, 1).onChange(function(){loop();});
	paramsFolder.add(params, 'vStep', -0.1, 0.1, 0.001).onChange(function(){loop();});
	paramsFolder.add(params, 'rStep', 0, 5, 0.5).onChange(function(){loop();});
	paramsFolder.add(params, 'aStep', 0, 0.1, 0.001).onChange(function(){loop();});
	paramsFolder.add(params, 'radius', 10, 100, 1).onChange(function(){loop();});
	paramsFolder.add(params, 'bandWidth', 0, 5, 0.01).onChange(function(){loop();});
	paramsFolder.add(params, 'noisePar1', 0, 0.1,0.001).onChange(function(){loop();});
	paramsFolder.add(params, 'noisePar1', 0, 0.1,0.001).onChange(function(){loop();});

	var obj = { 
		random:function(){
			myRandomSeed = int(random(50000));
			noiseSeed(myRandomSeed);
			loop();
		},
		saveSVG:function(){
			save("mySVG.svg");
		}

	};
	gui.add(obj,'random');
	gui.add(obj,'saveSVG');
}

function setup() {
	createCanvas(sketchParams.myWidth, sketchParams.myHeight,SVG);
	setupGUI();

	//myRandomSeed = minute();
	noFill();
	
	//strokeWeight(0.5);
	stroke(0, 255);
	loop();
	//console.log(params.numLines);
	noiseSeed(myRandomSeed);
}

function draw() {
	
	background(255, 255, 255);
	//background(0);
	var r = 0;
	var dr = 0;
	var x;
	var y;
	var x0 = width / 2;
	var y0 = height / 2;

	//gcode = startGcode;

	x = x0;
	y = y0;

	//gcode += gcodeLine(x, y);
	//gcode += penDOWN;
	
	for (var j = 0; j < params.numLines; j++) {
		var numAngle = 180;
		r = params.radius+j*params.rStep;
		beginShape();
		for (var i = 0; i < numAngle; i++) {
			
			dr = params.bandWidth * (0.5 - noise(i * params.noisePar1, j * params.noisePar2)) * j;
			x = x0 + (r + dr) * cos(2.0 * PI * i / numAngle + j * params.aStep);
			y = y0 + (r + dr) * sin(2.0 * PI * i / numAngle + j * params.aStep);
			curveVertex(x, y);
			//point(x,y);
			y0 += params.vStep;
			//gcode += gcodeLine(x, y);
		}
		endShape();
	}
	//gcode += penUP;
	//gcode += endGcode;
	
	noLoop();

}
