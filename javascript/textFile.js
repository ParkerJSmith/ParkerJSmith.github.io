class TextFile {
    constructor(textContent, fileName) {
        this.textContent = textContent;
        this.fileName = fileName;
    }
}

var textFiles = [];

textFiles.push(new TextFile("1. The morning sun always gonna shine again\n\
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
12. Second chances", "things_i_believe_in.txt"));