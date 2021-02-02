// const {
//     timeStamp
// } = require("console");

class Tmath {
    constructor() {

    }

    //Greatest common divisor.
    static gcd(a, b) {
        return !b ? a : Tmath.gcd(b, a % b);
    }

    // Least common multiple.
    static lcm(a, b) {
        return a * (b / Tmath.gcd(a, b));
    }

}

class Matrix2d {
    constructor(offset = 0, unsetValue = null) {
        //offset is the distance the x and y coordinates will be shifted
        //to allow JavaScript arrays to accommodate negative coordinates.
        this.matrix = new Array(1000);
        this.minX = null;
        this.minY = null;
        this.maxX = null;
        this.maxY = null;
        this.offset = offset;
        this.unsetValue = unsetValue;
    }
    get(x, y) {
        // log("Matrix2d.get called with " + x + "," + y);
        if (this.isOutOfBounds(x, y)) return this.unsetValue;

        x += this.offset;
        y += this.offset;
        if (this.matrix[x] === undefined) return this.unsetValue;
        if (this.matrix[x] === null) return this.unsetValue;
        if (this.matrix[x][y] === undefined) return this.unsetValue;

        let r = this.matrix[x][y];
        // log("Matrix2d.get returning " + r);
        return r;
    }
    set(x, y, value) {
        // log("Matrix2d.set called with " + x + "," + y + " " + value);

        // this.get(x, y); //used to ensure slot is alotted.
        //Update min/max.  Note min/max are external values.
        if (this.minX === null) this.minX = x;
        if (this.minY === null) this.minY = y;
        if (this.maxX === null) this.maxX = x;
        if (this.maxY === null) this.maxY = y;
        if (x < this.minX) this.minX = x;
        if (y < this.minY) this.minY = y;
        if (x > this.maxX) this.maxX = x;
        if (y > this.maxY) this.maxY = y;

        //Convert to internal array coords.
        x += this.offset;
        y += this.offset;
        if (this.matrix[x] === undefined) this.matrix[x] = new Array(1000);
        if (this.matrix[x] === null) this.matrix[x] = new Array(1000);
        // if (this.matrix[x][y] === undefined) this.matrix[x][y] = null;
        this.matrix[x][y] = value;
    }
    isOutOfBounds(x, y) {
        if (this.minX === null) return true;
        if (this.minY === null) return true;
        if (this.maxX === null) return true;
        if (this.maxY === null) return true;

        // x += this.offset;
        // y += this.offset;
        if (x < this.minX) return true;
        if (y < this.minY) return true;
        if (x > this.maxX) return true;
        if (y > this.maxY) return true;
        return false;
    }
    forEachXY(f, expandedBorder = 0) {
        if (this.minX === null) return;
        if (this.minY === null) return;
        if (this.maxX === null) return;
        if (this.maxY === null) return;
        // let c = 0;
        // log("forEachXY:" + this.minX + "," + this.minY + " to " + this.maxX + "," + this.maxY);
        for (let x = this.minX - expandedBorder; x <= this.maxX + expandedBorder; x++) {
            for (let y = this.minY - expandedBorder; y <= this.maxY + expandedBorder; y++) {
                // c++;
                // log("forEachXY:" + c + ":" + x + "," + y + " to " + this.maxX + "," + this.maxY);
                // if (c >= 100) return;
                f(x, y, this);
            }
        }
    }
    unitTest(ut) {
        let m = new Matrix2d(10);
        ut.test('T-Matrix2d1', m.get(0, 0) === null);
        m.set(0, 0, 2);
        ut.test('T-Matrix2d2', m.get(0, 0) === 2);
        m.set(10, 100, 3);
        ut.test('T-Matrix2d3', m.get(10, 100) === 3);
        ut.test('T-Matrix2d4', m.get(4, 4) === null);
    }
}

