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

export { Point, Line, Model };