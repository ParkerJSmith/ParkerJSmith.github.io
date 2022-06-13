class DesktopWindow {
    constructor(width, height, name) {
        this.width = width;
        this.height = height;
        this.name = name;
        this.xPos = 100;
        this.yPos = 100;
        this.dragging = false;
        this.dragX = 0;
        this.dragY = 0;
        this.windowContent = new FileExplorer(this);
    }

    render() {
        // Draw window
        ctx.fillStyle = "rgb(195, 195, 195)";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);

        // Draw borders
        ctx.fillStyle = "white";
        ctx.fillRect(this.xPos + 2, this.yPos + 2, this.width - 4, 2);
        ctx.fillRect(this.xPos + 2, this.yPos + 2, 2, this.height - 4);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.xPos + 2, this.yPos + this.height - 2, this.width - 2, 2);
        ctx.fillRect(this.xPos + this.width - 2, this.yPos + 2, 2, this.height - 2);

        ctx.fillStyle = "black";
        ctx.fillRect(this.xPos, this.yPos + this.height, this.width, 2);
        ctx.fillRect(this.xPos + this.width, this.yPos, 2, this.height + 2);

        // Draw title
        ctx.fillStyle = "#0000aa";
        ctx.fillRect(this.xPos + 6, this.yPos + 6, this.width - 10, 30);

        ctx.fillStyle = "white";
        ctx.font = "26px w95fa";
        ctx.fillText(this.name, this.xPos + 12, this.yPos + 30);

        // Draw x button
        ctx.fillStyle = "rgb(195, 195, 195)";
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 10, 22, 22);
        ctx.fillStyle = "black";
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 30, 22, 2);
        ctx.fillRect(this.xPos + this.width - 10, this.yPos + 10, 2, 22);
        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 28, 20, 2);
        ctx.fillRect(this.xPos + this.width - 12, this.yPos + 10, 2, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 10, 20, 2);
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 10, 2, 20);
        
        ctx.drawImage(document.getElementById("xImage"), this.xPos + this.width - 27, this.yPos + 13);

        this.windowContent.render();
    }

    checkDrag(xPos, yPos) {
        if (xPos > this.xPos + 6 && xPos < this.xPos + this.width - 6) {
            if (yPos > this.yPos && yPos < this.yPos + 34) {
                this.dragging = true;
                this.dragX = xPos - this.xPos;
                this.dragY = yPos - this.yPos;
            }
        }
    }

    setDragPos(xPos, yPos) {
        this.xPos = xPos - this.dragX;
        this.yPos = yPos - this.dragY;
    }

    checkClose(xPos, yPos) {
        if (xPos > this.xPos + this.width - 30 && xPos < this.xPos + this.width - 6) {
            if (yPos > this.yPos + 6 && yPos < this.yPos + 30) {
                return true;
            }
        }
    }

    tick() {

    }
}

class FileExplorer {
    constructor(parent) {
        this.parent = parent;
        this.fileList = [];
        this.fileList.push(new FileItem("secret_government_docs", "folder"));
        this.fileList.push(new FileItem("mikell_jaxon_thriller(NO VIRUS).exe", "executable"));
        this.fileList.push(new FileItem("fermats_last_theorem_proof.txt", "file"));
    }

    render() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.parent.xPos + 10, this.parent.yPos + 40, this.parent.width - 18, this.parent.height - 48);

        for (let i = 0; i < this.fileList.length; i++) {
            switch(this.fileList[i].type) {
                case "folder":
                    ctx.drawImage(document.getElementById("folderImage"), this.parent.xPos + 20, this.parent.yPos + 50 + (i * 50));
                    break;
                case "file":
                    ctx.drawImage(document.getElementById("fileImage"), this.parent.xPos + 20, this.parent.yPos + 50 + (i * 50));
                    break;
                case "executable":
                    ctx.drawImage(document.getElementById("programImage"), this.parent.xPos + 20, this.parent.yPos + 50 + (i * 50));
                    break; 
            }
            ctx.fillStyle = "black";
            ctx.fillText(this.fileList[i].name, this.parent.xPos + 65, this.parent.yPos + 78 + (i * 50));
        }
    }
}

class FileItem {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

var openWindows = [];

window.addEventListener("resize", bsod);
document.getElementById("trash").addEventListener("click", createTrashWindow);
document.addEventListener("mousedown", checkMouseDrag);
document.addEventListener("mousemove", updateMouseDrag);
document.addEventListener("mouseup", stopMouseDrag);
document.addEventListener("click", closeWindow);

document.getElementById("desktop").addEventListener("click", closeStartMenu);
document.getElementById("startButton").addEventListener("click", toggleStartMenu);

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
    let temp = new DesktopWindow(640, 480, "Trash");
    openWindows.push(temp);
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

function closeWindow(event) {
    for (let i = 0; i < openWindows.length; i++) {
        if (openWindows[i].checkClose(event.clientX, event.clientY)) {
            openWindows.splice(i, 1);
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