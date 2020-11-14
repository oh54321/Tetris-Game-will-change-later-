
let img;
function preload() {
  img = loadImage('assets/token.png');
}
function setup() {
  createCanvas(800, 1600);
}
var arr = []
  var mat = []
  var i
  var j
  for(i=0;i<6;i++)
    {
      arr=[]
      for(j=0;j<6;j++)
        {
          arr.push(0)
        }
      mat.push(arr)
    }
var turn = 1
function draw() {
  background(220);
  image(img, mouseX, mouseY, 50, 50)
  if(mouseX > 150)
    {
  c = color(0, 0, 0);
fill(c);
noStroke();
    }
  else
    {
      c = color(255, 255, 255);
fill(c);
noStroke();
    }
  rect(150, 50, 20, 300)
  rect(250, 50, 20, 300)
  rect(55, 125, 300, 20)
  rect(55, 225, 300, 20)
}