let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"]; 
let h2 = document.querySelector("h2");
let flashTimeout;

let started = false;
let level = 0;

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game on");
        started = true;

        levelup();
    }
});

function levelup() {
    level++;
    h2.innerText = `Level ${level}`;
    
    let randIndx = Math.floor(Math.random() * 4);
    let randcolor = btns[randIndx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    btnFlash(randbtn);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    flashTimeout = setTimeout(function () {
        btn.classList.remove("flash");
    }, 1000);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 1000);
}

function checkans() {
    for (let i = 0; i < userSeq.length; i++) {
        if (userSeq[i] !== gameSeq[i]) {
            // Handle wrong answer logic here
            h2.innerText="game over!!!! press any key to restart the game ";
            reset();
            return;
        }
    }
    if (userSeq.length === gameSeq.length) {
        console.log("Correct sequence!");
        userSeq = []; 
        console.log(gameSeq);// Clear user sequence for the next level
        setTimeout(levelup, 1000);
    }
}

function btnpress() {
    let btn = this;
    clearTimeout(flashTimeout); // Clear ongoing button flash timeout
    userFlash(btn);
    
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    checkans(); // Check user answer after each button press
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
};
function reset( ) {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

