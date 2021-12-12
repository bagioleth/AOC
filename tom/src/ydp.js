//Class to hold and parse AOC problem identifiers consising of "year, day, part".
class Ydp {
    constructor(y, d, p) {
        this.y = y;
        this.d = d;
        this.p = p;
    }
    tos() {
        return `y${this.y}d${this.d}p${this.p}`;
    }
    frs(s) {
        this.y = s.substring(s.indexOf("y") + 1, s.indexOf("d"));
        this.d = s.substring(s.indexOf("d") + 1, s.indexOf("p"));
        this.p = s.substring(s.indexOf("p") + 1);
    }
    static forAllParts(f) {
        for (let y = 2020; y <= 2021; y++) {
            for (let d = 1; d <= 25; d++) {
                for (let p = 1; p <= 2; p++) {
                    f(new Ydp(y, d, p));
                }
            }
        }
    }
    static unitTest(ut) {
        let x = new Ydp(2020, 11, 1);
        ut.test('T-Ydp1.1', x.y === 2020);
        ut.test('T-Ydp1.2', x.d === 11);
        ut.test('T-Ydp1.3', x.p === 1);
        ut.test('T-Ydp2.1', x.tos() === "y2020d11p1");
        x.frs("y2021d22p2");
        ut.test('T-Ydp3.1', x.y === 2021);
        ut.test('T-Ydp3.2', x.d === 22);
        ut.test('T-Ydp3.3', x.p === 2);
        ut.test('T-Ydp4.1', x.tos() === "y2021d22p2");
        let c = 0;
        forAllParts(() => {
            c++;
        });
        ut.test('T-Ydp5.1', c === 2 * 25 * 2);

    }
}
//Wish I knew a cleaner way of making this file work as both a node.js require module
//and a poor man's import so the following lines would not become part of the target
//html file.
exports.tos = Ydp.tos;
exports.frs = Ydp.frs;
exports.forAllParts = Ydp.forAllParts;