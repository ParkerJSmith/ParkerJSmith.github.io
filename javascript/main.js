let openWindows = [];
let taskbarWindowsMap = new Map();

window.addEventListener("resize", bsod);
document.getElementById("trash").addEventListener("click", createTrashWindow);
document.addEventListener("mousedown", checkMouseDrag);
document.addEventListener("mousemove", updateMouseDrag);
document.addEventListener("mouseup", stopMouseDrag);
document.addEventListener("mousedown", checkMouseResizeDrag);
document.addEventListener("mousemove", updateMouseResizeDrag);
document.addEventListener("mouseup", stopMouseResizeDrag);
document.addEventListener("mousemove", windowHoverInteraction);
document.addEventListener("mousemove", windowResizeHover);

// Start menu
document.getElementById("desktop").addEventListener("click", closeStartMenu);
document.getElementById("startButton").addEventListener("click", toggleStartMenu);
document.getElementById("programs").addEventListener("mouseover", showPrograms);
document.getElementById("documents").addEventListener("mouseover", showDocuments);
document.getElementById("help").addEventListener("mouseover", closeDropDowns);
document.getElementById("help").addEventListener("click", createHelpWindow);
document.getElementById("about").addEventListener("mouseover", closeDropDowns);
document.getElementById("about").addEventListener("click", createAboutWindow);
document.getElementById("desktop").addEventListener("mouseover", closeDropDowns);

// Applications
document.getElementById("calculator").addEventListener("click", createCalculatorWindow);
document.getElementById("minesweeper").addEventListener("click", createMinesweeperWindow);
document.addEventListener("contextmenu", windowInteractionRight);
document.getElementById("notepad").addEventListener("click", createNotepadWindow.bind(null, -1));
document.getElementById("things").addEventListener("click", createNotepadWindow.bind(null, 0));
document.addEventListener("keydown", typeNotepad);
document.addEventListener("keyup", checkShift);
document.addEventListener("click", windowInteraction);


// Shutdown
document.getElementById("shutDown").addEventListener("click", createShutdownPopup);

document.getElementById("canvas").width = window.innerWidth;
document.getElementById("canvas").height = window.innerHeight - 50;
var ctx = document.getElementById("canvas").getContext("2d");

var lastTime = Date.now();
var frames = 0;
var frameRate = 0;
var frameRateOn = false;

var renderOn = true;
var finished = false;

var shiftPressed = false;

document.getElementById("startMenu").style.display = "none";
document.getElementById("programList").style.display = "none";
document.getElementById("documentList").style.display = "none";
createAboutWindow();
window.requestAnimationFrame(gameLoop);

function gameLoop() {
    tick();
    render();
    window.requestAnimationFrame(gameLoop);
}

function tick() {
    updateTime();
    //closeWindows();
}

