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
    constructor() {
        this.matrix = [];
        this.maxX = null;
        this.maxY = null;
    }
    get(x, y) {
        if (this.matrix[x] === undefined) this.matrix[x] = [];
        if (this.matrix[x] === null) this.matrix[x] = [];
        if (this.matrix[x][y] === undefined) this.matrix[x][y] = null;
        if (this.maxX === null) this.maxX = x;
        if (this.maxY === null) this.maxY = y;
        if (x > this.maxX) this.maxX = x;
        if (y > this.maxY) this.maxY = y;
        return this.matrix[x][y];
    }
    set(x, y, value) {
        this.get(x, y); //used to ensure slot is alotted.
        this.matrix[x][y] = value;
    }
    isOutOfBounds(x, y) {
        if (this.maxX === null) return true;
        if (this.maxY === null) return true;
        if (x < 0) return true;
        if (y < 0) return true;
        if (x > this.maxX) return true;
        if (y > this.maxY) return true;
        return false;
    }
    unitTest(ut) {
        let m = new Matrix2d();
        ut.test('T-Matrix2d1', m.get(0, 0) === null);
        m.set(0, 0, 2);
        ut.test('T-Matrix2d2', m.get(0, 0) === 2);
        m.set(10, 100, 3);
        ut.test('T-Matrix2d3', m.get(10, 100) === 3);
        ut.test('T-Matrix2d4', m.get(4, 4) === null);
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