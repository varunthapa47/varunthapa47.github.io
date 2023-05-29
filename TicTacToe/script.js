console.log("Welcome to Tic-Tac-Toe <3")

let music = new Audio("music.mp3");
let turnAudio = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let isgameOver = false;

let turn = "X";

// fuction to change the turn 
const changeTurn=()=>{

   return turn === "X"?"0":"X";
}
// function to check win

const checkWin=()=>{

let boxtext = document.getElementsByClassName("boxtext");
let wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
 
wins.forEach(e=>{

    if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")){

        document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
        isgameOver = true;
        gameOver.play();
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '200px';
    }
    

})

}

//Game Logic
let boxs = document.getElementsByClassName("box");
Array.from(boxs).forEach(element=>{

    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click',()=>{

        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            turnAudio.play();
            checkWin();
            if(!isgameOver){
            document.getElementsByClassName("info")[0].innerText = "Turn For " + turn;
            }
        }
    })

})

// draw

// add onclick listener to reset button

reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})