class PopupWindow {
    constructor(name, textContent, button1Text, button2Text, action) {
        let width = Math.ceil(Math.max((button1Text.length * 13), (button2Text.length * 13)) * 3);
        let height = 180;
        this.parent = new DesktopWindow(width, height, name, this);
        this.parent.xPos = (window.innerWidth / 2) - (width / 2);
        this.parent.yPos = (window.innerHeight / 2) - (height / 2);
        this.parent.moveable = false;
        this.parent.resizable = false;
        this.textContent = textContent;
        this.button1Text = button1Text;
        this.button2Text = button2Text;
        this.action = action;
    }

    render() {
        // Button 1
        let buttonWidth = this.button1Text.length * 13;
        let buttonHeight = 38;
        let xOffset = (this.parent.width / 4) - (buttonWidth / 2);
        let yOffset = ((this.parent.height / 4) * 3) - (buttonHeight / 2);

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + buttonHeight + yOffset, buttonWidth, 2);
        ctx.fillRect(this.parent.xPos + buttonWidth + xOffset, this.parent.yPos + yOffset, 2, buttonHeight + 2);

        xOffset += 2;
        yOffset -= 2;
        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + buttonHeight + yOffset, buttonWidth - 4, 2);
        xOffset -= 4;
        yOffset += 4;
        ctx.fillRect(this.parent.xPos + buttonWidth + xOffset, this.parent.yPos + yOffset, 2, buttonHeight - 2);

        xOffset += 2;
        yOffset -= 2;
        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, buttonWidth, 2);
        yOffset += 2;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 2, buttonHeight - 2);

        ctx.fillStyle = "black";
        ctx.font = "22px w95fa";
        yOffset += 24;
        xOffset += 12;
        ctx.fillText(this.button1Text, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        // Button 2
        xOffset = ((this.parent.width / 4) * 3) - (buttonWidth / 2);
        yOffset = ((this.parent.height / 4) * 3) - (buttonHeight / 2);

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + buttonHeight + yOffset, buttonWidth, 2);
        ctx.fillRect(this.parent.xPos + buttonWidth + xOffset, this.parent.yPos + yOffset, 2, buttonHeight + 2);

        xOffset += 2;
        yOffset -= 2;
        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + buttonHeight + yOffset, buttonWidth - 4, 2);
        xOffset -= 4;
        yOffset += 4;
        ctx.fillRect(this.parent.xPos + buttonWidth + xOffset, this.parent.yPos + yOffset, 2, buttonHeight - 2);

        xOffset += 2;
        yOffset -= 2;
        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, buttonWidth, 2);
        yOffset += 2;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 2, buttonHeight - 2);

        ctx.fillStyle = "black";
        ctx.font = "22px w95fa";
        yOffset += 24;
        xOffset += 27;
        ctx.fillText(this.button2Text, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        // Window message
        xOffset = 15;
        yOffset = 75;
        ctx.fillText(this.textContent, this.parent.xPos + xOffset, this.parent.yPos + yOffset);
    }

    checkInteraction(xPos, yPos) {
        if (xPos < this.parent.xPos || xPos > this.parent.xPos + this.parent.width ||
            yPos < this.parent.yPos || yPos > this.parent.yPos + this.parent.height) {
            return;
        }

        let buttonWidth = this.button1Text.length * 13;
        let buttonHeight = 38;
        let xOffset = (this.parent.width / 4) - (buttonWidth / 2);
        let yOffset = ((this.parent.height / 4) * 3) - (buttonHeight / 2);
        if (xPos > this.parent.xPos + xOffset && xPos < this.parent.xPos + xOffset + buttonWidth) {
            if (yPos > this.parent.yPos + yOffset && yPos < this.parent.yPos + yOffset + buttonHeight) {
                this.action();
                return;
            }
        }

        xOffset = ((this.parent.width / 4) * 3) - (buttonWidth / 2);
        yOffset = ((this.parent.height / 4) * 3) - (buttonHeight / 2);
        if (xPos > this.parent.xPos + xOffset && xPos < this.parent.xPos + xOffset + buttonWidth) {
            if (yPos > this.parent.yPos + yOffset && yPos < this.parent.yPos + yOffset + buttonHeight) {
                this.parent.close = true;
            }
        }
    }
    
    checkInteractionRight(xPos, yPos) {

    }

    checkHoverInteraction(xPos, yPos) {

    }
}