window.onload = init;

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

let isUserColorValid = false;
let isUserNumBlocksValid = false;

//get CSS colors
let color_0 = "";
let color_1 = "";
let color_2 = "";
let color_3 = "";
let color_4 = "";
let color_5 = "";

function init() {
    //Event Listeners
    document.getElementById("start-button").addEventListener("click", startInterval);
    document.getElementById("reset-button").addEventListener("click", resetInterval);
    document.getElementById("pause-button").addEventListener("click", pauseInterval);
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
    if (position < numOfColors) {
        colorValue = adjustColorValues(position * adjustValue);
        
        return colorValue;
    } else if  ((numOfBlocks - position) < numOfColors) {
        adjustValue = -10;
        colorValue = adjustColorValues((numOfBlocks - position) * adjustValue);
        
        return colorValue;
    } else {
        colorValue = "white";
        return colorValue;
    }

    // color_0 = "white"
    // color_1 = tempUserColorValue;
    // color_2 = adjustColorValues(-10);
    // color_3 = adjustColorValues(-30);
    // color_4 = adjustColorValues(-50);
    // color_5 = adjustColorValues(-70);

    // if (numOfColors == 1) {
    //     if (position == 0) {
    //         colorValue = color_1;
    //     } else {
    //         colorValue = color_0;
    //     }
    // } else if (numOfColors == 2) {
    //     if (position == 0) {
    //         colorValue = color_1;
    //     } else if ((position == 1) || (position == numOfBlocks - 1)) {
    //         colorValue = color_2;
    //     } else {
    //         colorValue = color_0;
    //     }
    // } else if (numOfColors == 3) {
    //     if (position == 0) {
    //         colorValue = color_1;
    //     } else if ((position == 1) || (position == numOfBlocks - 1)) {
    //         colorValue = color_2;
    //     } else if ((position == 2) || (position == numOfBlocks - 2)) {
    //         colorValue = color_3;
    //     } else {
    //         colorValue = color_0;
    //     }
    // } else if (numOfColors == 4) {
    //     if (position == 0) {
    //         colorValue = color_1;
    //     } else if ((position == 1) || (position == numOfBlocks - 1)) {
    //         colorValue = color_2;
    //     } else if ((position == 2) || (position == numOfBlocks - 2)) {
    //         colorValue = color_3;
    //     } else if ((position == 3) || (position == numOfBlocks - 3)) {
    //         colorValue = color_4;
    //     } else {
    //         colorValue = color_0;
    //     }
    // }  else if (numOfColors == 5) {
    //     if (position == 0) {
    //         colorValue = color_1;
    //     } else if ((position == 1) || (position == numOfBlocks - 1)) {
    //         colorValue = color_2;
    //     } else if ((position == 2) || (position == numOfBlocks - 2)) {
    //         colorValue = color_3;
    //     } else if ((position == 3) || (position == numOfBlocks - 3)) {
    //         colorValue = color_4;
    //     } else if ((position == 4) || (position == numOfBlocks - 4)) {
    //         colorValue = color_5;
    //     } else {
    //         colorValue = color_0;
    //     }
    // } else {
    //     //not valid input
    // }
 
    // return colorValue;
}

