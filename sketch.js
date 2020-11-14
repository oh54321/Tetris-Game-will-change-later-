
let board;
let token1;
let token2;
function preload() {
  board = loadImage('assets/board.jpg');
  token1 = loadImage('assets/token1.png');
  token2 = loadImage('assets/token2.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
var maxs = []
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
      maxs.push(5)
    }
var turn = 1

function checkWin(arr) {
    //Columns
    for (i = 0; i < arr.length-3; i++) {
        for (j = 0; j < arr[0].length; j++) {
            let section = arr.slice(i,i+4).map(k => k[j])
            let win = checkWinSet(section)
            if (win != 0) {
                return win
            }
        }
    }
    //Rows
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[0].length-3; j++) {
            let section = arr[i].slice(j,j+4)
            let win = checkWinSet(section)
            if (win != 0) {
                return win
            }
        }
    }
    //Downward diagonals
    for (i = 0; i < arr.length-3; i++) {
        for (j = 0; j < arr[0].length-3; j++) {
            let section = [arr[i][j],arr[i+1][j+1],arr[i+2][j+2],arr[i+3][j+3]]
            let win = checkWinSet(section)
            if (win != 0) {
                return win
            }
        }
    }
    //Upward diagonals
    for (i = 3; i < arr.length; i++) {
        for (j = 0; j < arr[0].length-3; j++) {
            let section = [arr[i][j],arr[i-1][j+1],arr[i-2][j+2],arr[i-3][j+3]]
            let win = checkWinSet(section)
            if (win != 0) {
                return win
            }
        }
    }
    return 0
}
function checkWinSet(arr) {
    if(arr.every( v => v === arr[0])) {
        return arr[0]
    }
    else {
        return 0
    }
}
function mouseClicked() {
  var s = min(windowWidth, windowHeight)/400
  var x1 = (windowWidth/s-300)/(2)
    if(0 <= (mouseX/s-x1) <= 300 && maxs[Math.floor((mouseX/s-x1)/50)] >= 0)
      {
        mat[Math.floor((mouseX/s-x1)/50)][maxs[Math.floor((mouseX/s-x1)/50)]] = turn
        maxs[Math.floor((mouseX/s-x1)/50)]--;
        turn = 3-turn;
      }

}

function draw() {
  if(checkWin(mat) != 0)
    {
      
    }
  background(255,255,255);
  var s = min(windowWidth, windowHeight)/400
  var x1 = (windowWidth/s-300)/(2)
  scale(s)
  image(board, x1, 0, 300, 300)
  var i
  var j
  for(i = 0; i < 6;i++)
    {
      for(j=0;j < 6;j++)
        {
          if(mat[i][j] == 0)
            {
              ellipse(x1+50*i+25, 50*j+25, 40)
              if(50*i <= (mouseX/s-x1) && (mouseX/s-x1) < 50*(i+1))
                {
                  if(turn == 1)
                    {
                      image(token1,x1+50*i+5, 50*maxs[i]+5, 40,40)
                    }
                  else
                    {
                      image(token2,x1+50*i+5, 50*maxs[i]+5, 40,40)
                    }
                }
            }
          else if(mat[i][j] == 1)
            {
              image(token1,x1+50*i+5, 50*j+5, 40,40)
            }
          else
            {
              image(token2,x1+50*i+5, 50*j+5, 40,40)
            }
        }
    }
}