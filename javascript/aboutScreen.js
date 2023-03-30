class AboutScreen {
    constructor() {
        this.icon = './images/about.png';
        this.parent = new DesktopWindow(640, 480, "Welcome", this);
        this.parent.resizable = false;
        this.parent.xPos = window.innerWidth / 2 - 640 / 2;
        this.parent.yPos = window.innerHeight / 2 - 480 / 2;
    }

    render() {
        let imageWidth = 197;
        let imageHeight = 225;
        let xOffset = 44;
        let yOffset = 72;

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, imageWidth + 8, 4);
        yOffset += imageHeight + 4;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, imageWidth + 8, 4);
        yOffset = 76;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 4, imageHeight + 4);
        xOffset += imageWidth + 4;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 4, imageHeight + 4);

        xOffset = 48;
        yOffset = 76;

        ctx.drawImage(document.getElementById("parkerImage"), this.parent.xPos + xOffset, this.parent.yPos + yOffset, 197, 225);

        ctx.font = "50px franklin";
        xOffset = 270;
        yOffset = 106;
        ctx.fillText("Welcome", this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        ctx.font = "18px franklin";
        yOffset = 148;
        let lineText = "Hi, I'm Parker and this is my portfolio!";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "I'm a software developer with an int-";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "erest in web/desktop application deve-";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "lopment. I graduated in 2022 with a";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "B.Sc. in computer science from the";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "University of Calgary.";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 48;
        lineText = "Everything you see on this site was cre-";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        xOffset = 44;
        yOffset += 22;
        lineText = "ated by myself. The links on the desktop will take you to my other";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "projects. If you'd like to contact or otherwise learn more about me";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "you can do so via:";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 34;
        lineText = "GitHub:";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);
        ctx.fillStyle = "#0000aa";
        xOffset += 70;
        lineText = "github.com/parkerjsmith";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 26;
        xOffset = 44;
        ctx.fillStyle = "black";
        lineText = "LinkedIn:";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);
        ctx.fillStyle = "#0000aa";
        xOffset += 84;
        lineText = "linkedin.com/in/parkersmith99";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 26;
        xOffset = 44;
        ctx.fillStyle = "black";
        lineText = "Email:";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);
        ctx.fillStyle = "#0000aa";
        xOffset += 61;
        lineText = "parker.smith@shaw.ca";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);
    }

    checkInteraction(xPos, yPos) {
        if (xPos > this.parent.xPos + 110 && xPos < this.parent.xPos + 330) {
            if (yPos > this.parent.yPos + 390 && yPos < this.parent.yPos + 407) {
                window.open("https://github.com/ParkerJSmith");
            }
        }

        if (xPos > this.parent.xPos + 120 && xPos < this.parent.xPos + 402) {
            if (yPos > this.parent.yPos + 415 && yPos < this.parent.yPos + 433) {
                window.open("https://www.linkedin.com/in/parker-smith99/");
            }
        }

        if (xPos > this.parent.xPos + 100 && xPos < this.parent.xPos + 302) {
            if (yPos > this.parent.yPos + 441 && yPos < this.parent.yPos + 459) {
                window.open("mailto:parker.smith@shaw.ca");
            }
        }
    }

    checkHoverInteraction(xPos, yPos) {
        if (xPos > this.parent.xPos + 110 && xPos < this.parent.xPos + 330) {
            if (yPos > this.parent.yPos + 390 && yPos < this.parent.yPos + 407) {
                document.getElementById("body").style.cursor = "pointer";
                return;
            }
        }

        if (xPos > this.parent.xPos + 120 && xPos < this.parent.xPos + 402) {
            if (yPos > this.parent.yPos + 415 && yPos < this.parent.yPos + 433) {
                document.getElementById("body").style.cursor = "pointer";
                return;
            }
        }

        if (xPos > this.parent.xPos + 100 && xPos < this.parent.xPos + 302) {
            if (yPos > this.parent.yPos + 441 && yPos < this.parent.yPos + 459) {
                document.getElementById("body").style.cursor = "pointer";
                return;
            }
        }

        document.getElementById("body").style.cursor = "default";
    }
}