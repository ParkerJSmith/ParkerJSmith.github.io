class AboutScreen {
    constructor() {
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

        ctx.font = "50px Franklin Gothic Regular";
        xOffset = 270;
        yOffset = 106;
        ctx.fillText("Welcome", this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        ctx.font = "20px Franklin Gothic Regular";
        yOffset = 148;
        let lineText = "This is a website created by Parker Smith";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "using vanilla  HTML / CSS / JS.  This  site";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "serves as Parker's  homepage and  inter-";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "active portfolio.";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 48;
        lineText = "From the desktop you can follow links to";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "various other projects created by Parker.";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "Everything  you see on  this site was cre-";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        xOffset = 44;
        yOffset += 22;
        lineText = "ated (or rather, recreated) by Parker himself. If you'd like to contact";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 22;
        lineText = "or otherwise learn more about Parker you can do so via:";
        ctx.fillText(lineText, this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        yOffset += 44;
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

    checkInteraction() {

    }
}