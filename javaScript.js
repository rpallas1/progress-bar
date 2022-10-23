window.onload = init;

let className = "block-";
let idName = 0;
let classNum = 0;
let animationArray = [];
let animationArrayTempColorShift = [];
let tempColorValue = "";
let blockArray = [];
let intervalId;
let intervalCount = 0;
let timePassed = 0;
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
let animationTime = 0;
let iterationCount = 0;
let totalIterations = 0;
let tempUserColorValue = "";
let tempUserColorValueR = 0;
let tempUserColorValueG = 0;
let tempUserColorValueB = 0;
let startTwice = false;
let adjustValue = -10;
let tempAnimationTime = 1;

let isUserColorValid = false;
let isUserNumBlocksValid = false;

function init() {
    //Event Listeners for start, pause, and reset buttons (both versions)
    document.getElementById("start-button").addEventListener("click", startInterval);
    document.getElementById("reset-button").addEventListener("click", resetInterval);
    document.getElementById("pause-button").addEventListener("click", pauseInterval);

    //Event Listeners for increment buttons (version 2.0)
    document.getElementById("num-blocks-increase").addEventListener("click", numBlocksIncrease);
    document.getElementById("num-blocks-decrease").addEventListener("click", numBlocksDecrease);

    document.getElementById("num-colors-increase").addEventListener("click", numColorsIncrease);
    document.getElementById("num-colors-decrease").addEventListener("click", numColorsDecrease);

    document.getElementById("animation-time-increase").addEventListener("click", animTimeIncrease);
    document.getElementById("animation-time-decrease").addEventListener("click", animTimeDecrease);

    document.getElementById("iteration-count-increase").addEventListener("click", iterationCountIncrease);
    document.getElementById("iteration-count-decrease").addEventListener("click", iterationCountDecrease);

    document.getElementById("animation-direction").addEventListener("click", animationDirectionButton);

    document.getElementById("reset-size").addEventListener("click", resetSize);

    getUserInput("num-blocks", "animation-time", "iteration-count", "num-colors", "color-value");
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

        //---- OBJECT ORIENTED ----
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
    if ((numOfColors * 2) - 1 > numOfBlocks) {
        numOfColors = (numOfBlocks / 2) + 1;
    }

    if (position < numOfColors) {
        colorValue = adjustColorValues(position * adjustValue);
        
        return colorValue;
    } else if  ((numOfBlocks - position) < numOfColors) {
        adjustValue = -10;
        colorValue = adjustColorValues((numOfBlocks - position) * adjustValue);
        
        return colorValue;
    } else {
        const mainDiv = document.getElementById("main");
        colorValue = getComputedStyle(mainDiv).getPropertyValue("--div-background-color").trim();

        return colorValue;
    }
}

function blockAnimation() {
    intervalCount++;

    //checks to see if the iteration count is infinite
    if (iterationCount !== "infinite") {
        iterationCount *= numOfBlocks;

        if (intervalCount > iterationCount) {
            //!---- BUG ----
            //!Still need to stop animation ofter the resetColors() runs
            //one fix is to throw an error, stops the program
            resetColors();
            console.log("Still running, press reset or pause to stop\nintervalId: " + intervalId);
        } 
    } 
    
    shiftColors();
    setBlockColor();
    iterationCount /= numOfBlocks;
}

function resetColors() {
    for (let block in animationArray) {
        animationArray[block]["block" + block].color = tempUserColorValue;
    }
    setBlockColor();
}

function setBlockColor() {
    //---- OBJECT ORIENTED ----
    for (let block in animationArray) {
        document.getElementById(animationArray[block]["block" + block].id).style.backgroundColor = animationArray[block]["block" + block].color;
    }
}

