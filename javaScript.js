
window.onload = init;
//Event Listeners
document.getElementById("start-button").addEventListener("click", startInterval);
document.getElementById("reset-button").addEventListener("click", resetInterval);
document.getElementById("pause-button").addEventListener("click", pauseInterval);

// let numOfBlocks = 17;
let className = "block-";
let idName = 0;
let classNum = 0;
let animationArray = [];
let animationArrayTempColorShift = [];
let tempColorValue = "";
let blockArray = [];
let intervalId;
let intervalCount = 0;
let animationTime = 0;
let timePassed = 0;
let iterationCount = 0;
let animationDirection = "";
let blockDictionary = new Object();
let blockEntryName = "block";
let startPressed = false;
let colorValue = "";

//USER INPUT VARIABLES
let numOfColors = 0;
let numOfBlocks = 0;
let userColorValueR = 0;
let userColorValueG = 0;
let userColorValueB = 0;
let userColorValue = "";
let tempUserColorValue = "";
let tempUserColorValueR = 0;
let tempUserColorValueG = 0;
let tempUserColorValueB = 0;
let inputEntered = false;

let isUserColorValid = false;
let isUserNumBlocksValid = false;

//get CSS colors
let color_0 = "";
let color_1 = "";
let color_2 = "";
let color_3 = "";

function init() {
    // addElement();
    // setBlockColor();
    //gets animation time from CSS
    // const mainDiv = document.getElementById("main");
    //need to check is the value is infinite

    // animationTime = getComputedStyle(mainDiv).getPropertyValue("--anim-time") / getComputedStyle(mainDiv).getPropertyValue("--number-of-blocks") * 1000;
    // startInterval();

    // console.log(animationTime);
    // console.log("Full animation array: " + animationArray);
}

function addElement() {
    const mainDiv = document.getElementById("main")

    tempUserColorValue = `rgb(${userColorValueR}, ${userColorValueG}, ${userColorValueB})`;
    tempUserColorValueR = userColorValueR;
    tempUserColorValueG = userColorValueG;
    tempUserColorValueB = userColorValueB;

    for (let i = 0; i < numOfBlocks; i++) {
        if (classNum > 9) {
            classNum = 0;
        } 

        className += classNum;
        blockEntryName += i;

        const newDiv = document.createElement("div");

        //creates the actual div's and adds them to the window
        newDiv.classList.add(className);
        newDiv.setAttribute("id", idName);
        mainDiv.append(newDiv);

        //OBJECT ORIENTED----------
        blockDictionary[blockEntryName] = {class: className, id: idName, color: assignColorValue(i)};
        userColorValue = tempUserColorValue;

        animationArray.push(blockDictionary);

        className = "block-";
        blockEntryName = "block";
        blockArray = [];
        blockDictionary = new Object();
        classNum++;
        idName++;
    }
}

function assignColorValue(position) {
    const mainDiv = document.getElementById("main");
    color_0 = "white"
    color_1 = tempUserColorValue;
    color_2 = adjustColorValues(-10);
    color_3 = adjustColorValues(-40);

    if (numOfColors == 1) {
        if (position == 0) {
            colorValue = color_1;
        } else {
            colorValue = color_0;
        }
    } else if (numOfColors == 2) {
        if (position == 0) {
            colorValue = color_1;
        } else if ((position == 1) || (position == numOfBlocks - 1)) {
            colorValue = color_2;
        } else {
            colorValue = color_0;
        }
    } else if (numOfColors == 3) {
        if (position == 0) {
            colorValue = color_1;
        } else if ((position == 1) || (position == numOfBlocks - 1)) {
            colorValue = color_2;
        } else if ((position == 2) || (position == numOfBlocks - 2)) {
            colorValue = color_3;
        } else {
            colorValue = color_0;
        }
    } else {
        //not valid input
    }
 
    return colorValue;
}

function blockAnimation() {
    intervalCount++;

    //get iterations from CSS
    const mainDiv = document.getElementById("main");
    iterationCount = getComputedStyle(mainDiv).getPropertyValue("--iterations");

    //checks to see if the iteration count is infinite
    if (iterationCount !== "infinite") {
        iterationCount *= numOfBlocks;

        if (intervalCount > iterationCount) {
            resetColors();
            console.log("Still running, press reset or pause to stop\nintervalId: " + intervalId);
        } 
    } 
    
    shiftColors();
    setBlockColor();
}

function resetColors() {
    for (let block in animationArray) {
        animationArray[block]["block" + block].color = color_1;
    }
    setBlockColor();
}

