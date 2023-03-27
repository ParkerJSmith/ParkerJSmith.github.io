class DesktopWindow {
    constructor(width, height, name, windowContent) {
        this.width = width;
        this.height = height;
        this.minWidth = 200;
        this.minHeight = 80;
        this.name = name;
        this.windowContent = windowContent;
        this.xPos = 100;
        this.yPos = 100;
        this.dragging = false;
        this.dragX = 0;
        this.dragY = 0;
        this.resizeDragging = false;
        this.resizeDragDirection = "none";
        this.resizeDragX = 0;
        this.resizeDragY = 0;
        this.moveable = true;
        this.resizable = true;
        this.fullscreen = false;
        this.minimized = false;
        this.close = false;
        this.taskbarIcon = windowContent.icon;
        this.windowIndex = addWindow(this);
        this.taskbarElement = this.generateTaskbarTab();
    }

    render() {
        if (this.minimized) {
            return;
        }
        // Draw window
        ctx.fillStyle = "rgb(195, 195, 195)";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);

        // Draw borders
        ctx.fillStyle = "white";
        ctx.fillRect(this.xPos + 2, this.yPos + 2, this.width - 4, 2);
        ctx.fillRect(this.xPos + 2, this.yPos + 2, 2, this.height - 4);

        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.xPos + 2, this.yPos + this.height - 2, this.width - 2, 2);
        ctx.fillRect(this.xPos + this.width - 2, this.yPos + 2, 2, this.height - 2);

        ctx.fillStyle = "black";
        ctx.fillRect(this.xPos, this.yPos + this.height, this.width, 2);
        ctx.fillRect(this.xPos + this.width, this.yPos, 2, this.height + 2);

        // Draw title
        ctx.fillStyle = "#0000aa";
        ctx.fillRect(this.xPos + 6, this.yPos + 6, this.width - 10, 30);

        ctx.fillStyle = "white";
        ctx.font = "26px w95fa";
        let charXOffset = 0;
        for (let i = 0; i < this.name.length; i++) {
            ctx.fillText(this.name.at(i), this.xPos + charXOffset + 12, this.yPos + 30);
            charXOffset += CHAR_SIZE_MAP.get(this.name.at(i));
            if (charXOffset > this.width - 84) {
                break;
            }
        }

        // Draw x button
        ctx.fillStyle = "rgb(195, 195, 195)";
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 10, 22, 22);
        ctx.fillStyle = "black";
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 30, 22, 2);
        ctx.fillRect(this.xPos + this.width - 10, this.yPos + 10, 2, 22);
        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 28, 20, 2);
        ctx.fillRect(this.xPos + this.width - 12, this.yPos + 10, 2, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 10, 20, 2);
        ctx.fillRect(this.xPos + this.width - 30, this.yPos + 10, 2, 20);

        ctx.drawImage(document.getElementById("xImage"), this.xPos + this.width - 27, this.yPos + 13);

        // Draw fullsize button
        if (this.resizable) {
            ctx.fillStyle = "rgb(195, 195, 195)";
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 10, 22, 22);
            ctx.fillStyle = "black";
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 30, 22, 2);
            ctx.fillRect(this.xPos + this.width - 35, this.yPos + 10, 2, 22);
            ctx.fillStyle = "rgb(130, 130, 130)";
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 28, 20, 2);
            ctx.fillRect(this.xPos + this.width - 37, this.yPos + 10, 2, 20);
            ctx.fillStyle = "white";
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 10, 20, 2);
            ctx.fillRect(this.xPos + this.width - 55, this.yPos + 10, 2, 20);

            ctx.fillStyle = "black";
            ctx.fillRect(this.xPos + this.width - 51, this.yPos + 14, 12, 2);
            ctx.fillRect(this.xPos + this.width - 51, this.yPos + 19, 12, 7);
            ctx.fillRect(this.xPos + this.width - 51, this.yPos + 16, 2, 4);
            ctx.fillRect(this.xPos + this.width - 41, this.yPos + 16, 2, 4);
        }

        // Draw minimize button
        let minimizeOffset = 0;
        if (this.resizable) {
            minimizeOffset = 25;
        }
        ctx.fillStyle = "rgb(195, 195, 195)";
        ctx.fillRect(this.xPos + this.width - 55 - minimizeOffset, this.yPos + 10, 22, 22);
        ctx.fillStyle = "black";
        ctx.fillRect(this.xPos + this.width - 55 - minimizeOffset, this.yPos + 30, 22, 2);
        ctx.fillRect(this.xPos + this.width - 35 - minimizeOffset, this.yPos + 10, 2, 22);
        ctx.fillStyle = "rgb(130, 130, 130)";
        ctx.fillRect(this.xPos + this.width - 55 - minimizeOffset, this.yPos + 28, 20, 2);
        ctx.fillRect(this.xPos + this.width - 37 - minimizeOffset, this.yPos + 10, 2, 20);
        ctx.fillStyle = "white";
        ctx.fillRect(this.xPos + this.width - 55 - minimizeOffset, this.yPos + 10, 20, 2);
        ctx.fillRect(this.xPos + this.width - 55 - minimizeOffset, this.yPos + 10, 2, 20);

        ctx.fillStyle = "black";
        ctx.fillRect(this.xPos + this.width - 51 - minimizeOffset, this.yPos + 24, 12, 2);

        this.windowContent.render();
    }

    checkInteraction(xPos, yPos) {
        if (this.minimized) {
            return -1;
        }
        if (this.checkClose(xPos, yPos)) {
            return -1;
        }
        if (this.checkMinimize(xPos, yPos)) {
            return -1;
        }
        if (this.checkFullsize(xPos, yPos)) {
            return -1;
        }
        if (xPos > this.xPos && xPos < this.xPos + this.width) {
            if (yPos > this.yPos && yPos < this.yPos + this.height) {
                this.windowContent.checkInteraction(xPos, yPos);
                return 1;
            }
        }
        return 0;
    }

    checkInteractionRight(xPos, yPos) {
        if (this.minimized) {
            return;
        }
        if (xPos > this.xPos && xPos < this.xPos + this.width) {
            if (yPos > this.yPos && yPos < this.yPos + this.height) {
                this.windowContent.checkInteractionRight(xPos, yPos);
            }
        }
    }

    checkHoverInteraction(xPos, yPos) {
        if (this.minimized) {
            return;
        }
        this.windowContent.checkHoverInteraction(xPos, yPos);
    }

    checkResizeHover(xPos, yPos) {
        if (!this.resizable || this.minimized) {
            return false;
        }

        const RESIZE_BOX_SIZE = 8;
        // Top left check
        if (xPos > this.xPos - RESIZE_BOX_SIZE && xPos < this.xPos + RESIZE_BOX_SIZE) {
            if (yPos > this.yPos - RESIZE_BOX_SIZE && yPos < this.yPos + RESIZE_BOX_SIZE) {
                document.getElementById("body").style.cursor = "nw-resize";
                return true;
            }
        }

        // Bottom left check 
        if (xPos > this.xPos - RESIZE_BOX_SIZE && xPos < this.xPos + RESIZE_BOX_SIZE) {
            if (yPos > this.yPos + this.height - RESIZE_BOX_SIZE && yPos < this.yPos + this.height + RESIZE_BOX_SIZE) {
                document.getElementById("body").style.cursor = "sw-resize";
                return true;
            }
        }

        // Top right check 
        if (xPos > this.xPos + this.width - RESIZE_BOX_SIZE && xPos < this.xPos + this.width + RESIZE_BOX_SIZE) {
            if (yPos > this.yPos - RESIZE_BOX_SIZE && yPos < this.yPos + RESIZE_BOX_SIZE) {
                document.getElementById("body").style.cursor = "ne-resize";
                return true;
            }
        }

        // Bottom right check 
        if (xPos > this.xPos + this.width - RESIZE_BOX_SIZE && xPos < this.xPos + this.width + RESIZE_BOX_SIZE) {
            if (yPos > this.yPos + this.height - RESIZE_BOX_SIZE && yPos < this.yPos + this.height + RESIZE_BOX_SIZE) {
                document.getElementById("body").style.cursor = "se-resize";
                return true;
            }
        }

        return false;
    }

    checkResizeDrag(xPos, yPos) {
        if (!this.resizable || this.minimized) {
            return false;
        }

        const RESIZE_BOX_SIZE = 8;
        // Top left check
        if (xPos > this.xPos - RESIZE_BOX_SIZE && xPos < this.xPos + RESIZE_BOX_SIZE) {
            if (yPos > this.yPos - RESIZE_BOX_SIZE && yPos < this.yPos + RESIZE_BOX_SIZE) {
                this.resizeDragging = true;
                this.resizeDragDirection = "nw";
                this.resizeDragX = xPos;
                this.resizeDragY = yPos;
                this.fullscreen = false;
                return true;
            }
        }

        // Bottom left check 
        if (xPos > this.xPos - RESIZE_BOX_SIZE && xPos < this.xPos + RESIZE_BOX_SIZE) {
            if (yPos > this.yPos + this.height - RESIZE_BOX_SIZE && yPos < this.yPos + this.height + RESIZE_BOX_SIZE) {
                this.resizeDragging = true;
                this.resizeDragDirection = "sw";
                this.resizeDragX = xPos;
                this.resizeDragY = yPos;
                this.fullscreen = false;
                return true;
            }
        }

        // Top right check 
        if (xPos > this.xPos + this.width - RESIZE_BOX_SIZE && xPos < this.xPos + this.width + RESIZE_BOX_SIZE) {
            if (yPos > this.yPos - RESIZE_BOX_SIZE && yPos < this.yPos + RESIZE_BOX_SIZE) {
                this.resizeDragging = true;
                this.resizeDragDirection = "ne";
                this.resizeDragX = xPos;
                this.resizeDragY = yPos;
                this.fullscreen = false;
                return true;
            }
        }

        // Bottom right check 
        if (xPos > this.xPos + this.width - RESIZE_BOX_SIZE && xPos < this.xPos + this.width + RESIZE_BOX_SIZE) {
            if (yPos > this.yPos + this.height - RESIZE_BOX_SIZE && yPos < this.yPos + this.height + RESIZE_BOX_SIZE) {
                this.resizeDragging = true;
                this.resizeDragDirection = "se";
                this.resizeDragX = xPos;
                this.resizeDragY = yPos;
                this.fullscreen = false;
                return true;
            }
        }

        this.resizeDragging = false;
        this.resizeDragDirection = "none";
        this.resizeDragX = 0;
        this.resizeDragY = 0;
        return false;
    }

    setResizeDragPos(xPos, yPos) {
        switch (this.resizeDragDirection) {
            case "nw":
                if (this.width + this.resizeDragX - xPos >= this.minWidth) {
                    this.xPos = xPos;
                    this.width += this.resizeDragX - xPos;
                    this.resizeDragX = xPos;
                }
                if (this.height + this.resizeDragY - yPos >= this.minHeight) {
                    this.yPos = yPos;
                    this.height += this.resizeDragY - yPos;
                    this.resizeDragY = yPos;
                }
                break;
            case "sw":
                if (this.width + this.resizeDragX - xPos >= this.minWidth) {
                    this.xPos = xPos;
                    this.width += this.resizeDragX - xPos;
                    this.resizeDragX = xPos;
                }
                if (this.height + yPos - this.resizeDragY >= this.minHeight) {
                    this.height += yPos - this.resizeDragY;
                    this.resizeDragY = yPos;
                }
                break;
            case "ne":
                if (this.width + xPos - this.resizeDragX >= this.minWidth) {
                    this.width += xPos - this.resizeDragX;
                    this.resizeDragX = xPos;
                }
                if (this.height + this.resizeDragY - yPos >= this.minHeight) {
                    this.yPos = yPos;
                    this.height += this.resizeDragY - yPos;
                    this.resizeDragY = yPos;
                }
                break;
            case "se":
                if (this.width + xPos - this.resizeDragX >= this.minWidth) {
                    this.width += xPos - this.resizeDragX;
                    this.resizeDragX = xPos;
                }
                if (this.height + yPos - this.resizeDragY >= this.minHeight) {
                    this.height += yPos - this.resizeDragY;
                    this.resizeDragY = yPos;
                }
                break;
        }
    }

    checkDrag(xPos, yPos) {
        if (!this.moveable || this.minimized) {
            return;
        }
        if (xPos > this.xPos + 6 && xPos < this.xPos + this.width - 6) {
            if (yPos > this.yPos && yPos < this.yPos + 34) {
                this.dragging = true;
                this.dragX = xPos - this.xPos;
                this.dragY = yPos - this.yPos;
                return true;
            }
        }
    }

    setDragPos(xPos, yPos) {
        this.xPos = xPos - this.dragX;
        this.yPos = yPos - this.dragY;
    }

    checkClose(xPos, yPos) {
        if (xPos > this.xPos + this.width - 30 && xPos < this.xPos + this.width - 6) {
            if (yPos > this.yPos + 6 && yPos < this.yPos + 30) {
                openWindows.splice(openWindows.indexOf(this), 1);
                this.removeTaskbarTab();
                return true;
            }
        }
        return false;
    }

    checkFullsize(xPos, yPos) {
        if (!this.resizable) {
            return false;
        }
        if (xPos > this.xPos + this.width - 55 && xPos < this.xPos + this.width - 31) {
            if (yPos > this.yPos + 6 && yPos < this.yPos + 30) {
                if (!this.fullscreen) {
                    this.xPos = 0;
                    this.yPos = 0;
                    this.width = window.innerWidth;
                    this.height = window.innerHeight - 50;
                    this.fullscreen = true;
                    return true;
                } else {
                    this.xPos = 100;
                    this.yPos = 100;
                    this.width = 640;
                    this.height = 480;
                    this.fullscreen = false;
                    return true;
                }
            }
        }
        return false;
    }

    checkMinimize(xPos, yPos) {
        let minimizeOffset = 57;
        if (this.resizable) {
            minimizeOffset = 82;
        }
        if (xPos > this.xPos + this.width - minimizeOffset && xPos < this.xPos + this.width - minimizeOffset + 24) {
            if (yPos > this.yPos + 6 && yPos < this.yPos + 30) {
                if (!this.minimized) {
                    this.minimized = true;
                    return true;
                }
            }
        }
        return false;
    }

    generateTaskbarTab() {
        /* Structure for HTML:

        <div class="taskbarWindowsList">
            <div class="openWindowContainer">
                <div class="openWindow" id="openWindow0">
                    <div class="buttonIcon">
                        <img src="images/start.png"></img>
                    </div>
                    <div class="openWindowText">
                        Notepad
                    </div>
                </div>
            </div>
        </div>
        */

        const openWindowList = document.getElementById("taskbarWindowsList");

        // openWindowContainer
        const openWindowContainer = document.createElement("div");
        openWindowContainer.classList.add("openWindowContainer");
        openWindowList.appendChild(openWindowContainer);

        // openWindow
        const openWindow = document.createElement("div");
        openWindow.classList.add("openWindow");
        openWindow.id = "openWindow" + this.windowIndex;
        openWindow.onclick = taskbarClicked;
        openWindowContainer.appendChild(openWindow);
        taskbarWindowsMap.set(openWindow.id, this);

        // buttonIcon
        const buttonIcon = document.createElement("div");
        buttonIcon.classList.add("windowButtonIcon");
        openWindow.appendChild(buttonIcon);

        // img
        const image = document.createElement("img");
        image.src = this.taskbarIcon;
        buttonIcon.appendChild(image);

        // openWindowText
        const openWindowText = document.createElement("div");
        openWindowText.classList.add("openWindowText");
        openWindowText.innerHTML = this.name;
        openWindow.appendChild(openWindowText);

        return openWindowContainer;
    }

    removeTaskbarTab() {
        this.taskbarElement.innerHTML = '';
        this.taskbarElement.remove();
    }

    tick() {

    }
}