//Matrix backed by a Map, so the space is unbounded.
//Coordinates are communicated thru arrays thus:
//[x,y,z,t...] aka [dim1,dim2,dim3,...dimN].
//Note that the 0th element is dimension 1.
class MatrixNdMap {
    constructor(dimensions = 2, unsetValue = null) {
        this.map = new Map();
        this.dimensions = dimensions;
        this.mins = new Array(dimensions);
        this.mins.fill(null);
        this.maxs = new Array(dimensions);
        this.maxs.fill(null);
        this.unsetValue = unsetValue;
    }
    coordToKey(coord) {
        let k = "" + coord[0];
        for (let i = 1; i < this.dimensions; i++) {
            k += "," + coord[i];
        }
        return k;
    }
    keyToCoord(key) {
        let c = stringToStringArrayNewline(key);
        return c;
    }
    /**Takes two coordinates.  Returns -1 if c1<c2, 0 if c1=c2, and 1 if c1>c2. */
    compareCoords(c1, c2) {
        for (let d = 0; d < c1.length; d++) {
            if (c1[d] > c2[d]) return 1;
            if (c1[d] < c2[d]) return -1;
        }
        return 0;
    }
    incrementCoord(coord, minCoord, maxCoord) {
        let carry = 1;
        let d = coord.length - 1;
        while ((carry > 0) && (d >= 0)) {
            if (coord[d] === maxCoord[d]) {
                coord[d] = minCoord[d];
                d--;
            } else {
                coord[d] += carry;
                carry = 0;
            }
        }
        return coord;
    }
    get(coord) {
        let v = this.map.get(this.coordToKey(coord));
        return (v === undefined) ? this.unsetValue : v;
    }
    set(coord, val) {
        this.map.set(this.coordToKey(coord), value);
        this.forEachDimension((d) => {
            let r = coord[d - 1];
            this.maxs[d - 1] = Math.max(this.maxs[d - 1], r);
            this.mins[d - 1] = Math.min(this.mins[d - 1], r);
        });
    }
    forEachDimension(f) {
        for (let d = 1; d <= this.dimensions; d++) {
            f(d);
        }
    }
    forEachCoordInGivenRange(min, max, f) {
        for (let c = new Array(...min); this.compareCoords(c, max) < 0; this.incrementCoord(c)) {
            f(c);
        }
    }
    forEachCoordInCurrentRange(f, expandBoundaryBy = 0) {
        let minCoord = this.mins.map(r => r - expandBoundaryBy);
        let maxCoord = this.maxs.map(r => r + expandBoundaryBy);
        forEachCoordInGivenRange(minCoord, maxCoord, f);
    }
    forEachAdjacent(coord, f) {
        let minCoord = coord.map(r => r - 1);
        let maxCoord = coord.map(r => r + 1);
        forEachCoordInGivenRange(minCoord, maxCoord, (c) => {
            if (this.compareCoords(c, coord) !== 0) f(c);
        });
    }
    minRange(dimNumber) {
        return this.mins[dimNumber];
    }
    maxRange(dimNumber) {
        return this.maxs[dimNumber];
    }
    totalSetTo(c) {
        let n = 0;
        this.matrix.forEach((value, key, map) => {
            if (value === c) n++;
        });
        return n;
    }
    unitTest(ut) {
        let m = new MatrixNdMap();
        let c1 = [0, 0, 8, 0];
        let cmin = [0, 0, 0, 0];
        let cmax = [9, 9, 9, 9];
        ut.test('T-MatrixNdMap.IncC.1', m.coordToKey(m.incrementCoord(c1, cmin, cmax)) === "0,0,8,1");

        let k = "1,-2";
        ut.test('T-MatrixNdMap.1', m.coordToKey(m.keyToCoord(k)) == k);
        ut.test('T-MatrixNdMap.2a', m.get([0, 0]) === null);
        ut.test('T-MatrixNdMap.2b', m.minRange(1) === null);
        ut.test('T-MatrixNdMap.2c', m.minRange(2) === null);
        ut.test('T-MatrixNdMap.2d', m.maxRange(1) === null);
        ut.test('T-MatrixNdMap.2e', m.maxRange(2) === null);
        m.set([0, 0], 1);
        ut.test('T-MatrixNdMap.3a', m.get([0, 0]) === 1);
        ut.test('T-MatrixNdMap.3b', m.minRange(1) === 0);
        ut.test('T-MatrixNdMap.3c', m.minRange(2) === 0);
        ut.test('T-MatrixNdMap.3d', m.maxRange(1) === 0);
        ut.test('T-MatrixNdMap.3e', m.maxRange(2) === 0);
    }
}

