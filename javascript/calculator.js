const FIRST_COLUMN = 31;
const SECOND_COLUMN = 81;
const THIRD_COLUMN = 131;
const FOURTH_COLUMN = 181;
const FIFTH_COLUMN = 231;

const FIRST_ROW = 183;
const SECOND_ROW = 233;
const THIRD_ROW = 283;
const FOURTH_ROW = 333;

const SPECIAL_ROW = 118;

const BACK_X = 83;
const CLEAR_ENTRY_X = 149;
const CLEAR_X = 217;

class Calculator extends WindowContent {
    constructor() {
        super(300, 400, "Calculator", false, './images/calculator.png');
        this.currentExpression = "";

        for (let i = 0; i < 9; i++) {
            let xOffset = (i % 3) * 50 + 31;
            let yOffset = -1 * Math.floor(i / 3) * 50 + 283;
            this.addButton(xOffset, yOffset, 38, 38, this.appendExpression.bind(this, i + 1));
        }
        this.addButton(FIRST_COLUMN, FOURTH_ROW, 38, 38, this.appendExpression.bind(this, 0));

        this.addButton(SECOND_COLUMN, FOURTH_ROW, 38, 38, this.appendExpression.bind(this, "negate"));
        this.addButton(THIRD_COLUMN, FOURTH_ROW, 38, 38, this.appendExpression.bind(this, "."));

        this.addButton(FOURTH_COLUMN, FIRST_ROW, 38, 38, this.appendExpression.bind(this, "/"));
        this.addButton(FOURTH_COLUMN, SECOND_ROW, 38, 38, this.appendExpression.bind(this, "*"));
        this.addButton(FOURTH_COLUMN, THIRD_ROW, 38, 38, this.appendExpression.bind(this, "-"));
        this.addButton(FOURTH_COLUMN, FOURTH_ROW, 38, 38, this.appendExpression.bind(this, "+"));

        this.addButton(FIFTH_COLUMN, FIRST_ROW, 38, 38, this.appendExpression.bind(this, "sqrt"));
        this.addButton(FIFTH_COLUMN, SECOND_ROW, 38, 38, this.appendExpression.bind(this, "%"));
        this.addButton(FIFTH_COLUMN, THIRD_ROW, 38, 38, this.appendExpression.bind(this, "inverse"));
        this.addButton(FIFTH_COLUMN, FOURTH_ROW, 38, 38, this.appendExpression.bind(this, "="));

        this.addButton(BACK_X, SPECIAL_ROW, 54, 38, this.appendExpression.bind(this, "back"));
        this.addButton(CLEAR_ENTRY_X, SPECIAL_ROW, 54, 38, this.appendExpression.bind(this, "clearEntry"));
        this.addButton(CLEAR_X, SPECIAL_ROW, 54, 38, this.appendExpression.bind(this, "clear"));
    }

    render() {
        super.render();
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

        // Draw numbers
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

        ctx.fillStyle = "#760000";
        ctx.font = "22px w95fa";
        ctx.fillText("C", this.parent.xPos + 33 + xOffset, this.parent.yPos + 124 + yOffset);

        // Clear entry button
        xOffset = 137;
        yOffset = 20;

        ctx.fillStyle = "#760000";
        ctx.font = "22px w95fa";
        ctx.fillText("CE", this.parent.xPos + 27 + xOffset, this.parent.yPos + 124 + yOffset);

        // Back button
        xOffset = 71;
        yOffset = 20;

        ctx.fillStyle = "#760000";
        ctx.font = "22px w95fa";
        ctx.fillText("Back", this.parent.xPos + 16 + xOffset, this.parent.yPos + 124 + yOffset);

        ctx.fillStyle = "black";
        ctx.font = "20px w95fa";
        ctx.fillText(this.currentExpression, this.parent.xPos + 20, this.parent.yPos + 67);

    }

    checkInteraction(mouseX, mouseY) {
        super.checkInteraction(mouseX, mouseY);
    }

    appendExpression(input) {
        if (this.currentExpression.length >= 18 && !(input == "=" || input == "clear")) {
            input = "";
        }
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

    checkHoverInteraction() {
        
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