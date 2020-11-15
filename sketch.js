
let board;
let token1;
let token2;
function preload() {
  board = loadImage('assets/board.png');
  token1 = loadImage('assets/token1.png');
  token2 = loadImage('assets/token2.png');
  w1 = loadImage('assets/wins1.png')
  w2 = loadImage('assets/wins2.png')
  wt = loadImage('assets/wint.png')
  w1p = loadImage('assets/playdown1.png')
  w2p = loadImage('assets/playdown2.png')
  wtp = loadImage('assets/playdownt.png')
  w1s = loadImage('assets/settingsdown1.png')
  w2s = loadImage('assets/settingsdown2.png')
  wts = loadImage('assets/settingsdownt.png')
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
var isEnd = false
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
function rotateL(mat, maxs)
{
  var mat2 = []
  var arr2 = []
  var i
  var j
  for(i = 0; i < mat[0].length; i++)
    {
      arr2 = []
      for(j = 0; j < mat.length; j++)
        {
          arr2.push(0)
        }
      mat2.push(arr2)
    }
  var ind
  for(i = 0; i < mat.length; i++)
    {
      for(j = 0; j < mat.length; j++)
        {
          mat2[(mat.length-1)-j][i]=mat[i][j]
        }
    }
  for(i = 0; i < mat.length; i++)
    {
      for(j = mat.length-1; j >= 0; j--)
        {
          mat[i][j] = 0
        }
    }
  for(i = 0; i < mat.length; i++)
    {
      ind = 5;
      maxs[i] = 5
      for(j = mat.length-1; j >= 0; j--)
        {
          if(mat2[i][j] != 0)
            {
              mat[i][ind] = mat2[i][j]
              ind--;
              maxs[i]--;
            }
        }
    }
}
function rotateR(mat, maxs)
{
  var mat2 = []
  var arr2 = []
  var i
  var j
  for(i = 0; i < mat[0].length; i++)
    {
      arr2 = []
      for(j = 0; j < mat.length; j++)
        {
          arr2.push(0)
        }
      mat2.push(arr2)
    }
  var ind
  for(i = 0; i < mat.length; i++)
    {
      for(j = 0; j < mat.length; j++)
        {
          mat2[j][(mat.length-1)-i]=mat[i][j]
        }
    }
  for(i = 0; i < mat.length; i++)
    {
      for(j = mat.length-1; j >= 0; j--)
        {
          mat[i][j] = 0
        }
    }
  for(i = 0; i < mat.length; i++)
    {
      ind = 5;
      maxs[i] = 5
      for(j = mat.length-1; j >= 0; j--)
        {
          if(mat2[i][j] != 0)
            {
              mat[i][ind] = mat2[i][j]
              ind--;
              maxs[i]--;
            }
        }
    }
}
function keyPressed() {
    var temp = checkWin(mat)
  var i
  if(temp == 0)
    {
  if (keyCode === LEFT_ARROW) {
    rotateL(mat,maxs);
    turn = 3-turn
  } 
  if (keyCode === RIGHT_ARROW) {
    rotateR(mat,maxs);
    turn = 3-turn
  } }
}
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
  for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[0].length; j++) {
            if(arr[i][j] == 0)
            {
              return 0
            }  
            }
        }
    
    return 3
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
  var temp = checkWin(mat)
  var i
  var s = min(windowWidth, windowHeight)/400
  var x1 = (windowWidth/s-300)/(2)
    if(temp == 0 && 0 <= (mouseX/s-x1) <= 300 && maxs[Math.floor((mouseX/s-x1)/50)] >= 0)
      {
        mat[Math.floor((mouseX/s-x1)/50)][maxs[Math.floor((mouseX/s-x1)/50)]] = turn
        maxs[Math.floor((mouseX/s-x1)/50)]--;
        turn = 3-turn;
      }
  if(temp != 0)
    {
      if(mouseX/s>=x1+150-50 && x1+150+49>=mouseX/s && mouseY/s >= 102 && mouseY/s <= 132)
        {
          for(i = 0; i < 6; i++)
            {
              for(j = 0; j < 6;j++)
                {
                  mat[i][j] = 0
                }
              maxs[i] = 5
            }
          turn = 1
          isEnd = false
        }
    }

}

function draw() {
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
              if(isEnd == false && 50*i <= (mouseX/s-x1) && (mouseX/s-x1) < 50*(i+1))
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
  var temp = checkWin(mat)
  if(temp != 0)
    {
      isEnd = true
      if(temp == 1)
        {
          if(mouseX/s>=x1+150-50 && x1+150+49>=mouseX/s && mouseY/s >= 102 && mouseY/s <= 132)
            {
              image(w1p, x1+150-125, 50, 250, 130)
            }
          else if(mouseX/s>=x1+150-50 && x1+150+49>=mouseX/s && mouseY/s >= 138 && mouseY/s <= 171)
            {
              image(w1s, x1+150-125, 50, 250, 130)
            }
          else
            {
          image(w1, x1+150-125, 50, 250, 130)
            }
        }
      if(temp == 2)
        {
          if(mouseX/s>=x1+150-50 && x1+150+49>=mouseX/s && mouseY/s >= 102 && mouseY/s <= 132)
            {
              image(w2p, x1+150-125, 50, 250, 130)
            }
          else if(mouseX/s>=x1+150-50 && x1+150+49>=mouseX/s && mouseY/s >= 138 && mouseY/s <= 171)
            {
              image(w2s, x1+150-125, 50, 250, 130)
            }
          else
            {
          image(w2, x1+150-125, 50, 250, 130)
            }
        }
      if(temp == 3)
        {
          if(mouseX/s>=x1+150-50 && x1+150+49>=mouseX/s && mouseY/s >= 102 && mouseY/s <= 132)
            {
              image(wtp, x1+150-125, 50, 250, 130)
            }
          else if(mouseX/s>=x1+150-50 && x1+150+49>=mouseX/s && mouseY/s >= 138 && mouseY/s <= 171)
            {
              image(wts, x1+150-125, 50, 250, 130)
            }
          else
            {
          image(wt, x1+150-125, 50, 250, 130)
            }
        }
    }
}