class Matrix3d {
    constructor(offset = 0, unsetValue = null) {
        //offset is the distance the x and y coordinates will be shifted
        //to allow JavaScript arrays to accommodate negative coordinates.
        this.matrix = new Array(1000);
        this.minX = null;
        this.minY = null;
        this.minZ = null;
        this.maxX = null;
        this.maxY = null;
        this.maxZ = null;
        this.offset = offset;
        this.unsetValue = unsetValue;
    }
    get(x, y, z) {
        // log("Matrix2d.get called with " + x + "," + y);
        if (this.isOutOfBounds(x, y, z)) return this.unsetValue;

        x += this.offset;
        y += this.offset;
        z += this.offset;
        if (this.matrix[x] === undefined) return this.unsetValue;
        if (this.matrix[x] === null) return this.unsetValue;
        if (this.matrix[x][y] === undefined) return this.unsetValue;
        if (this.matrix[x][y] === null) return this.unsetValue;
        if (this.matrix[x][y][z] === undefined) return this.unsetValue;
        if (this.matrix[x][y][z] === null) return this.unsetValue;

        let r = this.matrix[x][y][z];
        // log("Matrix2d.get returning " + r);
        return r;
    }
    set(x, y, z, value) {
        // log("Matrix2d.set called with " + x + "," + y + " " + value);

        // this.get(x, y); //used to ensure slot is alotted.
        //Update min/max.  Note min/max are external values.
        if (this.minX === null) this.minX = x;
        if (this.minY === null) this.minY = y;
        if (this.minZ === null) this.minZ = z;
        if (this.maxX === null) this.maxX = x;
        if (this.maxY === null) this.maxY = y;
        if (this.maxZ === null) this.maxZ = z;
        if (x < this.minX) this.minX = x;
        if (y < this.minY) this.minY = y;
        if (z < this.minZ) this.minZ = z;
        if (x > this.maxX) this.maxX = x;
        if (y > this.maxY) this.maxY = y;
        if (z > this.maxZ) this.maxZ = z;

        //Convert to internal array coords.
        x += this.offset;
        y += this.offset;
        z += this.offset;
        if (this.matrix[x] === undefined) this.matrix[x] = new Array(1000);
        if (this.matrix[x] === null) this.matrix[x] = new Array(1000);
        if (this.matrix[x][y] === undefined) this.matrix[x][y] = new Array(1000);
        if (this.matrix[x][y] === null) this.matrix[x][y] = new Array(1000);
        this.matrix[x][y][z] = value;
    }
    checkAnyNull() {
        if (this.minX === null) return true;
        if (this.minY === null) return true;
        if (this.minZ === null) return true;
        if (this.maxX === null) return true;
        if (this.maxY === null) return true;
        if (this.maxZ === null) return true;
    }
    isOutOfBounds(x, y, z) {
        if (this.checkAnyNull()) return true;

        if (x < this.minX) return true;
        if (y < this.minY) return true;
        if (z < this.minZ) return true;
        if (x > this.maxX) return true;
        if (y > this.maxY) return true;
        if (z > this.maxZ) return true;
        return false;
    }
    forEachXYZ(f, expandedBorder = 0) {
        if (this.checkAnyNull()) return;

        // let c = 0;
        // log("forEachXY:" + this.minX + "," + this.minY + " to " + this.maxX + "," + this.maxY);
        for (let x = this.minX - expandedBorder; x <= this.maxX + expandedBorder; x++) {
            for (let y = this.minY - expandedBorder; y <= this.maxY + expandedBorder; y++) {
                for (let z = this.minZ - expandedBorder; z <= this.maxZ + expandedBorder; z++) {
                    // c++;
                    // log("forEachXY:" + c + ":" + x + "," + y + " to " + this.maxX + "," + this.maxY);
                    // if (c >= 100) return;
                    f(x, y, z, this);
                }
            }
        }
    }
    unitTest(ut) {
        let m = new Matrix3d(10);
        ut.test('T-Matrix3d1', m.get(0, 0, 0) === null);
        m.set(0, 0, 0, 2);
        ut.test('T-Matrix3d2', m.get(0, 0, 0) === 2);
        m.set(10, 100, 0, 3);
        ut.test('T-Matrix3d3', m.get(10, 100, 0) === 3);
        ut.test('T-Matrix3d4', m.get(4, 4, 0) === null);
    }
}

