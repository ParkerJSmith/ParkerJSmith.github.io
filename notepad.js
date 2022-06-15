const testString = "1. The morning sun always gonna shine again\n\
2. A pot of gold waits at every rainbow's end\n\
3. Roses kissed with dew\n\
4. Make believe, fairy tales and lucky charms\n\
5. Promises, spoken as you cross your heart\n\
6. Skies forever blue\n\
7. Silver linings\n\
8. There'll come a day, maybe it will be tomorrow. When the blue bird flies away\n\
9. A dream can still come true\n\
10. Friends and laughter and the wonders love can do\n\
11. Songs and magic\n\
12. Second chances QWERTYUIOPASDFGHJKLZXCVBNM";

const ultraThinChars = ['i', 'l'];
const thinChars = ['r', 'f', 'j', 't', 'I', '\''];
const mediumChars = ['N', 'R', 'P', 'C', 'E', 'B', 'K'];
const wideChars = ['w', 'm', 'M', 'G', 'A', 'D', 'H', 'O', 'Q', 'U', 'V', 'X', 'Y', 'Z'];
const ultraWideChars = ['W'];

class Notepad {
    constructor(width, height, name) {
        this.parent = new DesktopWindow(width, height, name, this);
        openWindows.push(this.parent);
        this.content = testString;
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
                continue;
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
        console.log("clicked the notepad");
    }

    addType(character) {
        character = character.replace("Key", "");
        if (character.length == 1) {
            this.content += character.toLowerCase();
            this.cursorPos++;
        }
        switch(character) {
            case "Space":
                this.content += " ";
                this.cursorPos++;
                return;
            case "Backspace":
                this.content = this.content.slice(0, this.content.length - 1);
                this.cursorPos--;
                return;
            default:
                return;
        }
    }
}