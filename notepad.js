const ultraThinChars = ['i', 'l'];
const thinChars = ['r', 'f', 'j', 't', 'I', '\''];
const mediumChars = ['N', 'R', 'P', 'C', 'E', 'B', 'K'];
const wideChars = ['w', 'm', 'M', 'G', 'A', 'D', 'H', 'O', 'Q', 'U', 'V', 'X', 'Y', 'Z'];
const ultraWideChars = ['W'];

class Notepad {
    constructor(width, height, textFile) {
        if (textFile != null) {
            this.content = textFile.textContent;
        } else {
            this.content = "";
        }
        this.parent = new DesktopWindow(width, height, textFile.fileName + " - Notepad", this);
        openWindows.push(this.parent);
        this.textFile = textFile;
        this.showCursor = false;
        this.cursorPos = this.content.length;
        this.cursorAnimationFrame = 0;
    }

    render() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.parent.xPos + 10, this.parent.yPos + 42, this.parent.width - 18, this.parent.height - 48);

        ctx.fillStyle = "black";
        ctx.font = "20px w95fa";

        let printString = this.content;

        if (this.showCursor && this.cursorAnimationFrame > 70) {
            printString = printString.slice(0, this.cursorPos) + "_" + printString.slice(this.cursorPos);
            this.cursorAnimationFrame++;
            if (this.cursorAnimationFrame > 160) {
                this.cursorAnimationFrame = 0;
            }
        } else {
            printString = printString.slice(0, this.cursorPos) + " " + printString.slice(this.cursorPos);
            this.cursorAnimationFrame++;
        }

        let line = 0;
        let lineOffset = 0;

        for (let i = 0; i < printString.length; i++) {
            if (line * 20 + 60 > this.parent.height - 10) {
                break;
            }
            if (printString.charAt(i) == '\n' || lineOffset + 10 >= this.parent.width - 28) {
                line++;
                lineOffset = 0;
            }
            if (ultraThinChars.includes(printString.charAt(i))) {
                ctx.fillText(printString.charAt(i), this.parent.xPos + 16 + lineOffset, this.parent.yPos + 64 + line * 20);
                lineOffset += 4;
                continue;
            }
            if (thinChars.includes(printString.charAt(i))) {
                ctx.fillText(printString.charAt(i), this.parent.xPos + 16 + lineOffset, this.parent.yPos + 64 + line * 20);
                lineOffset += 5;
                continue;
            }
            if (mediumChars.includes(printString.charAt(i))) {
                ctx.fillText(printString.charAt(i), this.parent.xPos + 16 + lineOffset, this.parent.yPos + 64 + line * 20);
                lineOffset += 11;
                continue;
            }
            if (wideChars.includes(printString.charAt(i))) {
                ctx.fillText(printString.charAt(i), this.parent.xPos + 16 + lineOffset, this.parent.yPos + 64 + line * 20);
                lineOffset += 13;
                continue;
            }
            if (ultraWideChars.includes(printString.charAt(i))) {
                ctx.fillText(printString.charAt(i), this.parent.xPos + 16 + lineOffset, this.parent.yPos + 64 + line * 20);
                lineOffset += 20;
                continue;
            }
            ctx.fillText(printString.charAt(i), this.parent.xPos + 16 + lineOffset, this.parent.yPos + 64 + line * 20);
            lineOffset += 10;
        }
    }

    checkInteraction(xPos, yPos) {
        if (xPos < this.parent.xPos + 10 || xPos > this.parent.xPos + this.parent.width - 10 ||
            yPos < this.parent.yPos + 42 || yPos > this.parent.yPos + this.parent.height - 8) {
            return;
        }
        this.showCursor = true;
    }

    addType(character) {
        character = character.replace("Key", "");
        character = character.replace("Digit", "");
        if (character.length == 1) {
            this.writeChar(character);
        }
        switch (character) {
            case "Space":
                this.writeChar(" ");
                return;
            case "Period":
                this.writeChar(".");
                return;
            case "Comma":
                this.writeChar(",");
                return;
            case "Slash":
                this.writeChar("/");
                return;
            case "Backslash":
                this.writeChar("\\");
                return;
            case "Semicolon":
                this.writeChar(";");
                return;
            case "Quote":
                this.writeChar("\'");
                return;
            case "BracketLeft":
                this.writeChar("[");
                return;
            case "BracketRight":
                this.writeChar("]");
                return;
            case "Minus":
                this.writeChar("-");
                return;
            case "Equal":
                this.writeChar("=");
                return;
            case "Backquote":
                this.writeChar("`");
                return;
            case "Backspace":
                if (this.cursorPos == 0) {
                    return;
                }
                this.content = this.content.slice(0, this.cursorPos - 1) + this.content.slice(this.cursorPos, this.content.length);
                if (this.cursorPos > 0) {
                    this.cursorPos--;
                }
                return;

            case "ArrowLeft":
                if (this.cursorPos > 0) {
                    this.cursorPos--;
                    console.log(this.content.slice(0, this.cursorPos) + "|" + this.content.slice(this.cursorPos, this.content.length));
                }
                return;
            case "ArrowRight":
                if (this.cursorPos < this.content.length) {
                    this.cursorPos++;
                    console.log(this.content.slice(0, this.cursorPos ) + "|" + this.content.slice(this.cursorPos, this.content.length));
                }
                return;
            default:
                return;
        }
    }

    writeChar(character) {
        if (this.cursorPos == this.content.length) {
            this.content += character.toLowerCase();
        } else if (this.cursorPos == 0) {
            this.content = character.toLowerCase() + this.content;
        } else {
            this.content = this.content.slice(0, this.cursorPos) + character.toLowerCase() + this.content.slice(this.cursorPos, this.content.length);
        }
        this.cursorPos++;
    }
}