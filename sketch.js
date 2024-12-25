/*
Specifications: This is the main file for a drawing application that allows the user to draw on the canvas using the mouse. The user, upon a mouse down, starts drawing a line on a 2D canvas. Upon mouse up, the following occurs: The list of 2D points making up the line is stored and compared against the list of all other points that already exist in the canvas. If any point in the line crosses another point (i.e., they share the same x and y coordinates), the line WILL be drawn--and not otherwise. 

To draw the line, the line is first mapped into the 3D model. The camera is a floating square in the 3D space--what is shown on the screen is what the camera sees (i.e. by mapping all the 3D points to the square camera screen). The camera is controlled by the user using the arrow keys. The user can move the camera up, down, left, and right. The user can also rotate left and right. 

The 3D model is mapped into 2D (to the camera) using an isomorphic projection (not perspective). The 3D model is a collection of points. 

Every point has a unique ID that is given to it when it is created. This helps identify the point regardless of whether it is projected into 2D or in its original 3D form. 

When a line is being drawn in 2D, it is placed by inversely mapping the 2D points making up the line to the 3D model. The line is placed the same distance away from the camera as the camera is from the first point that the line overlaps with.
*/





//////////////////////////////////////////////////////////////////////////////////////

class Point {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }
}

class Line {
    constructor(id) {
        this.points = [];
        this.id = id;
    }

    addPoint(point) {
        this.points.push(point);
    }
}


class Model {
    constructor() {
        this.allLines = [];
        this.pointId = 0;
        this.lineId = 0;
    }

    createPoint(x, y) {
        return new Point(x, y, this.pointId++);
    }

    createLine() {
        return new Line(this.lineId++);
    }

    addLine(line) {
        this.allLines.push(line);
    }
}


//////////////////////////////////////////////////////////////////////////////////////




const canvas = document.getElementById('sketch-canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let currentLine = null;


const model = new Model();

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    currentLine = model.createLine();
    const point = model.createPoint(e.offsetX, e.offsetY);
    currentLine.addPoint(point);
    model.addLine(currentLine);
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        const point = model.createPoint(e.offsetX, e.offsetY);
        currentLine.addPoint(point);
        drawAllLines();
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    currentLine = null;
});

function drawAllLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    model.allLines.forEach(line => {
        drawLine(line.points);
    });
    updateTextBlock();
}

function updateTextBlock() {
    const textBlock = document.querySelector('.text-block');
    textBlock.innerHTML = `<p>Number of lines: ${model.allLines.length}</p>`;
    model.allLines.forEach(line => {
        const lineInfo = document.createElement('p');
        lineInfo.textContent = `Line ${line.id}: ${line.points.map(point => `(${point.x}, ${point.y})`).join(', ')}`;
        textBlock.appendChild(lineInfo);
    });
}

function drawLine(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}




