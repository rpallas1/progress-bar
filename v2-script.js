//Version 2.0 Loading Bar

function numBlocksIncrease() {
    numOfBlocks++;
    document.getElementById("num-blocks").value = numOfBlocks;
    console.log(`Num of blocks after increase: ${numOfBlocks}`);
    startInterval();
}

function numBlocksDecrease() {
    numOfBlocks--;
    document.getElementById("num-blocks").value = numOfBlocks;
    console.log(`Num of blocks after decrease: ${numOfBlocks}`);
    startInterval();
}

function numColorsIncrease() {
    numOfColors++;
    document.getElementById("num-colors").value = numOfColors;
    console.log(`Num of colors after increase: ${numOfColors}`);
    startInterval();
}

function numColorsDecrease() {
    numOfColors--;
    document.getElementById("num-colors").value = numOfColors;
    console.log(`Num of colors after decrease: ${numOfColors}`);
    startInterval();
}

function animTimeIncrease() {
    animationTime = tempAnimationTime;
    animationTime += 0.1;
    tempAnimationTime += 0.1;
    document.getElementById("animation-time").value = tempAnimationTime.toFixed(1);
    console.log(`Animation time after increase: ${animationTime}`);
    startInterval();
}

function animTimeDecrease() {
    animationTime = tempAnimationTime;
    animationTime -= 0.1;
    tempAnimationTime -= 0.1;
    document.getElementById("animation-time").value = tempAnimationTime.toFixed(1);
    console.log(`Animation time after decrease: ${animationTime}`);
    startInterval();
}

function iterationCountIncrease() {
    iterationCount++;
    document.getElementById("iteration-count").value = iterationCount;
    console.log(`Iteration count after increase: ${iterationCount}`);
    startInterval();
}

function iterationCountDecrease() {
    iterationCount--;
    document.getElementById("iteration-count").value = iterationCount;
    console.log(`Iteration count after decrease: ${iterationCount}`);
    startInterval();
}

function animationDirectionButton() {
    if (animationDirection !== "reverse") {
        document.getElementById("animation-direction").innerHTML = "Direction: Reverse";
        animationDirection = "reverse";
        startInterval();
    } else if (animationDirection == "reverse") {
        document.getElementById("animation-direction").innerHTML = "Direction: Normal";
        animationDirection = "none";
        startInterval();
    }
}

function resetSize() {
    const mainDiv = document.getElementById("main");

    document.getElementById("main").style.width = getComputedStyle(mainDiv).getPropertyValue("--total-width");
    document.getElementById("main").style.height = getComputedStyle(mainDiv).getPropertyValue("--total-height");
}