function render() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (!renderOn) {
        return;
    }
    if (openWindows.length == 0) {
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

function addWindow(window) {
    openWindows.push(window);
    return openWindows.length - 1;
}

function closeWindows() {
    for (let i = 0; i < openWindows.length; i++) {
        if (openWindows[i].close) {
            openWindows.splice(i, 1);
        }
    }
}

function resizeWindows() {
    for (let i = 0; i < openWindows.length; i++) {
        if (openWindows[i].fullscreen) {
            openWindows[i].xPos = 0;
            openWindows[i].yPos = 0;
            openWindows[i].width = window.innerWidth;
            openWindows[i].height = window.innerHeight - 50;
        }
    }
}

function bsod() {
    if (finished) {
        return;
    }
    if (window.innerWidth < 600) {
        document.getElementById("bsod").style.display = "block";
        document.getElementById("taskbar").style.display = "none";
        closeStartMenu();
        closeDropDowns();
        renderOn = false;
    } else {
        document.getElementById("bsod").style.display = "none";
        document.getElementById("taskbar").style.display = "flex";
        renderOn = true;
    }
    document.getElementById("canvas").width = window.innerWidth;
    document.getElementById("canvas").height = window.innerHeight - 50;
    resizeWindows();
}

function createTrashWindow() {
    new FileExplorer(640, 480, "Trash");
}

function createCalculatorWindow() {
    new Calculator();
    closeStartMenu();
    closeDropDowns();
}

function createMinesweeperWindow() {
    new Minesweeper();
    closeStartMenu();
    closeDropDowns();
}

function createNotepadWindow(fileNum) {
    if (fileNum == -1) {
        new Notepad(640, 480, new TextFile("", "untitled.txt"));
    } else {
        new Notepad(640, 480, textFiles[fileNum]);
    }
    closeStartMenu();
    closeDropDowns();
}

function createShutdownPopup() {
    new PopupWindow("Warning", "Are you sure you want to shut down?", "Shut down", "Cancel", shutdown);
}

function createAboutWindow() {
    new AboutScreen();
    closeStartMenu();
    closeDropDowns();
}

function createHelpWindow() {
    new HelpScreen();
    closeStartMenu();
    closeDropDowns();
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
    closeDropDowns();
    renderOn = false;
    finished = true;
}

function closeDropDowns() {
    document.getElementById("programList").style.display = "none";
    document.getElementById("documentList").style.display = "none";
}

function showPrograms() {
    closeDropDowns();
    document.getElementById("programList").style.display = "block";
}

function showDocuments() {
    closeDropDowns();
    document.getElementById("documentList").style.display = "block";
}

function windowInteraction(event) {
    if (openWindows.length == 0) {
        return;
    }
    for (let i = openWindows.length - 1; i >= 0; i--) {
        if (openWindows[i].minimized) {
            continue;
        }
        let checkValue = openWindows[i].checkInteraction(event.clientX, event.clientY);
        if (checkValue == 1) {
            let tempWindow = openWindows[i];
            openWindows.splice(i, 1);
            openWindows.push(tempWindow);
            return;
        } else if (checkValue == -1) {
            return;
        }
    }
}

function windowInteractionRight(event) {
    if (openWindows.length == 0) {
        return;
    }
    for (let i = openWindows.length - 1; i >= 0; i--) {
        if (openWindows[i].minimized) {
            continue;
        }
        openWindows[i].checkInteractionRight(event.clientX, event.clientY);
    }
}

function windowHoverInteraction(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    for (let i = openWindows.length - 1; i >= 0; i--) {
        if (openWindows[i].minimized) {
            continue;
        }
        if (mouseX > openWindows[i].xPos && mouseX < openWindows[i].xPos + openWindows[i].width) {
            if (mouseY > openWindows[i].yPos && mouseY < openWindows[i].yPos + openWindows[i].height) {
                openWindows[i].checkHoverInteraction(mouseX, mouseY);
                return;
            }
        }
    }
}

function windowResizeHover(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    for (let i = openWindows.length - 1; i >= 0; i--) {
        if (openWindows[i].checkResizeHover(mouseX, mouseY)) {
            return;
        }
        if (mouseX > openWindows[i].xPos && mouseX < openWindows[i].xPos + openWindows[i].width) {
            if (mouseY > openWindows[i].yPos && mouseY < openWindows[i].yPos + openWindows[i].height) {
                return;
            }
        }
    }
    if (document.getElementById("body").style.cursor != "pointer") {
        document.getElementById("body").style.cursor = "default";
    }
}

function checkMouseResizeDrag(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    for (let i = openWindows.length - 1; i >= 0; i--) {
        if (openWindows[i].checkResizeDrag(event.clientX, event.clientY)) {
            let tempWindow = openWindows[i];
            openWindows.splice(i, 1);
            openWindows.push(tempWindow);

            return;
        }
        if (mouseX > openWindows[i].xPos && mouseX < openWindows[i].xPos + openWindows[i].width) {
            if (mouseY > openWindows[i].yPos && mouseY < openWindows[i].yPos + openWindows[i].height) {
                return;
            }
        }
    }
}

function stopMouseResizeDrag() {
    for (let i = 0; i < openWindows.length; i++) {
        openWindows[i].resizeDragging = false;
    }
}

function updateMouseResizeDrag(event) {
    for (let i = 0; i < openWindows.length; i++) {
        if (openWindows[i].resizeDragging) {
            openWindows[i].setResizeDragPos(event.clientX, event.clientY);
            break;
        }
    }
}

function checkMouseDrag(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    for (let i = openWindows.length - 1; i >= 0; i--) {
        if (openWindows[i].minimized) {
            continue;
        }
        if (mouseX > openWindows[i].xPos && mouseX < openWindows[i].xPos + openWindows[i].width) {
            if (mouseY > openWindows[i].yPos && mouseY < openWindows[i].yPos + openWindows[i].height) {
                openWindows[i].checkDrag(event.clientX, event.clientY)
                let tempWindow = openWindows[i];
                openWindows.splice(i, 1);
                openWindows.push(tempWindow);
                return;
            }
        }
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
            break;
        }
    }
}

function typeNotepad(event) {
    if (event.code.includes("Shift")) {
        shiftPressed = true;
    }
    for (let i = 0; i < openWindows.length; i++) {
        if (openWindows[i].windowContent instanceof Notepad && openWindows[i].windowContent.showCursor) {
            openWindows[i].windowContent.addType(event.code.toString());
        }
    }
}

function checkShift(event) {
    if (event.code.includes("Shift")) {
        shiftPressed = false;
    }
}

function taskbarClicked() {
    const window = taskbarWindowsMap.get(this.id);
    if (openWindows[openWindows.length - 1] != window) {
        if (openWindows.length <= 1) {
            return;
        }
        const isWindow = (element) => element === window;
        const index = openWindows.findIndex(isWindow);
        openWindows.splice(index, 1);
        openWindows.push(window);
        window.minimized = false;
    } else {
        if (window.minimized) {
            window.minimized = false;
        } else {
            window.minimized = true;
        }
    }
}