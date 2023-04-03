class HelpScreen extends WindowContent {
    constructor() {
        super(640, 480, "Help", false, './images/help.png');
    }

    render() {
        let xOffset = 44;
        let yOffset = 72;

        xOffset = 48;
        yOffset = 76;

        ctx.font = "50px franklin";
        xOffset = 44;
        yOffset = 106;
        ctx.fillText("How To Use", this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        ctx.font = "18px franklin";
        yOffset = 148;
        let lineText = "This website is designed to mimic the experience of desktop com-";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "puting. To get the full experience, it's recommended to NOT use a";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "mobile device to access this site.";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 32;
        lineText = "To get started using the site, try out some of the programs found";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "in the start menu. You can close, resize, move and minimize apps";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "just like you would with any desktop windowing operating system.";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 32;
        lineText = "If you find any bugs or would like to request a certain feature,";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        xOffset = 44;
        yOffset += 22;
        lineText = "you can contact me via my email at:";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 26;
        xOffset = 44;
        ctx.fillStyle = "#0000aa";
        lineText = "parker.smith@shaw.ca";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);
    }

    checkInteraction(xPos, yPos) {
        if (xPos > this.parent.xPos + 42 && xPos < this.parent.xPos + 238) {
            if (yPos > this.parent.yPos + 330 && yPos < this.parent.yPos + 350) {
                window.open("mailto:parker.smith@shaw.ca");
            }
        }
    }

    checkHoverInteraction(xPos, yPos) {
        if (xPos > this.parent.xPos + 42 && xPos < this.parent.xPos + 238) {
            if (yPos > this.parent.yPos + 330 && yPos < this.parent.yPos + 350) {
                document.getElementById("body").style.cursor = "pointer";
                return;
            }
        }

        document.getElementById("body").style.cursor = "default";
    }
}