class Digraph {
    constructor() {
        this.nodeNames = [];
        this.edgesTo = [];
    }
    getNodeId(name) {
        return this.nodeNames.indexOf(name);
    }
    addNode(name) {
        let ni = this.getNodeId(name);
        if (ni < 0) {
            ni = this.nodeNames.length;
            this.nodeNames[ni] = name;
            this.edgesTo[ni] = new Array(ni).fill(0);
            for (let i = 0; i < this.nodeNames.length; i++) {
                this.edgesTo[i][ni] = 0;
                // log('addnode edgeto set to zero for i=' + i + ' ni=' + ni);
            }
        }
        return ni;
    }
    addEdgeTo(fromNodeName, toNodeName, weight = 1) {
        let f = this.addNode(fromNodeName);
        let t = this.addNode(toNodeName);
        // if (this.edgesTo[f][t] === undefined) {
        //     this.edgesTo[f][t] = 0;
        // }
        this.edgesTo[f][t] = weight;
        this.numPathsMem = new Matrix2d();
    }
    isEdge(fromNodeId, toNodeId) {
        // if (this.edgesTo[fromNodeId][toNodeId] === undefined) return false;
        return this.edgesTo[fromNodeId][toNodeId] > 0;
    }
    isPath(fromNodeId, toNodeId) {
        if (this.isEdge(fromNodeId, toNodeId)) return true;
        else {
            for (let i = 0; i < this.edgesTo[fromNodeId].length; i++) {
                if (this.isEdge(fromNodeId, i)) {
                    if (this.isPath(i, toNodeId)) return true;
                }
            }
        }
        return false;
    }
    numPathsMem = new Matrix2d(); //used for memoization.
    numPaths(fromNodeId, toNodeId) {
        // if (fromNodeId === toNodeId) return 1;
        let paths = this.numPathsMem.get(fromNodeId, toNodeId);
        if (paths !== null) return paths;
        paths = 0;
        if (this.isEdge(fromNodeId, toNodeId)) paths++;
        // log("paths=" + paths);
        //Add up number of paths from children.
        for (let i = 0; i < this.edgesTo[fromNodeId].length; i++) {
            if (this.isEdge(fromNodeId, i)) {
                paths += this.numPaths(i, toNodeId);
            }
        }
        this.numPathsMem.set(fromNodeId, toNodeId, paths);
        return paths;
    }

    numberOfPaths(fromNodeName, toNodeName) {
        // log("fromNodeName=" + fromNodeName);
        let fid = this.getNodeId(fromNodeName);
        // log("fid=" + fid);
        if (fid == -1) return 0;

        // log("toNodeName=" + toNodeName);
        let tid = this.getNodeId(toNodeName);
        // log("tid=" + tid);
        if (tid == -1) return 0;

        return this.numPaths(fid, tid);
    }

    edgeWeightSum(nodeId) {
        let sum = 0;
        for (let i = 0; i < this.nodeNames.length; i++) {
            sum += this.edgesTo[nodeId][i];
        }
        return sum;
    }
    edgeWeightSumRecursive(nodeId) {
        let sum = 0;
        for (let i = 0; i < this.nodeNames.length; i++) {
            let w = this.edgesTo[nodeId][i];
            if (w > 0) {
                sum += w;
                sum += w * this.edgeWeightSumRecursive(i);
            }
        }
        return sum;
    }
    toString() {
        let s = '<pre><code>START DIGRAPH\n';
        // log('START DIGRAPH');
        for (let i = 0; i < this.nodeNames.length; i++) {
            s += (this.nodeNames[i] + '(' + i + ')\n');
            for (let t = 0; t < this.edgesTo[i].length; t++) {
                if (this.edgesTo[i][t] === undefined) s += ('-> UNDEFINED!' + t + "\n");
                if (this.edgesTo[i][t] === null) s += ('-> NULL!' + t + "\n");
                if (this.edgesTo[i][t] > 0) s += ('->' + this.edgesTo[i][t] + ':' + this.nodeNames[t] + '(' + t + ')' + "\n");
            }
        }
        return s + '</code><pre>';
    }
    unitTest(ut) {
        let dg = new Digraph();
        dg.addEdgeTo('a', 'b');
        ut.test('T-Digraph1a', dg.isEdge(0, 1));
        ut.test('T-Digraph1b1', !dg.isEdge(0, 0));
        ut.test('T-Digraph1b2', !dg.isPath(0, 0));
        ut.test('T-Digraph1c', dg.isPath(0, 1));
        ut.test('T-Digraph2a', dg.numPaths(0, 0) === 0);
        ut.test('T-Digraph2b', dg.numPaths(0, 1) === 1);
        ut.test('T-Digraph3', dg.numberOfPaths('a', 'b') === 1);
        dg.addEdgeTo('a', 'c');
        dg.addEdgeTo('c', 'd');
        ut.test('T-Digraph4a', dg.numberOfPaths('a', 'd') === 1);
        dg.addEdgeTo('b', 'd');
        ut.test('T-Digraph4b', dg.numberOfPaths('a', 'd') === 2);
        dg.addEdgeTo('a', 'd');
        ut.test('T-Digraph4c', dg.numberOfPaths('a', 'd') === 3);
        dg.addEdgeTo('b', 'c');
        ut.test('T-Digraph4d', dg.numberOfPaths('a', 'd') === 4);
        //Currently Digraph cannot handle cycles, 
        //so following would result in infinite recursion.
        // dg.addEdgeTo('c', 'b');
        // ut.test('T-Digraph4e', dg.numberOfPaths('a', 'd') === 5);
    }
}