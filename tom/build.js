/*
This is the Node.js command-line JavaScript file that builds the all-in-one HTML
file from the files in the src and aoc folders.

To run this file, install Node.js and execute the following from an OS command line:

node build.js

The completed, standalone output file will be in the bld folder.
*/
console.log("BUILD SYSTEM STARTED");

const fs = require('fs');
const constructed_output = {
    filename: 'bld/TSAOC2020.html',
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
})


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
    <title>Advent of Code 2020 -- Tom's Solutions</title>
    <style>
        ${css}
    </style>
    </head>`;
}

function makeBody(co) {

    co.text += `<body>
    <header>Tom's Solutions for the Advent of Code 2020</header>
    <nav id="nav-button-tabs"></nav>
    <footer>
        (c) 2020 T. Angioletti, except for problem descriptions and input data.
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

    for (let i = 1; i <= 25; i++) {
        makeArticle(co, `d${i}p1`);
        makeArticle(co, `d${i}p2`);
    }

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
    for (let i = 1; i <= 25; i++) {
        for (let j = 1; j <= 2; j++) {
            let data = readFile(`aoc/d${i}p${j}.dat`);
            if (!data) data = "";
            co.text += `d${i}p${j}:`;
            co.text += "`" + data + "`,";
        }
    }
    co.text += "};";

    let tool = readFile(`src/tool.js`);
    co.text += "\n" + `${tool}`;
    let problems = readFile(`src/problems.js`);
    co.text += "\n" + `${problems}`;

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