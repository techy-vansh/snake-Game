let inputDir = {x: 0,y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let score =document.querySelector("#score");
let hiscoreBox = document.querySelector("#hiScoreBox")
let speed = 10;
let lastSpeedTime = 0;
let snakeArr = [
    {x: 13,y:15}
]
let food = {x: 3,y:9}
let lastpastTime = 0;
let scored = 0;

function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime-lastpastTime)/1000<1/speed){
        return;
    }
    lastpastTime = ctime;
    gameEngine();

}

function iscollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
        
    }
        
    return false;
}


function gameEngine(){
    // part 1 : updating the snake and food
    if(iscollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir= {x:0,y:0};
        alert("Game is Over. Please enter any key to play.");
        snakeArr = [{x: 13, y: 15}];
        // musicSound.play();
        scored = 0;
        score.innerHTML = "Score : " + 0;
        
    }
    // if you have eaten the food , then increment the score and regenerate the food.
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a=2;
        let b = 16;
        food = {x: Math.round( a+(b-a)*Math.random()) ,
             y:Math.round(a+(b-a)*Math.random())
            }
            foodSound.play();
            scored++;
            score.innerHTML = "Score :" + scored;
            if(scored>hiscoreval){
                hiscoreval = scored;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "HiScore : " + hiscoreval;
            }

    }

    // move the snake
    for(let i = snakeArr.length-2; i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
   

     //part 2 : display the food and snake
    // snake element
    board.innerText = "";
    snakeArr.forEach((el,index)=>  {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = el.y;
        snakeElement.style.gridColumnStart = el.x;
       
        if(index=== 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    // food element 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    // inputDir={x:0,y:1}
    // musicSound.play();
    moveSound.play();
    switch(e.key){
        case "ArrowUp" :
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1
            break;
        case "ArrowDown" :
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1
            break;
        case "ArrowLeft" :
            console.log("ArrowLeft");
            inputDir.x = -1; 
            inputDir.y = 0; 
            break;
        case "ArrowRight" :
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default :
            break;
    }
});
