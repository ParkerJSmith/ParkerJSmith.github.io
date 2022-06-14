class DesktopWindow {
    constructor(width, height, name, contentType) {
        this.width = width;
        this.height = height;
        this.name = name;
        this.xPos = 100;
        this.yPos = 100;
        this.dragging = false;
        this.dragX = 0;
        this.dragY = 0;
        switch (contentType) {
            case "trash":
                this.windowContent = new FileExplorer(this);
                break;
            case "calculator":
                this.windowContent = new Calculator(this);
                break;
        }
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

    checkInteraction(xPos, yPos) {
        if (this.checkClose(xPos, yPos)) {
            return true;
        }
        this.windowContent.checkInteraction(xPos, yPos);
        return false;
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
            switch (this.fileList[i].type) {
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

class Calculator {
    constructor(parent) {
        this.parent = parent;
        this.currentExpression = "";
        this.buttonsList = [];
        for (let i = 0; i < 9; i++) {
            let xOffset = (i % 3) * 50 + 31;
            let yOffset = -1 * Math.floor(i / 3) * 50 + 283;
            this.buttonsList.push(new CalculatorButton(i + 1, xOffset, yOffset, 38, 38, this.parent));
        }
        this.buttonsList.push(new CalculatorButton(0, 31, 333, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("negate", 81, 333, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton(".", 131, 333, 38, 38, this.parent));

        this.buttonsList.push(new CalculatorButton("/", 181, 183, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("*", 181, 233, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("-", 181, 283, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("+", 181, 333, 38, 38, this.parent));

        this.buttonsList.push(new CalculatorButton("sqrt", 231, 183, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("%", 231, 233, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("inverse", 231, 283, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("=", 231, 333, 38, 38, this.parent));

        this.buttonsList.push(new CalculatorButton("back", 83, 118, 54, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("clearEntry", 149, 118, 54, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("clear", 217, 118, 54, 38, this.parent));
    }

    render() {

        // Draw screen
        ctx.fillStyle = "white";
        ctx.fillRect(this.parent.xPos + 10, this.parent.yPos + 40, this.parent.width - 18, 40);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + 10, this.parent.yPos + 40, this.parent.width - 18, 2);
        ctx.fillRect(this.parent.xPos + 10, this.parent.yPos + 40, 2, 40);

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + 12, this.parent.yPos + 42, this.parent.width - 22, 2);
        ctx.fillRect(this.parent.xPos + 12, this.parent.yPos + 42, 2, 36);

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + 12, this.parent.yPos + 78, this.parent.width - 20, 2);
        ctx.fillRect(this.parent.xPos + this.parent.width - 10, this.parent.yPos + 42, 2, 36);

        // Draw number buttons
        for (let i = 0; i < 20; i++) {
            let xOffset = (i % 5) * 50 + 19;
            let yOffset = Math.floor(i / 5) * 50 + 85;

            ctx.fillStyle = "black";
            ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 134 + yOffset, 36, 2);
            ctx.fillRect(this.parent.xPos + 48 + xOffset, this.parent.yPos + 98 + yOffset, 2, 38);

            ctx.fillStyle = "rgb(130, 130, 130)";
            ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 132 + yOffset, 34, 2);
            ctx.fillRect(this.parent.xPos + 46 + xOffset, this.parent.yPos + 98 + yOffset, 2, 36);

            ctx.fillStyle = "rgb(235, 235, 235)";
            ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 98 + yOffset, 34, 2);
            ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 100 + yOffset, 2, 34);
        }

        ctx.font = "26px w95fa";
        for (let i = 0; i < 9; i++) {
            ctx.fillStyle = "#0000aa";
            let xOffset = this.parent.xPos + (i % 3) * 50 + 42;
            let yOffset = this.parent.yPos - Math.floor(i / 3) * 50 + 310;
            ctx.fillText(i + 1, xOffset, yOffset);
        }

        ctx.fillText("0", this.parent.xPos + 42, this.parent.yPos + 360);
        ctx.fillText('\u00b1', this.parent.xPos + 92, this.parent.yPos + 360);
        ctx.fillText(".", this.parent.xPos + 147, this.parent.yPos + 358);

        // Draw operations
        ctx.fillStyle = "red";
        ctx.fillText("/", this.parent.xPos + 194, this.parent.yPos + 210);
        ctx.fillText("*", this.parent.xPos + 195, this.parent.yPos + 267);
        ctx.fillText("-", this.parent.xPos + 193, this.parent.yPos + 306);
        ctx.fillText("+", this.parent.xPos + 193, this.parent.yPos + 355);
        ctx.fillText("=", this.parent.xPos + 243, this.parent.yPos + 355);

        ctx.fillStyle = "#151587";
        ctx.fillText("%", this.parent.xPos + 241, this.parent.yPos + 260);
        ctx.font = "22px w95fa";
        ctx.fillText("1/x", this.parent.xPos + 235, this.parent.yPos + 308);
        ctx.font = "18px w95fa";
        ctx.fillText("sqrt", this.parent.xPos + 236, this.parent.yPos + 207);

        // Clear button
        let xOffset = 205;
        let yOffset = 20;

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 134 + yOffset, 52, 2);
        ctx.fillRect(this.parent.xPos + 64 + xOffset, this.parent.yPos + 98 + yOffset, 2, 38);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + 14 + xOffset, this.parent.yPos + 132 + yOffset, 48, 2);
        ctx.fillRect(this.parent.xPos + 62 + xOffset, this.parent.yPos + 98 + yOffset, 2, 36);

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 98 + yOffset, 50, 2);
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 100 + yOffset, 2, 34);

        ctx.fillStyle = "#760000";
        ctx.font = "22px w95fa";
        ctx.fillText("C", this.parent.xPos + 33 + xOffset, this.parent.yPos + 124 + yOffset);

        // Clear entry button
        xOffset = 137;
        yOffset = 20;

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 134 + yOffset, 52, 2);
        ctx.fillRect(this.parent.xPos + 64 + xOffset, this.parent.yPos + 98 + yOffset, 2, 38);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + 14 + xOffset, this.parent.yPos + 132 + yOffset, 48, 2);
        ctx.fillRect(this.parent.xPos + 62 + xOffset, this.parent.yPos + 98 + yOffset, 2, 36);

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 98 + yOffset, 50, 2);
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 100 + yOffset, 2, 34);

        ctx.fillStyle = "#760000";
        ctx.font = "22px w95fa";
        ctx.fillText("CE", this.parent.xPos + 27 + xOffset, this.parent.yPos + 124 + yOffset);

        // Back button
        xOffset = 71;
        yOffset = 20;

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 134 + yOffset, 52, 2);
        ctx.fillRect(this.parent.xPos + 64 + xOffset, this.parent.yPos + 98 + yOffset, 2, 38);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + 14 + xOffset, this.parent.yPos + 132 + yOffset, 48, 2);
        ctx.fillRect(this.parent.xPos + 62 + xOffset, this.parent.yPos + 98 + yOffset, 2, 36);

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 98 + yOffset, 50, 2);
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 100 + yOffset, 2, 34);

        ctx.fillStyle = "#760000";
        ctx.font = "22px w95fa";
        ctx.fillText("Back", this.parent.xPos + 16 + xOffset, this.parent.yPos + 124 + yOffset);

        ctx.fillStyle = "black";
        ctx.font = "20px w95fa";
        ctx.fillText(this.currentExpression, this.parent.xPos + 20, this.parent.yPos + 67);

    }

    checkInteraction(xPos, yPos) {
        if (xPos < this.parent.xPos || xPos > this.parent.xPos + this.parent.width ||
            yPos < this.parent.yPos || yPos > this.parent.yPos + this.parent.height) {
            console.log("check this, dig this");
            return;
        }
        for (let i = 0; i < this.buttonsList.length; i++) {
            let input = this.buttonsList[i].checkPressed(xPos, yPos);
            if (!isNaN(input)) {
                this.currentExpression += input;
            } else {
                switch (input) {
                    case "=":
                        this.currentExpression = this.evaluateExpression(this.currentExpression);
                        break;
                    case "clear":
                        this.currentExpression = "";
                        break;
                    case "back":
                        this.currentExpression = this.currentExpression.slice(0, this.currentExpression.length - 2);
                        break;
                    case "+":
                        this.currentExpression += " " + input + " ";
                        break;
                    case "-":
                        this.currentExpression += " " + input + " ";
                        break;
                    case "/":
                        this.currentExpression += " " + input + " ";
                        break;
                    case "*":
                        this.currentExpression += " " + input + " ";
                        break;
                }
            }
        }
    }

    evaluateExpression(expression) {
        console.log("Start Current expression: " + expression);
        expression = expression.replace(/ /g, '');
        let number = "";
        if (!isNaN(expression.charAt(expression.length - 1))) {
            let i = expression.length - 1;
            while (expression.charAt(i) != '' && !isNaN(expression.charAt(i))) {
                i--;
            }
            number = expression.slice(i + 1);
            expression = expression.slice(0, i + 1);
        }
        console.log("New Current expression: " + expression);
        switch (expression.charAt(expression.length - 1)) {
            case "+":
                return parseInt(this.evaluateExpression(expression.slice(0, expression.length - 1))) + parseInt(number);
                break;
            case "-":
                console.log(number);
                return parseInt(this.evaluateExpression(expression.slice(0, expression.length - 1))) - parseInt(number);
                break;
            case "*":
                console.log(number);
                return parseInt(this.evaluateExpression(expression.slice(0, expression.length - 1))) * parseInt(number);
                break;
            case "/":
                return parseInt(this.evaluateExpression(expression.slice(0, expression.length - 1))) / parseInt(number);
                break;
        }
        return parseInt(number);
    }
}

class CalculatorButton {
    constructor(buttonValue, xPos, yPos, width, height, parent) {
        this.buttonValue = buttonValue;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.parent = parent;
    }

    checkPressed(xPos, yPos) {
        if (xPos > this.parent.xPos + this.xPos && xPos < this.parent.xPos + this.xPos + this.width) {
            if (yPos > this.parent.yPos + this.yPos && yPos < this.parent.yPos + this.yPos + this.height) {
                return this.buttonValue;
            }
        }
        return "";
    }
}

var openWindows = [];

window.addEventListener("resize", bsod);
document.getElementById("trash").addEventListener("click", createTrashWindow);
document.addEventListener("mousedown", checkMouseDrag);
document.addEventListener("mousemove", updateMouseDrag);
document.addEventListener("mouseup", stopMouseDrag);
//document.addEventListener("click", closeWindow);

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