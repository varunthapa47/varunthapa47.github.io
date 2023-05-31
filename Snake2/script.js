
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
let musicIcon = document.getElementById("music");
let gameSound = true;


const sound=()=>{

  if(gameSound === true){
     
      gameSound = false;
      snakeSound.pause();
  }
  else
  {
    gameSound = true;
    snakeSound.play();
    snakeSound.loop = true;
  }
}




musicIcon.addEventListener("click",sound);
let foodSound = new Audio("food.wav");
let gameOverSound = new Audio("gameOver.wav");
let snakeSound = new Audio("snakeTheme.mp3");
let start = false;
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0,velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `HighScore: ${highScore}`;

const changeFoodPosition=()=>{

    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    
}

const handleGameOver=()=>{
    clearInterval(setIntervalId);
    // gameOverSound.play();
    snakeSound.pause();
    alert("GameOver! Press Ok to Play Again...")
    location.reload();
}


const changeDirection=(e)=>{

    if(e.key === "ArrowUp" && velocityY !== 1 )
    {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY !== -1)
    {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowLeft" && velocityX !== 1)
    {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX !== -1)
    {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach((key) => {

    key.addEventListener("click",() => changeDirection({key : key.dataset.key }));
})
const initGame=()=>{
    if(gameSound){
     snakeSound.play();
     snakeSound.loop = true;
     }
    if(gameOver) return handleGameOver();
    
    let htmlMarkup = `<div class="food" style = "grid-area : ${foodY} / ${foodX} "> </div>`;

    if(snakeX === foodX && snakeY === foodY){
        foodSound.play();
        snakeBody.push([foodX,foodY]);
        changeFoodPosition();
        score++;
        
        highScore = score > highScore? score: highScore;
        localStorage.setItem("high-score",highScore);  
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `HighScore: ${highScore}`;
    }


    
    for(let i=snakeBody.length-1; i>0; i--){

        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX,snakeY];


    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX > 30 || snakeY <= 0 || snakeX <= 0 || snakeY > 30){
        gameOverSound.play();
        gameOver = true;

    }

    for(let i = 0; i<snakeBody.length; i++){

        htmlMarkup += `<div class="snake" style = "grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]} "> </div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOverSound.play();
            gameOver = true;
        }
    }
    
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();

setIntervalId = setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);
