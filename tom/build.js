/*
This is the Node.js command-line JavaScript file that builds the all-in-one HTML
file from the files in the src and aoc folders.

To run this file, install Node.js and execute the following from an OS command line:

node build.js

The completed, standalone output file will be in the bld folder.
*/
console.log("BUILD SYSTEM STARTED");

const fs = require('fs');

//const INBUILDSYSTEM = true;
const YDP = require('./src/ydp.js');
// //Class to hold and parse AOC problem identifiers consising of "year, day, part".
// class Ydp {
//     constructor(y, d, p) {
//         this.y = y;
//         this.d = d;
//         this.p = p;
//     }
//     tos() {
//         return `y${y}d${d}p${p}`;
//     }
//     frs(s) {
//         this.y = s.substring(s.indexOf("y") + 1, s.indexOf("d"));
//         this.d = s.substring(s.indexOf("d") + 1, s.indexOf("p"));
//         this.p = s.substring(s.indexOf("p") + 1);
//     }
//     static forAllParts(f) {
//         for (let y = 2020; y <= 2021; y++) {
//             for (let d = 1; d <= 25; d++) {
//                 for (let p = 1; p <= 2; p++) {
//                     f(y, d, p);
//                 }
//             }
//         }
//     }
//     static unitTest(ut) {
//         let x = new Ydp(2020, 11, 1);
//         ut.test('T-Ydp1.1', x.y === 2020);
//         ut.test('T-Ydp1.2', x.d === 11);
//         ut.test('T-Ydp1.3', x.p === 1);
//         ut.test('T-Ydp2.1', x.tos() === "y2020d11p1");
//         x.frs("y2021d22p2");
//         ut.test('T-Ydp3.1', x.y === 2021);
//         ut.test('T-Ydp3.2', x.d === 22);
//         ut.test('T-Ydp3.3', x.p === 2);
//         ut.test('T-Ydp4.1', x.tos() === "y2021d22p2");
//         let c = 0;
//         forAllParts(() => {
//             c++;
//         });
//         ut.test('T-Ydp5.1', c === 2 * 25 * 2);

//     }
// }
const constructed_output = {
    filename: 'bld/TSAOC.html',
    text: ''
};

makeTop(constructed_output);
makeHead(constructed_output);
makeBody(constructed_output);


fs.writeFile(constructed_output.filename, constructed_output.text, err => {
    if (err) {
        console.error(err);
        return;
    }
});

function makeTop(co) {
    let license = readFile('./src/LICENSE.txt');
    co.text += `<!DOCTYPE html>
    <!--
    ${license}
    -->
    <html>`;
}

function makeHead(co) {
    let css = readFile('./src/style.css');
    co.text += `
    <head>
    <title>Advent of Code -- Tom's Solutions</title>
    <style>
        ${css}
    </style>
    </head>`;
}

function makeBody(co) {

    co.text += `<body>
    <header>Tom's Solutions for the Advent of Code</header>
    <nav id="nav-button-tabs"></nav>
    <footer>
        (c) 2020, 2021 T. Angioletti, except for problem descriptions and input data, which are copied from the Advent of Code website.
    </footer>`;

    let about = readFile('./src/About.html');
    co.text += `
    <article id="a_About">
    ${about}
    </article>`;

    co.text += `
    <article id="a_Debug">
    <button onclick="dbclear()">Clear</button>
    <button onclick="dbtest()">Test</button>
    <hr />
    DEBUG AREA
    <div id="dblog"></div>
    </article>`;

    YDP.forAllParts((ydp) => {
        let s = ydp.tos();
        makeArticle(co, `${s}`);
    });

    makeScript(co);
    co.text += `</body></html>`;
}

function makeScript(co) {
    co.text += `
    <script>
    "use strict";
    // @ts-check`;

    //Add AOC input data.
    co.text += "\nconst AOC_Input_Data={";
    YDP.forAllParts((ydp) => {
        let s = ydp.tos();
        let data = readFile(`aoc/${s}.dat`);
        if (!data) data = "";
        co.text += `${s}:`;
        co.text += "`" + data + "`,";
    });
    co.text += "};";

    //This "exports" line is a kludge to allow yds.js to be both an include and a node.js require module.
    co.text += "\nconst exports={};";
    let y = readFile(`src/ydp.js`);
    co.text += "\n" + `${y}`;
    let classes = readFile(`src/classes.js`);
    co.text += "\n" + `${classes}`;
    let tool = readFile(`src/tool.js`);
    co.text += "\n" + `${tool}`;
    let problems = readFile(`src/problems.js`);
    co.text += "\n" + `${problems}`;
    //Import solution files if they exist.
    YDP.forAllParts((ydp) => {
        let s = ydp.tos();
        let sol = readFile(`solution/${s}.js`);
        if (!sol) sol = "";
        co.text += "\n" + sol + "\n";
    });
    co.text += "</script>";
}


function makeArticle(co, base_id) {
    let article = readFile(`./aoc/${base_id}.html`);
    // console.log("base_id=" + base_id + " article=" + article);
    if (!article) return;
    co.text += `
    <article id="a_${base_id}">
    -----PROBLEM STATEMENT-----<br />
    <div class="problem_description">${article}</div>
    <hr />
    <div>
        <div class="processing_buttons"></div>
        <div class="io"></div>
    </div>
    </article>`;
}


function readFile(f) {
    let data = '';
    try {
        data = fs.readFileSync(f, 'utf8');
        //console.log(data);
    } catch (err) {
        //console.error(err);
    }
    return data;
}


console.log("BUILD SYSTEM ENDED");