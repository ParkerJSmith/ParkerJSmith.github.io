class DesktopWindow {
    constructor(width, height, name, windowContent) {
        this.width = width;
        this.height = height;
        this.name = name;
        this.windowContent = windowContent;
        this.xPos = 100;
        this.yPos = 100;
        this.dragging = false;
        this.dragX = 0;
        this.dragY = 0;
        this.moveable = true;
        this.resizable = true;
        this.fullscreen = false;
        this.close = false;
        openWindows.push(this);
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

        // Draw fullsize button
        if (this.resizable) {
            ctx.fillStyle = "rgb(195, 195, 195)";
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 10, 22, 22);
            ctx.fillStyle = "black";
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 30, 22, 2);
            ctx.fillRect(this.xPos + this.width - 35, this.yPos + 10, 2, 22);
            ctx.fillStyle = "rgb(130, 130, 130)";
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 28, 20, 2);
            ctx.fillRect(this.xPos + this.width - 37, this.yPos + 10, 2, 20);
            ctx.fillStyle = "white";
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 10, 20, 2);
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 10, 2, 20);

            ctx.fillStyle = "black";
            ctx.fillRect(this.xPos + this.width - 51, this.yPos + 14, 12, 2);
            ctx.fillRect(this.xPos + this.width - 51, this.yPos + 19, 12, 7);
            ctx.fillRect(this.xPos + this.width - 51, this.yPos + 16, 2, 4);
            ctx.fillRect(this.xPos + this.width - 41, this.yPos + 16, 2, 4);
        }

        this.windowContent.render();
    }

    checkInteraction(xPos, yPos) {
        if (this.checkClose(xPos, yPos)) {
            return -1;
        }
        this.checkFullsize(xPos, yPos);
        if (xPos > this.xPos && xPos < this.xPos + this.width) {
            if (yPos > this.yPos && yPos < this.yPos + this.height) {
                this.windowContent.checkInteraction(xPos, yPos);
                return 1;
            }
        }
        return 0;
    }

    checkDrag(xPos, yPos) {
        if (!this.moveable) {
            return;
        }
        if (xPos > this.xPos + 6 && xPos < this.xPos + this.width - 6) {
            if (yPos > this.yPos && yPos < this.yPos + 34) {
                this.dragging = true;
                this.dragX = xPos - this.xPos;
                this.dragY = yPos - this.yPos;
                return true;
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
                openWindows.splice(openWindows.indexOf(this), 1);
                return true;
            }
        }
        return false;
    }

    checkFullsize(xPos, yPos) {
        if (!this.resizable) {
            return;
        }
        if (xPos > this.xPos + this.width - 55 && xPos < this.xPos + this.width - 31) {
            if (yPos > this.yPos + 6 && yPos < this.yPos + 30) {
                if (!this.fullscreen) {
                    this.xPos = 0;
                    this.yPos = 0;
                    this.width = window.innerWidth;
                    this.height = window.innerHeight - 50;
                    this.fullscreen = true;
                } else {
                    this.xPos = 100;
                    this.yPos = 100;
                    this.width = 640;
                    this.height = 480;
                    this.fullscreen = false;
                }
            }
        }
    }

    tick() {

    }
}