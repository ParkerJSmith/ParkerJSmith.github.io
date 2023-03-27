class Minesweeper {
    constructor() {
        this.icon = './images/wine.png';
        this.parent = new DesktopWindow(300, 443, "Winesweeper", this);
        this.parent.resizable = false;
        this.firstMove = true;
        this.spaceList = [];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.spaceList.push(new Space(i, j, 0, this.parent, this));
            }
        }
    }

    render() {
        // Borders of score area
        let xOffset = 14;
        let yOffset = 140;
        let gameWidth = this.parent.width - xOffset * 2;

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, gameWidth, 4);
        yOffset = 60;
        xOffset = 14 + gameWidth - 4;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 4, 84);

        xOffset = 14;
        yOffset = 60;

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, gameWidth, 1);
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 1, gameWidth - 1, 1);
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 2, gameWidth - 2, 1);
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 3, gameWidth - 3, 1);
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 1, 84);
        ctx.fillRect(this.parent.xPos + xOffset + 1, this.parent.yPos + yOffset, 1, 83);
        ctx.fillRect(this.parent.xPos + xOffset + 2, this.parent.yPos + yOffset, 1, 82);
        ctx.fillRect(this.parent.xPos + xOffset + 3, this.parent.yPos + yOffset, 1, 81);


        // Flags left
        yOffset = 72;
        xOffset = 26;

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 87, 60);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 85, 58);

        yOffset = 74;
        xOffset = 28;
        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 83, 56);

        // Timer
        yOffset = 72;
        xOffset = 187;

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 87, 60);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 85, 58);

        yOffset = 74;
        xOffset = 189;
        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 83, 56);

        // Middle
        yOffset = 72;
        xOffset = 120;

        ctx.fillStyle = "black";
        yOffset += 58;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 60, 2);
        yOffset -= 58;
        xOffset += 58;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 2, 60);

        xOffset -= 58;

        ctx.fillStyle = "rgb(130, 130, 130)";

        yOffset += 56;
        xOffset += 2;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 56, 2);
        yOffset -= 54;
        xOffset += 54;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 2, 56);
        xOffset -= 56;

        ctx.fillStyle = "rgb(235, 235, 235)";
        yOffset -= 2;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 58, 2);
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 2, 58);

        xOffset = 123;
        yOffset = 75;

        ctx.drawImage(document.getElementById("redoImage"), this.parent.xPos + xOffset, this.parent.yPos + yOffset);

        // Borders of playing area
        yOffset = 427;
        xOffset = 14;

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, gameWidth, 4);
        yOffset = 159;
        xOffset = 14 + gameWidth - 4;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 4, 268);

        xOffset = 14;
        yOffset = 159;

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, gameWidth, 1);
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 1, gameWidth - 1, 1);
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 2, gameWidth - 2, 1);
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 3, gameWidth - 3, 1);
        yOffset = 163;
        ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 1, 268);
        ctx.fillRect(this.parent.xPos + xOffset + 1, this.parent.yPos + yOffset, 1, 267);
        ctx.fillRect(this.parent.xPos + xOffset + 2, this.parent.yPos + yOffset, 1, 266);
        ctx.fillRect(this.parent.xPos + xOffset + 3, this.parent.yPos + yOffset, 1, 265);

        // Spaces
        for (let i = 0; i < this.spaceList.length; i++) {
            this.spaceList[i].render();
        }
    }

    checkInteraction(xPos, yPos) {
        if (xPos > this.parent.xPos + 120 && xPos < this.parent.xPos + 180) {
            if (yPos > this.parent.yPos + 72 && yPos < this.parent.yPos + 132) {
                this.resetGame();
                return;
            }
        }
        for (let i = 0; i < this.spaceList.length; i++) {
            this.spaceList[i].checkPressed(xPos, yPos);
        }
    }

    checkInteractionRight(xPos, yPos) {
        for (let i = 0; i < this.spaceList.length; i++) {
            this.spaceList[i].checkPressedRight(xPos, yPos);
        }
    }

    checkHoverInteraction(xPos, yPos) {

    }

    resetGame() {
        this.spaceList = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.spaceList.push(new Space(i, j, 0, this.parent, this));
            }
        }
        this.firstMove = true;
    }

    adjacentToSpace(space, potentialX, potentialY) {
        if (space.xCoord == potentialX && Math.abs(space.yCoord - potentialY) <= 1) {
            return true;
        }
        if (space.yCoord == potentialY && Math.abs(space.xCoord - potentialX) <= 1) {
            return true;
        }
        if (Math.abs(space.xCoord - potentialX) <= 1 && Math.abs(space.yCoord - potentialY) <= 1) {
            return true;
        }
        return false;
    }

    generateBoard(selectedSpace) {
        this.spaceList = [];
        let minesLeft = 10;
        let spacesLeft = 64;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (Math.random() < (minesLeft / spacesLeft)) {
                    if ((i == selectedSpace.xCoord && j == selectedSpace.yCoord) || this.adjacentToSpace(selectedSpace, i, j)) {
                        this.spaceList.push(new Space(i, j, 0, this.parent, this));
                        spacesLeft--;
                        continue;
                    }
                    this.spaceList.push(new Space(i, j, -1, this.parent, this));
                    minesLeft--;
                } else {
                    this.spaceList.push(new Space(i, j, 0, this.parent, this));
                }
                spacesLeft--;
            }
        }

        for (let i = 0; i < this.spaceList.length; i++) {
            if (this.spaceList[i].spaceType == -1) {
                if (this.spaceList[i].xCoord - 1 > -1 && this.spaceList[i - 8].spaceType != -1) {
                    this.spaceList[i - 8].spaceType += 1;
                }
                if (this.spaceList[i].xCoord + 1 < 8 && this.spaceList[i + 8].spaceType != -1) {
                    this.spaceList[i + 8].spaceType += 1;
                }

                if (this.spaceList[i].yCoord - 1 > -1) {
                    if (this.spaceList[i - 1].spaceType != -1) {
                        this.spaceList[i - 1].spaceType += 1;
                    }
                    // Top left
                    if (this.spaceList[i].xCoord - 1 > -1 && this.spaceList[i - 9].spaceType != -1) {
                        this.spaceList[i - 9].spaceType += 1;
                    }
                    // Top right
                    if (this.spaceList[i].xCoord + 1 < 8 && this.spaceList[i + 7].spaceType != -1) {
                        this.spaceList[i + 7].spaceType += 1;
                    }
                }
                if (this.spaceList[i].yCoord + 1 < 8) {
                    if (this.spaceList[i + 1].spaceType != -1) {
                        this.spaceList[i + 1].spaceType += 1;
                    }
                    // Bottom right
                    if (this.spaceList[i].xCoord + 1 < 8 && this.spaceList[i + 9].spaceType != -1) {
                        this.spaceList[i + 9].spaceType += 1;
                    }
                    // Bottom left
                    if (this.spaceList[i].xCoord - 1 > -1 && this.spaceList[i - 7].spaceType != -1) {
                        this.spaceList[i - 7].spaceType += 1;
                    }
                }
            }
        }
        this.firstMove = false;
        this.findEmptySpaces(this.spaceList[selectedSpace.xCoord * 8 + selectedSpace.yCoord]);
    }

    gameFail() {
        for (let i = 0; i < this.spaceList.length; i++) {
            if (this.spaceList[i].flagged && this.spaceList[i].spaceType == -1) {
                continue;
            }
            this.spaceList[i].hidden = false;
        }
    }

    findEmptySpaces(root) {
        root.hidden = false;

        if (root.spaceType != 0) {
            return;
        }

        let index = root.xCoord * 8 + root.yCoord;

        if (this.spaceList[index].xCoord - 1 > -1 && this.spaceList[index - 8].hidden) {
            this.findEmptySpaces(this.spaceList[index - 8]);
        }
        if (this.spaceList[index].xCoord + 1 < 8 && this.spaceList[index + 8].hidden) {
            this.findEmptySpaces(this.spaceList[index + 8]);
        }

        if (this.spaceList[index].yCoord - 1 > -1) {
            if (this.spaceList[index - 1].hidden) {
                this.findEmptySpaces(this.spaceList[index - 1]);
            }
            // Top left
            if (this.spaceList[index].xCoord - 1 > -1 && this.spaceList[index - 9].hidden) {
                this.findEmptySpaces(this.spaceList[index - 9]);
            }
            // Top right
            if (this.spaceList[index].xCoord + 1 < 8 && this.spaceList[index + 7].hidden) {
                this.findEmptySpaces(this.spaceList[index + 7]);
            }
        }
        if (this.spaceList[index].yCoord + 1 < 8) {
            if (this.spaceList[index + 1].hidden) {
                this.findEmptySpaces(this.spaceList[index + 1]);
            }
            // Bottom right
            if (this.spaceList[index].xCoord + 1 < 8 && this.spaceList[index + 9].hidden) {
                this.findEmptySpaces(this.spaceList[index + 9]);
            }
            // Bottom left
            if (this.spaceList[index].xCoord - 1 > -1 && this.spaceList[index - 7].hidden) {
                this.findEmptySpaces(this.spaceList[index - 7]);
            }
        }
    }
}

