let numSquares = 6;
let colors =[];
let pickedColor;

let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let heading = document.querySelector("#heading");
let restartButton = document.getElementById("restart");
let modeButtons = document.querySelectorAll(".mode");


init();


// Restart Game Button
restartButton.addEventListener("click", reset);


function init() {
    setupModeButtons();
    setUpSquares();
    reset();
}


//Mode buttons click listeners
function setupModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            switch (i) {
                case 0:
                    numSquares = 3;
                    break;
                case 1:
                    numSquares = 6;
                    break;
            }
            reset();
        });
    }
}


//Square click listeners and game logic
function setUpSquares() {
    for (let i = 0; i < squares.length; i++) {
        //Add click listeners
        squares[i].addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                changeColors(pickedColor);
                restartButton.textContent = "Play Again?"
            }
            else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}


function reset(){
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick a new random colo from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    //set the visibility of squares according to mode and change colors of squares
    for (let i=0; i< squares.length; i++){
        if (i < numSquares) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else
            squares[i].style.display = "none";
    }

    //restore color of the heading
    heading.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    restartButton.textContent = "New Colors";
}


function changeColors(color) {
    for(let i = 0 ; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
    heading.style.backgroundColor = color;
}


function pickColor() {
    return colors[randInt(0,colors.length-1)];;
}



function generateRandomColors(num) {
    let arr = [];
    for(let i =0; i <num; i++){
        arr.push(getRandomRGB())
    }
    return arr;

    function getRandomRGB() {
        let r = randInt(0, 255);
        let g = randInt(0, 255);
        let b = randInt(0, 255);
        return "rgb("+ r.toString()+ ", "+ g.toString()+", "+b.toString()+")";
    }
}


function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}