function setBlockColor() {
    //OBJECT ORIENTED----------
    for (let block in animationArray) {
        document.getElementById(animationArray[block]["block" + block].id).style.backgroundColor = animationArray[block]["block" + block].color;
    }
}

function shiftColors() {
    //get animation direction from CSS
    const mainDiv = document.getElementById("main");
    animationDirection = getComputedStyle(mainDiv).getPropertyValue("--anim-direction").trim();

    //OBJECT ORIENTED---------
    //gets the color value from each block and stores it an array
    for (let block in animationArray) {
        animationArrayTempColorShift.push(animationArray[block]["block" + block].color);
    }

    if (animationDirection !== "reverse") {
        //right to left
        tempColorValue = animationArrayTempColorShift.pop();
        animationArrayTempColorShift.unshift(tempColorValue);
    } else {
        //taking the first color value and moving it to the back and pushing the back one to the front (left to right)
        tempColorValue = animationArrayTempColorShift.shift();
        animationArrayTempColorShift.push(tempColorValue);
    }

    //puts the rearranged color values back into the animation array
    for (let block in animationArray) {
        //assign the color value of each object to the same index value of the temp array
        animationArray[block]["block" + block].color = animationArrayTempColorShift[block];
    }
}

function startInterval() {
    if ((!intervalId) && (startPressed == false) && (inputEntered == true)) {
        inputEntered = false;
        addElement();
        setBlockColor();
        getUserInput();

        const mainDiv = document.getElementById("main");
        console.log(`Num of blocks ${numOfBlocks}`);
        animationTime = (getComputedStyle(mainDiv).getPropertyValue("--anim-time") / numOfBlocks) * 1000;

        console.log("intervalId value before start: " + intervalId)
        startPressed = true;
        intervalId = setInterval(blockAnimation, animationTime);
        console.log("Animation started\nintervalId: " + intervalId);  
        console.log("Start button pressed: " + startPressed);  
    } else if (startPressed == true) {
        console.log("Start button was pressed twice and animation was reset");
        resetInterval();
        startInterval();
    } else if (inputEntered == false) {
        getUserInput();
        if (inputEntered == true) {
            startInterval();
        }
    }       
}

function resetInterval() {
    clearInterval(intervalId);
    console.log("Animation Complete");

    //removes all of the div's created from the first addElement
    if (animationArray.length > 0) {
        for (let block in animationArray) {
            document.getElementById(animationArray[block]["block" + block].id).remove();
        }    
    } else {
        console.log("Already reset");
    }

    animationArray = [];
    animationArrayTempColorShift = [];
    tempColorValue = "";
    intervalCount = 0;
    animationTime = 0;
    iterationCount = 0;
    idName = 0;
    classNum = 0;
    intervalId = null;
    startPressed = false;
    isUserColorValid = false;
    isUserNumBlocksValid = false;
    userColorValue = "";
    userColorValueR = 0;
    userColorValueG = 0;
    userColorValueB = 0;
    numOfBlocks = 0;
    numOfColors = 0;
    tempUserColorValue = "";
    inputEntered = false;
    document.getElementById("red-value").style.borderColor = "";
    document.getElementById("red-value").style.borderWidth = "";
    document.getElementById("green-value").style.borderColor = "";
    document.getElementById("green-value").style.borderWidth = "";
    document.getElementById("blue-value").style.borderColor = "";
    document.getElementById("blue-value").style.borderWidth = "";
    document.getElementById("num-blocks").style.borderColor = "";
    document.getElementById("num-blocks").style.borderWidth = "";
    document.getElementById("number-of-colors-input").style.borderColor = "";
    document.getElementById("pause-button").innerHTML = "Pause";

    console.log("Animation reset\nintervalId: " + intervalId);
}

//combine these into one play/pause button like music player
function pauseInterval() {
    if(!intervalId && startPressed == true) {
        //set text in button to say resume
        intervalId = setInterval(blockAnimation, animationTime);
        document.getElementById("pause-button").innerHTML = "Pause";
        console.log("Animation resumed\nintervalId:" + intervalId);
    } else if (startPressed == true) {
        //set text in button to say pause
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById("pause-button").innerHTML = "Resume";
        console.log("Animation paused\nintervalId: " + intervalId);
    }

}