function blockAnimation() {
    intervalCount++;

    //checks to see if the iteration count is infinite
    if (iterationCount !== "infinite") {
        iterationCount *= numOfBlocks;

        if (intervalCount > iterationCount) {
            //---- BUG ----
            //Still need to stop animation ofter the resetColors() runs 
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
        animationArray[block]["block" + block].color = color_1;
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
    //get animation direction from CSS
    const mainDiv = document.getElementById("main");
    animationDirection = getComputedStyle(mainDiv).getPropertyValue("--anim-direction").trim();

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
        getUserInput();
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
    animationTime = 0;
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
    numOfBlocks = 0;
    numOfColors = 0;
    tempUserColorValue = "";
    animationTime = 0;
    iterationCount = 0;
    adjustValue = -10;

    //set input borders back to normal
    document.getElementById("red-value").style.borderColor = "";
    document.getElementById("red-value").style.borderWidth = "";
    document.getElementById("green-value").style.borderColor = "";
    document.getElementById("green-value").style.borderWidth = "";
    document.getElementById("blue-value").style.borderColor = "";
    document.getElementById("blue-value").style.borderWidth = "";
    document.getElementById("num-blocks").style.borderColor = "";
    document.getElementById("num-blocks").style.borderWidth = "";
    document.getElementById("animation-time").style.borderColor = "";
    document.getElementById("animation-time").style.borderWidth = "";
    document.getElementById("iteration-count").style.borderColor = "";
    document.getElementById("iteration-count").style.borderWidth = "";
    document.getElementById("number-of-colors-input").style.borderColor = "";
    document.getElementById("pause-button").innerHTML = "Pause";

    if (startTwice == false) {
    //clears the previous user input (radio button not included??)
    userColorValueR = document.getElementById("red-value").value = "";
    userColorValueG = document.getElementById("green-value").value = "";
    userColorValueB = document.getElementById("blue-value").value = "";
    numOfBlocks = document.getElementById("num-blocks").value = "";
    animationTime = document.getElementById("animation-time").value = "";
    iterationCount = document.getElementById("iteration-count").value = "";
    } else {
        startTwice = false;
    }
 }

//combine these into one play/pause button like music player
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

// ---- USER INPUT ----
function getUserInput() {
    //change the num of colors to a normal input up to 10 
    userColorValueR = document.getElementById("red-value").value;
    userColorValueG = document.getElementById("green-value").value;
    userColorValueB = document.getElementById("blue-value").value;
    numOfBlocks = document.getElementById("num-blocks").value;
    animationTime = document.getElementById("animation-time").value;
    iterationCount = document.getElementById("iteration-count").value;
    
    try {
        numOfColors = document.querySelector('input[name="num-colors"]:checked').value;
    }
    catch (err) {
        numOfColors = -1;
    }

    if (userColorValueR == "") {
        document.getElementById("red-value").style.borderColor = "red";
        document.getElementById("red-value").style.borderWidth = "2px";

        //default input
        userColorValueR = 123;
    } else {
        document.getElementById("red-value").style.borderColor = "";
        document.getElementById("red-value").style.borderWidth = ""; 
        inputEntered = true;   
    }

    if (userColorValueG == "") {
        document.getElementById("green-value").style.borderColor = "red";
        document.getElementById("green-value").style.borderWidth = "2px";

        //default input
        userColorValueG = 123;
    } else {
        document.getElementById("green-value").style.borderColor = "";
        document.getElementById("green-value").style.borderWidth = "";
        inputEntered = true;
    }

    if (userColorValueB == "") {
        document.getElementById("blue-value").style.borderColor = "red";
        document.getElementById("blue-value").style.borderWidth = "2px";

        //default input
        userColorValueB = 123;
    } else {
        document.getElementById("blue-value").style.borderColor = "";
        document.getElementById("blue-value").style.borderWidth = "";
        inputEntered = true;
    }

    if (numOfBlocks == "") {
        document.getElementById("num-blocks").style.borderColor = "red";
        document.getElementById("num-blocks").style.borderWidth = "2px";

        //default input
        numOfBlocks = 10;
    } else {
        document.getElementById("num-blocks").style.borderColor = "";
        document.getElementById("num-blocks").style.borderWidth = "";
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

    if (numOfColors == -1) {
        document.getElementById("number-of-colors-input").style.borderColor = "red";

        //default input
        numOfColors = document.getElementById("number-of-colors-input").value = 3;
        inputEntered = true;
    } else {
        document.getElementById("number-of-colors-input").style.borderColor = "";
        inputEntered = true;
    }
}