class Space {
    constructor(xCoord, yCoord, spaceType, parent, game) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.spaceType = spaceType;
        this.parent = parent;
        this.game = game;
        this.hidden = true;
        this.flagged = false;
    }

    render() {
        let xOffset = 18 + this.xCoord * 33;
        let yOffset = 163 + this.yCoord * 33;

        if (!this.hidden) {
            ctx.fillStyle = "black";
            yOffset += 31;
            xOffset -= 1;
            ctx.fillRect(this.parent.xPos + xOffset + 3, this.parent.yPos + yOffset, 3, 2);
            ctx.fillRect(this.parent.xPos + xOffset + 9, this.parent.yPos + yOffset, 3, 2);
            ctx.fillRect(this.parent.xPos + xOffset + 15, this.parent.yPos + yOffset, 3, 2);
            ctx.fillRect(this.parent.xPos + xOffset + 21, this.parent.yPos + yOffset, 3, 2);
            ctx.fillRect(this.parent.xPos + xOffset + 27, this.parent.yPos + yOffset, 3, 2);
            yOffset -= 31;
            xOffset += 32;
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 3, 2, 3);
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 9, 2, 3);
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 15, 2, 3);
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 21, 2, 3);
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset + 27, 2, 3);

            if (this.flagged && this.spaceType != -1) {
                xOffset -= 32;
                yOffset -= 1;
                ctx.drawImage(document.getElementById("noWineImage"), this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                return;
            }

            switch (this.spaceType) {
                case -1:
                    xOffset -= 32;
                    yOffset -= 1;
                    ctx.drawImage(document.getElementById("wineImage"), this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                    break;
                case 1:
                    xOffset -= 20;
                    yOffset += 24;
                    ctx.fillStyle = "blue";
                    ctx.fillText("1", this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                    break;
                case 2:
                    xOffset -= 21;
                    yOffset += 24;
                    ctx.fillStyle = "green";
                    ctx.fillText("2", this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                    break;
                case 3:
                    xOffset -= 21;
                    yOffset += 24;
                    ctx.fillStyle = "red";
                    ctx.fillText("3", this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                    break;
                case 4:
                    xOffset -= 21;
                    yOffset += 24;
                    ctx.fillStyle = "#2a2a94";
                    ctx.fillText("4", this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                    break;
                case 5:
                    xOffset -= 22;
                    yOffset += 24;
                    ctx.fillStyle = "#800000";
                    ctx.fillText("5", this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                    break;
                case 6:
                    xOffset -= 21;
                    yOffset += 24;
                    ctx.fillStyle = "#2a9494";
                    ctx.fillText("6", this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                    break;
                case 7:
                    xOffset -= 21;
                    yOffset += 24;
                    ctx.fillStyle = "black";
                    ctx.fillText("7", this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                    break;
                case 8:
                    xOffset -= 21;
                    yOffset += 24;
                    ctx.fillStyle = "#808080";
                    ctx.fillText("8", this.parent.xPos + xOffset, this.parent.yPos + yOffset);
                    break;
            }


        } else {
            ctx.fillStyle = "black";
            yOffset += 31;
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 33, 2);
            yOffset -= 31;
            xOffset += 31;
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 2, 33);

            xOffset -= 31;

            ctx.fillStyle = "rgb(130, 130, 130)";

            yOffset += 29;
            xOffset += 2;
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 29, 2);
            yOffset -= 27;
            xOffset += 27;
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 2, 29);
            xOffset -= 29;

            ctx.fillStyle = "rgb(235, 235, 235)";
            yOffset -= 2;
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 31, 2);
            ctx.fillRect(this.parent.xPos + xOffset, this.parent.yPos + yOffset, 2, 31);

            if (this.flagged) {
                xOffset -= 1;
                yOffset -= 1;
                ctx.drawImage(document.getElementById("flagImage"), this.parent.xPos + xOffset, this.parent.yPos + yOffset);
            }
        }
    }

    checkPressed(xPos, yPos) {
        let xOffset = 18 + this.xCoord * 33;
        let yOffset = 163 + this.yCoord * 33;
        if (xPos > this.parent.xPos + xOffset && xPos < this.parent.xPos + xOffset + 33) {
            if (yPos > this.parent.yPos + yOffset && yPos < this.parent.yPos + yOffset + 33) {
                if (this.flagged) {
                    return;
                }
                if (this.game.firstMove) {
                    this.game.generateBoard(this);
                    return;
                }
                if (this.spaceType == -1) {
                    this.game.gameFail();
                    return;
                }
                this.game.findEmptySpaces(this);
            }
        }
    }

    checkPressedRight(xPos, yPos) {
        let xOffset = 18 + this.xCoord * 33;
        let yOffset = 163 + this.yCoord * 33;
        if (xPos > this.parent.xPos + xOffset && xPos < this.parent.xPos + xOffset + 33) {
            if (yPos > this.parent.yPos + yOffset && yPos < this.parent.yPos + yOffset + 33) {
                this.flagged = !this.flagged;
            }
        }
    }
}