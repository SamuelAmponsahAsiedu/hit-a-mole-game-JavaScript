let scoreH2 = document.getElementById('score');
let timeLeftH2 = document.getElementById('TimeLeft');
let startNewGameButton = document.getElementById('startNewGame');
let pauseGameButton = document.getElementById('pauseGame');
let squares = document.querySelectorAll('.square');
let grid = document.getElementsByClassName('grid');


let gameMusic = new Audio('../Assets/gameMusic.mp3')
let hitMusic = new Audio('../Assets/hitMusic.mp3')

let score = 0;
let timeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

// randomly place my mole
function randomMole(){
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    //math.random gives us random value from 0-1 but 1 is not included
    let randomSquare = squares[Math.floor(Math.random()*squares.length)];  // 0 to 8
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}
randomMole();

function countDown(){
    timeLeft--;
    timeLeftH2.innerHTML = `Time Left: ${timeLeft}`;
    console.log(timeLeft)

    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
        grid.style.display = 'none';

    }
}


function startGame() {
    score=0;
    timeLeft = 60;

    scoreH2.innerHTML = 'Your score: 0';
    timeLeft.innerHTML = 'Time Left: 60';
    // grid.style.display = 'flex';
    pauseGameButton.style.display = 'inline-block';
    pauseGameButton.innerHTML = 'Pause';
    gameMusic.play();
    // callback function
    //setInterval calls function at regular interval 
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000)
}

function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseGameButton.textContent = 'Resume';
    }else{
        gameMusic.play();
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000)
        pauseGameButton.textContent = 'Pause';
    }
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(timerId !== null){
            if(square.id === hitPosition) {
                hitMusic.play();
                // setTimeout(() => {hitMusic.pause()}, 1000);
                score++;
                scoreH2.innerText = `You score ${score}`;
                hitPosition = null;
            }

        }
    })
})


startNewGameButton.addEventListener('click', startGame);
pauseGameButton.addEventListener('click', pauseResumeGame);