class Notepad {
    constructor(width, height, textFile) {
        this.icon = './images/notepad.png';
        if (textFile != null) {
            this.content = textFile.textContent;
        } else {
            this.content = "";
        }
        this.parent = new DesktopWindow(width, height, textFile.fileName + " - Notepad", this);
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
            if (line * 20 + 60 > this.parent.height - 14) {
                break;
            }
            if (printString.charAt(i) == '\n') {
                line++;
                lineOffset = 0;
                continue;
            } else if (lineOffset + 10 >= this.parent.width - 28) {
                line++;
                lineOffset = 0;
                i--;
                continue;
            }
           ctx.fillText(printString.charAt(i), this.parent.xPos + 16 + lineOffset, this.parent.yPos + 64 + line * 20);
           lineOffset += CHAR_SIZE_MAP.get(printString.charAt(i)) / 1.3;
        }
    }

    checkInteraction(xPos, yPos) {
        if (xPos < this.parent.xPos + 10 || xPos > this.parent.xPos + this.parent.width - 10 ||
            yPos < this.parent.yPos + 42 || yPos > this.parent.yPos + this.parent.height - 8) {
            return;
        }
        this.showCursor = true;
    }

    checkInteractionRight(xPos, yPos) {

    }

    checkHoverInteraction(xPos, yPos) {

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
            case "Enter":
                this.writeChar("\n");
                return;
            case "Period":
                if (shiftPressed) {
                    this.writeChar(">");
                    return;
                }
                this.writeChar(".");
                return;
            case "Comma":
                if (shiftPressed) {
                    this.writeChar("<");
                    return;
                }
                this.writeChar(",");
                return;
            case "Slash":
                if (shiftPressed) {
                    this.writeChar("?");
                    return;
                }
                this.writeChar("/");
                return;
            case "Backslash":
                if (shiftPressed) {
                    this.writeChar("|");
                    return;
                }
                this.writeChar("\\");
                return;
            case "Semicolon":
                if (shiftPressed) {
                    this.writeChar(":");
                    return;
                }
                this.writeChar(";");
                return;
            case "Quote":
                if (shiftPressed) {
                    this.writeChar("\"");
                    return;
                }
                this.writeChar("\'");
                return;
            case "BracketLeft":
                if (shiftPressed) {
                    this.writeChar("{");
                    return;
                }
                this.writeChar("[");
                return;
            case "BracketRight":
                if (shiftPressed) {
                    this.writeChar("}");
                    return;
                }
                this.writeChar("]");
                return;
            case "Minus":
                if (shiftPressed) {
                    this.writeChar("_");
                    return;
                }
                this.writeChar("-");
                return;
            case "Equal":
                if (shiftPressed) {
                    this.writeChar("+");
                    return;
                }
                this.writeChar("=");
                return;
            case "Backquote":
                if (shiftPressed) {
                    this.writeChar("~");
                    return;
                }
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
                }
                return;
            case "ArrowRight":
                if (this.cursorPos < this.content.length) {
                    this.cursorPos++;
                }
                return;
            default:
                return;
        }
    }

    writeChar(character) {
        if (!shiftPressed) {
            character = character.toLowerCase();
        }
        if (!isNaN(character) && shiftPressed) {
            switch (character) {
                case '1':
                    character = '!';
                    break;
                case '2':
                    character = '@';
                    break;
                case '3':
                    character = '#';
                    break;
                case '4':
                    character = '$';
                    break;
                case '5':
                    character = '%';
                    break;
                case '6':
                    character = '^';
                    break;
                case '7':
                    character = '&';
                    break;
                case '8':
                    character = '*';
                    break;
                case '9':
                    character = '(';
                    break;
                case '0':
                    character = ')';
                    break;
            }
        }
        if (this.cursorPos == this.content.length) {
            this.content += character;
        } else if (this.cursorPos == 0) {
            this.content = character + this.content;
        } else {
            this.content = this.content.slice(0, this.cursorPos) + character + this.content.slice(this.cursorPos, this.content.length);
        }
        this.cursorPos++;
    }
}