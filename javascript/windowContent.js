class WindowContent {
    constructor(width, height, name, resizable, iconURL) {
        this.icon = iconURL;
        this.parent = new DesktopWindow(width, height, name, this);
        this.parent.xPos = window.innerWidth / 2 - width / 2;
        this.parent.yPos = window.innerHeight / 2 - height / 2;
        this.parent.resizable = resizable;
        this.buttons = [];
    }

    render() {
        for (let button of this.buttons) {
            button.renderButton();
        }
    }

    checkInteraction(mouseX, mouseY) {
        for (let button of this.buttons) {
            if (button.checkPressed(mouseX, mouseY)) {
                break;
            }
        }
    }

    addButton(xPos, yPos, width, height, onClick) {
        this.buttons.push(new WindowButton(xPos, yPos, width, height, this, onClick));
    }

    getRelativeMouseX(mouseX) {
        if (mouseX < this.parent.xPos || mouseX > this.parent.xPos + this.width) {
            return null;
        }
        return mouseX - this.parent.xPos;
    }

    getRelativeMouseY(mouseY) {
        if (mouseY < this.parent.yPos || mouseY > this.parent.yPos + this.height) {
            return null;
        }
        return mouseY - this.parent.yPos;
    }

    getAbsoluteXPos() {
        return this.parent.xPos;
    }

    getAbsoluteYPos() {
        return this.parent.yPos;
    }
}

class WindowButton {
    constructor(xPos, yPos, width, height, parent, onClick) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.parent = parent;
        this.pressed = false;
        this.pressedTime = Date.now();
        this.onClick = onClick;
    }

    renderButton() {
        if (this.pressed) {
            ctx.fillStyle = "rgb(130, 130, 130)";
            ctx.fillRect(this.getAbsoluteXPos(), this.getAbsoluteYPos(), this.width, this.height);
            if (Date.now() - this.pressedTime > 80) {
                this.pressed = false;
            }
        }

        ctx.fillStyle = "black";
        ctx.fillRect(this.getAbsoluteXPos(), this.getAbsoluteYPos() + this.height - 2, this.width, 2);
        ctx.fillRect(this.getAbsoluteXPos() + this.width - 2, this.getAbsoluteYPos(), 2, this.height);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.getAbsoluteXPos() + 2, this.getAbsoluteYPos() + this.height - 4, this.width - 4, 2);
        ctx.fillRect(this.getAbsoluteXPos() + this.width - 4, this.getAbsoluteYPos() + 2, 2, this.height - 4);

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.getAbsoluteXPos(), this.getAbsoluteYPos(), this.width - 2, 2);
        ctx.fillRect(this.getAbsoluteXPos(), this.getAbsoluteYPos(), 2, this.height - 2);
    }

    checkPressed(mouseX, mouseY) {
        if (this.checkActivationArea(mouseX, mouseY)) {
            if (this.onClick != undefined) {
                this.onClick();
            }
            this.pressed = true;
            this.pressedTime = Date.now();
            return true;
        }
        return false;
    }

    getAbsoluteXPos() {
        return this.parent.getAbsoluteXPos() + this.xPos;
    }

    getAbsoluteYPos() {
        return this.parent.getAbsoluteYPos() + this.yPos;
    }

    checkActivationArea(mouseX, mouseY) {
        if (this.parent.getRelativeMouseX(mouseX) > this.xPos && this.parent.getRelativeMouseX(mouseX) < this.xPos + this.width) {
            if (this.parent.getRelativeMouseY(mouseY) > this.yPos && this.parent.getRelativeMouseY(mouseY) < this.yPos + this.height) {
                return true;
            }
        }
        return false;
    }
}