function adjustColorValues(valueChange) {
    parseInt(valueChange);
    //make sure it doesn't go lower than 0 or greater than 255
    //don't change the dominant RGB, only the two that have smaller values
    userColorValueR -= valueChange;
    if (userColorValueR < 0) {
        userColorValueR = 0;
    } else if (userColorValueR > 255) {
        userColorValueR = 255;
    }

    userColorValueG -= valueChange;
    if (userColorValueG < 0) {
        userColorValueG = 0;
    } else if (userColorValueG > 255) {
        userColorValueG = 255;
    }

    userColorValueB -= valueChange;
    if (userColorValueB < 0) {
        userColorValueB = 0;
    } else if (userColorValueB > 255) {
        userColorValueB = 255;
    }

    userColorValue = `rgb(${userColorValueR}, ${userColorValueG}, ${userColorValueB})`;

    //set back to the original color (temp user color value)
    userColorValueR = tempUserColorValueR;
    userColorValueG = tempUserColorValueG;
    userColorValueB = tempUserColorValueB;

    return userColorValue;
}

// ----USER INPUT----
function getUserInput() {
    userColorValueR = document.getElementById("red-value").value;
    userColorValueG = document.getElementById("green-value").value;
    userColorValueB = document.getElementById("blue-value").value;
    numOfBlocks = document.getElementById("num-blocks").value;
    
    try {
        numOfColors = document.querySelector('input[name="num-colors"]:checked').value;
    }
    catch (err) {
        numOfColors = -1;
    }

    if (userColorValueR == "") {
        document.getElementById("red-value").style.borderColor = "red";
        document.getElementById("red-value").style.borderWidth = "3px";
        inputEntered = false;
    } else {
        document.getElementById("red-value").style.borderColor = "";
        document.getElementById("red-value").style.borderWidth = ""; 
        inputEntered = true;   
    }

    if (userColorValueG == "") {
        document.getElementById("green-value").style.borderColor = "red";
        document.getElementById("green-value").style.borderWidth = "3px";
        inputEntered = false;
    } else {
        document.getElementById("green-value").style.borderColor = "";
        document.getElementById("green-value").style.borderWidth = "";
        inputEntered = true;
    }

    if (userColorValueB == "") {
        document.getElementById("blue-value").style.borderColor = "red";
        document.getElementById("blue-value").style.borderWidth = "3px";
        inputEntered = false;
    } else {
        document.getElementById("blue-value").style.borderColor = "";
        document.getElementById("blue-value").style.borderWidth = "";
        inputEntered = true;
    }

    if (numOfBlocks == "") {
        document.getElementById("num-blocks").style.borderColor = "red";
        document.getElementById("num-blocks").style.borderWidth = "3px";
        inputEntered = false;   
    } else {
        document.getElementById("num-blocks").style.borderColor = "";
        document.getElementById("num-blocks").style.borderWidth = "";
        inputEntered = true
    }
    
    if (numOfColors == -1) {
        document.getElementById("number-of-colors-input").style.borderColor = "red";
        inputEntered = false;
    } else {
        document.getElementById("number-of-colors-input").style.borderColor = "";
        inputEntered = true;
    }
}


function getUserNumOfBlocks() {
    numOfBlocks = prompt("Enter the number of blocks (at least 5): ");

    while (isUserNumBlocksValid == false) {
        if (numOfBlocks >= 5 && (numOfColors == 1 || numOfColors == 2)) {
            isUserNumBlocksValid = true;
        } else if (numOfBlocks >= 8 && numOfColors == 3){
            isUserNumBlocksValid = true;
        } else {
            numOfBlocks = prompt("Enter the number of blocks (at least 5): ");
            isUserNumBlocksValid = false;
        }
    }
}

function getUserNumOfColors() {
    while (isUserColorValid == false) {
        numOfColors = prompt("Enter the number of colors (1-3): ");
        if (numOfColors <= 3 && numOfColors >= 1) {
            isUserColorValid = true;
        } else {
            isUserColorValid = false;
        }
    }
}

function getUserColorValue() {
    //have them enter the RGB values separately and make sure they are between 0 and 255
    while (userColorValue == false) {
        userColorValueR = parseInt(prompt("Enter a red color value: "));
        if (userColorValueR >= 0 && userColorValueR <= 255) {
            userColorValue = true;
        }
    }

    userColorValue = false;
    while (userColorValue == false) {
        userColorValueG = parseInt(prompt("Enter a green color value: "));
        if (userColorValueG >= 0 && userColorValueG <= 255) {
            userColorValue = true;
        }
    }

    userColorValue = false;
    while (userColorValue == false) {
        userColorValueB = parseInt(prompt("Enter a green color value: "));
        if (userColorValueB >= 0 && userColorValueB <= 255) {
            userColorValue = true;
        }
    }
}

