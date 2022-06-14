var openWindows = [];

window.addEventListener("resize", bsod);
document.getElementById("trash").addEventListener("click", createTrashWindow);
document.addEventListener("mousedown", checkMouseDrag);
document.addEventListener("mousemove", updateMouseDrag);
document.addEventListener("mouseup", stopMouseDrag);

// Start menu
document.getElementById("desktop").addEventListener("click", closeStartMenu);
document.getElementById("startButton").addEventListener("click", toggleStartMenu);
document.getElementById("programs").addEventListener("mouseover", showPrograms);
document.getElementById("desktop").addEventListener("mouseover", closeDropDowns);

// Calculator
document.getElementById("calculator").addEventListener("click", createCalculatorWindow);
document.addEventListener("click", windowInteraction);

// Shutdown
document.getElementById("shutDown").addEventListener("click", shutdown);

document.getElementById("canvas").width = window.innerWidth;
document.getElementById("canvas").height = window.innerHeight;
var ctx = document.getElementById("canvas").getContext("2d");

var lastTime = Date.now();
var frames = 0;
var frameRate = 0;
var frameRateOn = false;

var renderOn = true;
var finished = false;

document.getElementById("startMenu").style.display = "none";
document.getElementById("programList").style.display = "none";
window.requestAnimationFrame(gameLoop);

function gameLoop() {
    tick();
    render();
    window.requestAnimationFrame(gameLoop);
}

function tick() {
    updateTime();
}

function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (!renderOn) {
        return;
    }
    for (let i = 0; i < openWindows.length; i++) {
        openWindows[i].render();
    }
    drawFrameRate();
}

function drawFrameRate() {
    if (!frameRateOn) {
        return;
    }
    ctx.fillStyle = "black";
    ctx.font = "50px bsod"
    ctx.fillText("FPS: " + frameRate, 10, 40);
    frames++;
    if (Date.now() - lastTime >= 1000) {
        lastTime = Date.now();
        frameRate = frames;
        frames = 0;
    }
}

function updateTime() {
    document.getElementById("timeText").textContent = getFormattedTime();
}

function getFormattedTime() {
    let time = new Date();
    let hour = time.getHours();
    let meridian = "";

    if (hour == 0) {
        hour = 12;
        meridian = "AM";
    } else if (hour > 12) {
        hour -= 12;
        meridian = "PM";
    } else {
        meridian = "AM";
    }

    let minute = time.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }

    return hour + ":" + minute + " " + meridian;
}

function bsod() {
    if (finished) {
        return;
    }
    if (window.innerWidth < 600) {
        document.getElementById("bsod").style.display = "block";
        document.getElementById("taskbar").style.display = "none";
    } else {
        document.getElementById("bsod").style.display = "none";
        document.getElementById("taskbar").style.display = "block";
    }
    document.getElementById("canvas").width = window.innerWidth;
    document.getElementById("canvas").height = window.innerHeight;
}

function createTrashWindow() {
    let temp = new DesktopWindow(640, 480, "Trash", "trash");
    openWindows.push(temp);
}

function createCalculatorWindow() {
    let temp = new DesktopWindow(300, 400, "Calculator", "calculator");
    openWindows.push(temp);
    closeStartMenu();
    closeDropDowns();
}

function checkMouseDrag(event) {
    for (let i = 0; i < openWindows.length; i++) {
        openWindows[i].checkDrag(event.clientX, event.clientY);
    }
}

function stopMouseDrag() {
    for (let i = 0; i < openWindows.length; i++) {
        openWindows[i].dragging = false;
    }
}

function updateMouseDrag(event) {
    for (let i = 0; i < openWindows.length; i++) {
        if (openWindows[i].dragging) {
            openWindows[i].setDragPos(event.clientX, event.clientY);
        }
    }
}

function toggleStartMenu() {
    if (document.getElementById("startMenu").style.display == "none") {
        document.getElementById("startMenu").style.display = "block";
    } else {
        document.getElementById("startMenu").style.display = "none";
    }
}

function closeStartMenu() {
    document.getElementById("startMenu").style.display = "none";
}

function shutdown() {
    document.getElementById("turnedOff").style.display = "block";
    document.getElementById("taskbar").style.display = "none";
    document.getElementById("startMenu").style.display = "none";
    renderOn = false;
    finished = true;
}

function closeDropDowns() {
    document.getElementById("programList").style.display = "none";
}

function showPrograms() {
    closeDropDowns();
    document.getElementById("programList").style.display = "block";
}

function windowInteraction(event) {
    for (let i = 0; i < openWindows.length; i++) {
        if (openWindows[i].checkInteraction(event.clientX, event.clientY)) {
            openWindows.splice(i, 1);
        }
    }
}