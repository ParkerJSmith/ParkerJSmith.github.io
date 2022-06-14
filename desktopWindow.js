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