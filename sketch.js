var points = [];

var m = 0;
var b = 0;

var grad = true;
var leastsq = false;

function setup(){
  createCanvas(500,500);
}

function gradient(){
  var rate = 0.05;
  for(var i = 0; i < points.length; i++){
    var x = points[i].x;
    var y = points[i].y;

    var estimate = m * x + b;
    var error = y - estimate;

    m += (error*x) * rate;
    b += error * rate;
  }
}

function leastsquares(){
  var xsum = 0;
  var ysum = 0;
  for(var i = 0; i < points.length; i++){
    xsum += points[i].x;
    ysum += points[i].y;
  }
  var xmean = xsum/points.length;
  var ymean = ysum/points.length;

  var num = 0;
  var denom = 0;
  for(var i = 0; i < points.length; i++){
    var x = points[i].x;
    var y = points[i].y;
    num += (x - xmean) * (y - ymean);
    denom += (x - xmean) * (x - xmean);
  }

  m = num/denom;
  b = ymean - (xmean * m);


}

function mousePressed(){
  if(mouseX > 0 && mouseX < 510 && mouseY > 0 && mouseY < 510){
    var xnew = map(mouseX, 0, width, 0 , 1);
    var ynew = map(mouseY, 0, height, 1, 0);
    var newpoint = createVector(xnew, ynew);
    points.push(newpoint);
  }
}

function drawLine(){
  var x1 = 0;
  var x2 = 1;
  var y1 = m * x1 + b;
  var y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, width);
  x2 = map(x2, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  y2 = map(y2, 0, 1, height, 0);

  stroke(0);
  line(x1, y1, x2, y2);
}

function draw(){
  background('#fff2d8');

  for(var i = 0; i < points.length; i++){
    var x = map(points[i].x, 0, 1, 0, width);
    var y = map(points[i].y, 0, 1, height, 0);

    var xcolor = x/2;
    var ycolor = y/2;
    var color = (xcolor + ycolor)/2;

    noStroke();
    fill(xcolor, ycolor, color);
    ellipse(x, y, 6, 6);
  }

  if(points.length > 1){
    if(leastsq){
      leastsquares();
    }else{
      gradient();
    }
    drawLine();
  }
}
