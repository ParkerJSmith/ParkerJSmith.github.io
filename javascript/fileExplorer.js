class FileExplorer {
    constructor(width, height, name) {
        this.parent = new DesktopWindow(width, height, name, this);
        this.fileList = [];
        this.fileList.push(new FileItem("secret_government_docs", "folder"));
        this.fileList.push(new FileItem("mikell_jaxon_thriller(NO VIRUS).exe", "executable"));
        this.fileList.push(new FileItem("fermats_last_theorem_proof.txt", "file"));
    }

    render() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.parent.xPos + 10, this.parent.yPos + 42, this.parent.width - 18, this.parent.height - 48);

        for (let i = 0; i < this.fileList.length; i++) {
            switch (this.fileList[i].type) {
                case "folder":
                    ctx.drawImage(document.getElementById("folderImage"), this.parent.xPos + 20, this.parent.yPos + 50 + (i * 50));
                    break;
                case "file":
                    ctx.drawImage(document.getElementById("fileImage"), this.parent.xPos + 20, this.parent.yPos + 50 + (i * 50));
                    break;
                case "executable":
                    ctx.drawImage(document.getElementById("programImage"), this.parent.xPos + 20, this.parent.yPos + 50 + (i * 50));
                    break;
            }
            ctx.fillStyle = "black";
            ctx.fillText(this.fileList[i].name, this.parent.xPos + 65, this.parent.yPos + 78 + (i * 50));
        }
    }

    checkInteraction(xPos, yPos) {

    }

    checkInteractionRight(xPos, yPos) {

    }

    checkHoverInteraction(xPos, yPos) {

    }
}

class FileItem {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}