function shiftColors() {
    //---- OBJECT ORIENTED ----
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
    if ((!intervalId) && (startPressed == false)) {
        getUserInput("num-blocks", "animation-time", "iteration-count", "num-colors", "color-value");
        addElement();
        setBlockColor();

        //calculate the animation time
        animationTime = (animationTime / numOfBlocks) * 1000;

        startPressed = true;
        intervalId = setInterval(blockAnimation, animationTime);
        console.log("Start button pressed");  
    } else if (startPressed == true) {
        console.log("Start button was pressed twice and animation was reset");
        startTwice = true;
        resetInterval();
        startInterval();
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
    tempUserColorValue = "";
    adjustValue = -10;

    // resetSize();
    //set input borders back to normal 
    // //TODO: make function for reset borders (if even needed)
    document.getElementById("num-blocks").style.borderColor = "";
    document.getElementById("num-blocks").style.borderWidth = "";
    document.getElementById("animation-time").style.borderColor = "";
    document.getElementById("animation-time").style.borderWidth = "";
    document.getElementById("iteration-count").style.borderColor = "";
    document.getElementById("iteration-count").style.borderWidth = "";
    document.getElementById("num-colors").style.borderColor = "";
    document.getElementById("num-colors").style.borderWidth = "";
    document.getElementById("pause-button").innerHTML = "Pause";

    if (startTwice == false) {
        numOfBlocks = document.getElementById("num-blocks").value = 20;
        animationTime = document.getElementById("animation-time").value = 1;
        iterationCount = document.getElementById("iteration-count").value = 10;
        numOfColors = document.getElementById("num-colors").value = 8;
        document.getElementById("color-value").value = "#0000ff";
        document.getElementById("animation-direction").innerHTML = "Direction: Normal";
        tempAnimationTime = 1;
        resetSize();
    } else {
        startTwice = false;
    }
 }

function pauseInterval() {
    if(!intervalId && startPressed == true) {
        //set text in button to say resume
        intervalId = setInterval(blockAnimation, animationTime);
        document.getElementById("pause-button").innerHTML = "Pause";
        console.log("Animation resumed");
    } else if (startPressed == true) {
        //set text in button to say pause
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById("pause-button").innerHTML = "Resume";
        console.log("Animation paused");
    }
}

function adjustColorValues(valueChange) {
    //change to adjust hex color
    parseInt(valueChange);

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

// ---- USER INPUT ----
function getUserInput(numBlocksID, animTimeID, iterationCountID, numColorsID, colorValueID) {
    numOfBlocks = document.getElementById(numBlocksID).value;
    animationTime = document.getElementById(animTimeID).value;
    iterationCount = document.getElementById(iterationCountID).value;
    numOfColors = document.getElementById(numColorsID).value;
    colorValue = document.getElementById(colorValueID).value;

    //converts the Hex color to RGB
    colorValue = colorValue.slice(1, 8);
    colorValue = colorValue.match(/.{1,2}/g);
    userColorValueR = parseInt(colorValue[0], 16);
    userColorValueG = parseInt(colorValue[1], 16);
    userColorValueB = parseInt(colorValue[2], 16);

    if (numOfBlocks == "") {
        document.getElementById(numBlocksID).style.borderColor = "red";
        document.getElementById(numBlocksID).style.borderWidth = "2px";

        //default input
        numOfBlocks = 20;
    } else {
        document.getElementById(numBlocksID).style.borderColor = "";
        document.getElementById(numBlocksID).style.borderWidth = "";
        inputEntered = true
    }
    
    if (animationTime == "") {
        document.getElementById("animation-time").style.borderColor = "red";
        document.getElementById("animation-time").style.borderWidth = "2px";

        //default input
        animationTime = 1;
    } else {
        document.getElementById("animation-time").style.borderColor = "";
        document.getElementById("animation-time").style.borderWidth = "";
        inputEntered = true
    }

    if (iterationCount == "") {
        document.getElementById("iteration-count").style.borderColor = "red";
        document.getElementById("iteration-count").style.borderWidth = "2px";

        //default input
        iterationCount = 10;
    } else {
        document.getElementById("iteration-count").style.borderColor = "";
        document.getElementById("iteration-count").style.borderWidth = "";
        inputEntered = true
    }

    if (numOfColors == "") {
        document.getElementById("num-colors").style.borderColor = "red";
        document.getElementById("num-colors").style.borderWidth = "2px";

        //default input
        numOfColors = 8;
    } else {
        document.getElementById("num-colors").style.borderColor = "";
        document.getElementById("num-colors").style.borderWidth = "";
        inputEntered = true
    }
}