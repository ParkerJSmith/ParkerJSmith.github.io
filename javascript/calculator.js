class Calculator {
    constructor() {
        this.parent = new DesktopWindow(300, 400, "Calculator", this);
        this.parent.resizable = false;
        this.currentExpression = "";
        this.buttonsList = [];
        for (let i = 0; i < 9; i++) {
            let xOffset = (i % 3) * 50 + 31;
            let yOffset = -1 * Math.floor(i / 3) * 50 + 283;
            this.buttonsList.push(new CalculatorButton(i + 1, xOffset, yOffset, 38, 38, this.parent));
        }
        this.buttonsList.push(new CalculatorButton(0, 31, 333, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("negate", 81, 333, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton(".", 131, 333, 38, 38, this.parent));

        this.buttonsList.push(new CalculatorButton("/", 181, 183, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("*", 181, 233, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("-", 181, 283, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("+", 181, 333, 38, 38, this.parent));

        this.buttonsList.push(new CalculatorButton("sqrt", 231, 183, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("%", 231, 233, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("inverse", 231, 283, 38, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("=", 231, 333, 38, 38, this.parent));

        this.buttonsList.push(new CalculatorButton("back", 83, 118, 54, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("clearEntry", 149, 118, 54, 38, this.parent));
        this.buttonsList.push(new CalculatorButton("clear", 217, 118, 54, 38, this.parent));
    }

    render() {

        // Draw screen
        ctx.fillStyle = "white";
        ctx.fillRect(this.parent.xPos + 10, this.parent.yPos + 40, this.parent.width - 18, 40);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + 10, this.parent.yPos + 40, this.parent.width - 18, 2);
        ctx.fillRect(this.parent.xPos + 10, this.parent.yPos + 40, 2, 40);

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + 12, this.parent.yPos + 42, this.parent.width - 22, 2);
        ctx.fillRect(this.parent.xPos + 12, this.parent.yPos + 42, 2, 36);

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + 12, this.parent.yPos + 78, this.parent.width - 20, 2);
        ctx.fillRect(this.parent.xPos + this.parent.width - 10, this.parent.yPos + 42, 2, 36);

        // Draw number buttons
        for (let i = 0; i < 20; i++) {
            let xOffset = (i % 5) * 50 + 19;
            let yOffset = Math.floor(i / 5) * 50 + 85;

            ctx.fillStyle = "black";
            ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 134 + yOffset, 36, 2);
            ctx.fillRect(this.parent.xPos + 48 + xOffset, this.parent.yPos + 98 + yOffset, 2, 38);

            ctx.fillStyle = "rgb(130, 130, 130)";
            ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 132 + yOffset, 34, 2);
            ctx.fillRect(this.parent.xPos + 46 + xOffset, this.parent.yPos + 98 + yOffset, 2, 36);

            ctx.fillStyle = "rgb(235, 235, 235)";
            ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 98 + yOffset, 36, 2);
            ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 100 + yOffset, 2, 34);
        }

        ctx.font = "26px w95fa";
        for (let i = 0; i < 9; i++) {
            ctx.fillStyle = "#0000aa";
            let xOffset = this.parent.xPos + (i % 3) * 50 + 42;
            let yOffset = this.parent.yPos - Math.floor(i / 3) * 50 + 310;
            ctx.fillText(i + 1, xOffset, yOffset);
        }

        ctx.fillText("0", this.parent.xPos + 42, this.parent.yPos + 360);
        ctx.fillText('\u00b1', this.parent.xPos + 92, this.parent.yPos + 360);
        ctx.fillText(".", this.parent.xPos + 147, this.parent.yPos + 358);

        // Draw operations
        ctx.fillStyle = "red";
        ctx.fillText("/", this.parent.xPos + 194, this.parent.yPos + 210);
        ctx.fillText("*", this.parent.xPos + 195, this.parent.yPos + 267);
        ctx.fillText("-", this.parent.xPos + 193, this.parent.yPos + 306);
        ctx.fillText("+", this.parent.xPos + 193, this.parent.yPos + 355);
        ctx.fillText("=", this.parent.xPos + 243, this.parent.yPos + 355);

        ctx.fillStyle = "#151587";
        ctx.fillText("%", this.parent.xPos + 241, this.parent.yPos + 260);
        ctx.font = "22px w95fa";
        ctx.fillText("1/x", this.parent.xPos + 235, this.parent.yPos + 308);
        ctx.font = "18px w95fa";
        ctx.fillText("sqrt", this.parent.xPos + 236, this.parent.yPos + 207);

        // Clear button
        let xOffset = 205;
        let yOffset = 20;

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 134 + yOffset, 52, 2);
        ctx.fillRect(this.parent.xPos + 64 + xOffset, this.parent.yPos + 98 + yOffset, 2, 38);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + 14 + xOffset, this.parent.yPos + 132 + yOffset, 48, 2);
        ctx.fillRect(this.parent.xPos + 62 + xOffset, this.parent.yPos + 98 + yOffset, 2, 36);

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 98 + yOffset, 52, 2);
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 100 + yOffset, 2, 34);

        ctx.fillStyle = "#760000";
        ctx.font = "22px w95fa";
        ctx.fillText("C", this.parent.xPos + 33 + xOffset, this.parent.yPos + 124 + yOffset);

        // Clear entry button
        xOffset = 137;
        yOffset = 20;

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 134 + yOffset, 52, 2);
        ctx.fillRect(this.parent.xPos + 64 + xOffset, this.parent.yPos + 98 + yOffset, 2, 38);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + 14 + xOffset, this.parent.yPos + 132 + yOffset, 48, 2);
        ctx.fillRect(this.parent.xPos + 62 + xOffset, this.parent.yPos + 98 + yOffset, 2, 36);

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 98 + yOffset, 52, 2);
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 100 + yOffset, 2, 34);

        ctx.fillStyle = "#760000";
        ctx.font = "22px w95fa";
        ctx.fillText("CE", this.parent.xPos + 27 + xOffset, this.parent.yPos + 124 + yOffset);

        // Back button
        xOffset = 71;
        yOffset = 20;

        ctx.fillStyle = "black";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 134 + yOffset, 52, 2);
        ctx.fillRect(this.parent.xPos + 64 + xOffset, this.parent.yPos + 98 + yOffset, 2, 38);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.parent.xPos + 14 + xOffset, this.parent.yPos + 132 + yOffset, 48, 2);
        ctx.fillRect(this.parent.xPos + 62 + xOffset, this.parent.yPos + 98 + yOffset, 2, 36);

        ctx.fillStyle = "rgb(235, 235, 235)";
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 98 + yOffset, 52, 2);
        ctx.fillRect(this.parent.xPos + 12 + xOffset, this.parent.yPos + 100 + yOffset, 2, 34);

        ctx.fillStyle = "#760000";
        ctx.font = "22px w95fa";
        ctx.fillText("Back", this.parent.xPos + 16 + xOffset, this.parent.yPos + 124 + yOffset);

        ctx.fillStyle = "black";
        ctx.font = "20px w95fa";
        ctx.fillText(this.currentExpression, this.parent.xPos + 20, this.parent.yPos + 67);

    }

    checkInteraction(xPos, yPos) {
        if (xPos < this.parent.xPos || xPos > this.parent.xPos + this.parent.width ||
            yPos < this.parent.yPos || yPos > this.parent.yPos + this.parent.height) {
            return;
        }
        for (let i = 0; i < this.buttonsList.length; i++) {
            let input = this.buttonsList[i].checkPressed(xPos, yPos);
            if (!isNaN(input)) {
                this.currentExpression += input;
            } else {
                switch (input) {
                    case "=":
                        this.currentExpression = this.evaluateExpression(this.currentExpression);
                        break;
                    case "clear":
                        this.currentExpression = "";
                        break;
                    case "back":
                        this.currentExpression = this.currentExpression.slice(0, this.currentExpression.length - 1);
                        break;
                    case "+":
                        this.currentExpression += " " + input + " ";
                        break;
                    case "-":
                        this.currentExpression += " " + input + " ";
                        break;
                    case "/":
                        this.currentExpression += " " + input + " ";
                        break;
                    case "*":
                        this.currentExpression += " " + input + " ";
                        break;
                    case ".":
                        this.currentExpression += ".";
                        break;
                }
            }
        }
    }

    evaluateExpression(expression) {
        expression = expression.replace(/ /g, '');
        while (expression.includes("*") || expression.includes("/")) {
            let operation = "";
            if (expression.indexOf("*") == -1) {
                operation = "/";
            } else if (expression.indexOf("/") == -1) {
                operation = "*";
            } else {
                if (expression.indexOf("*") < expression.indexOf("/")) {
                    operation = "*";
                } else {
                    operation = "/";
                }
            }
            let leftNumber = "";
            let i = expression.indexOf(operation) - 1;
            while (expression.charAt(i) != '' && (!isNaN(expression.charAt(i)) || expression.charAt(i) == ".")) {
                i--;
            }
            leftNumber = expression.slice(i + 1, expression.indexOf(operation));

            let rightNumber = "";
            let j = expression.indexOf(operation) + 1;
            while (expression.charAt(j) != '' && (!isNaN(expression.charAt(j)) || expression.charAt(j) == ".")) {
                j++;
            }
            rightNumber = expression.slice(expression.indexOf(operation) + 1, j);
            if (i == -1) {
                if (operation == "*") {
                    expression = (parseFloat(leftNumber) * parseFloat(rightNumber)) + expression.slice(j, expression.length);
                } else {
                    expression = (parseFloat(leftNumber) / parseFloat(rightNumber)) + expression.slice(j, expression.length);
                }
            } else {
                if (operation == "*") {
                    expression = expression.slice(0, i + 1) + (parseFloat(leftNumber) * parseFloat(rightNumber)) + expression.slice(j, expression.length);
                } else {
                    expression = expression.slice(0, i + 1) + (parseFloat(leftNumber) / parseFloat(rightNumber)) + expression.slice(j, expression.length);
                }
            }
        }
        while (expression.includes("+") || expression.includes("-")) {
            let operation = "";
            if (expression.indexOf("+") == -1) {
                operation = "-";
            } else if (expression.indexOf("-") == -1) {
                operation = "+";
            } else {
                if (expression.indexOf("+") < expression.indexOf("-")) {
                    operation = "+";
                } else {
                    operation = "-";
                }
            }
            let leftNumber = "";
            let i = expression.indexOf(operation) - 1;
            while (expression.charAt(i) != '' && (!isNaN(expression.charAt(i)) || expression.charAt(i) == ".")) {
                i--;
            }
            leftNumber = expression.slice(i + 1, expression.indexOf(operation));

            let rightNumber = "";
            let j = expression.indexOf(operation) + 1;
            while (expression.charAt(j) != '' && (!isNaN(expression.charAt(j)) || expression.charAt(j) == ".")) {
                j++;
            }
            rightNumber = expression.slice(expression.indexOf(operation) + 1, j);
            if (i == -1) {
                if (operation == "+") {
                    expression = (parseFloat(leftNumber) + parseFloat(rightNumber)) + expression.slice(j, expression.length);
                } else {
                    expression = (parseFloat(leftNumber) - parseFloat(rightNumber)) + expression.slice(j, expression.length);
                }
            } else {
                if (operation == "+") {
                    expression = expression.slice(0, i + 1) + (parseFloat(leftNumber) + parseFloat(rightNumber)) + expression.slice(j, expression.length);
                } else {
                    expression = expression.slice(0, i + 1) + (parseFloat(leftNumber) - parseFloat(rightNumber)) + expression.slice(j, expression.length);
                }
            }
        }
        return expression;
    }
}

class CalculatorButton {
    constructor(buttonValue, xPos, yPos, width, height, parent) {
        this.buttonValue = buttonValue;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.parent = parent;
    }

    checkPressed(xPos, yPos) {
        if (xPos > this.parent.xPos + this.xPos && xPos < this.parent.xPos + this.xPos + this.width) {
            if (yPos > this.parent.yPos + this.yPos && yPos < this.parent.yPos + this.yPos + this.height) {
                return this.buttonValue;
            }
        }
        return "";
    }
}