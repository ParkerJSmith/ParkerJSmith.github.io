class PopupWindow extends WindowContent {
    constructor(name, textContent, button1Text, button2Text, action) {
        let width = Math.ceil(Math.max((button1Text.length * 13), (button2Text.length * 13)) * 3);
        let height = 180;
        super(width, height, name, false, './images/warning.png');
        this.parent.moveable = false;
        this.parent.minimizable = false;
        this.textContent = textContent;
        this.button1Text = button1Text;
        this.button2Text = button2Text;
        this.action = action;

        let buttonWidth = this.button1Text.length * 13;
        let buttonHeight = 38;
        let xPos = (this.parent.width / 4) - (buttonWidth / 2);
        let yPos = ((this.parent.height / 4) * 3) - (buttonHeight / 2);
        this.addButton(xPos, yPos, buttonWidth, buttonHeight, action);

        xPos = ((this.parent.width / 4) * 3) - (buttonWidth / 2);
        yPos = ((this.parent.height / 4) * 3) - (buttonHeight / 2);
        this.addButton(xPos, yPos, buttonWidth, buttonHeight, this.closePopup.bind(this));
    }

    render() {
        super.render();
        let xOffset = (this.parent.width / 4) - (this.buttons[0].width / 2);
        let yOffset = ((this.parent.height / 4) * 3) - (this.buttons[0].height / 2);

        ctx.fillStyle = "black";
        ctx.font = "22px w95fa";
        yOffset += 24;
        xOffset += 12;
        ctx.fillText(this.button1Text, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        xOffset = ((this.parent.width / 4) * 3) - (this.buttons[1].width / 2);
        ctx.fillStyle = "black";
        ctx.font = "22px w95fa";
        xOffset += 27;
        ctx.fillText(this.button2Text, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        xOffset = 16;
        yOffset = 80;
        ctx.fillText(this.textContent, this.parent.xPos + xOffset, this.parent.yPos + yOffset);
    }

    checkInteraction(mouseX, mouseY) {
        super.checkInteraction(mouseX, mouseY);
    }
    
    checkInteractionRight(xPos, yPos) {

    }

    checkHoverInteraction(xPos, yPos) {

    }

    closePopup() {
        this.parent.closeWindow();
    }
}