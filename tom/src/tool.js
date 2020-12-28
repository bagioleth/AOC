//#region UTILITY AND UNIT TEST /////////////////////////////////
function gi(id) {
    return document.getElementById(id);
}

function log(t) {
    gi("dblog").innerHTML += "<br/>" + t;
}

function dbclear() {
    gi("dblog").innerHTML = "";
}

function dbtest() {
    let ut = {
        f: 0,
        p: 0,
        fs: "Failed test ids:",
        test: function(name, test) {
            if (test) this.p++;
            else this.fs += (this.f++ > 0 ? ", " : " ") + name;
            // log("this.t=" + this.t + " this.p=" + this.p);
        },
    };

    let a1 = [1, 2, 3, 4];
    let a2 = ["1", "2", "3", "4"];

    ut.test("dbt1", arraysEqual(a1, [1, 2, 3, 4]));
    ut.test("dbt2", arraysEqual(a1, stringToIntArrayNewline("1\n2\n3\n4")));
    ut.test("dbt3", arraysEqual(a1, stringToIntArrayNewline(" 1\n 2\n 3 \n4\n ")));
    ut.test("dbt4", arraysEqual(a1, stringToIntArrayNewline("\n\r1\n\r2\r\n3\n4")));
    ut.test("dbt6", arraysEqual(a1, stringToIntArrayComma("1,2,3,4")));
    ut.test("dbt7", arraysEqual(a1, stringToIntArrayComma(" 1, 2, 3, 4")));
    ut.test("dbt8", arraysEqual(a1, stringToIntArrayComma("1,  2 , 3   ,4   ")));
    ut.test("dbt9", arraysEqual(a2, stringToStringArrayNewline("1\n2\n3\n4")));

    ut.test("ib1", isBetween(2, 1, 3));
    ut.test("ib2", isBetween(1, 1, 3));
    ut.test("ib3", isBetween(2, 1, 3));
    ut.test("ib4", !isBetween(3, 1, 2));
    ut.test("ib5", !isBetween(-1, 1, 2));
    ut.test("ib6", isBetween(7, 1, 12));
    ut.test("ib7", !isBetween(7, 8, 12));
    ut.test("ib8", isBetween(-7, -12, -6));
    ut.test("ib9", isBetween(-7, -12, -7));
    ut.test("ib10", isBetween(-12, -12, -7));
    ut.test("ib11", !isBetween(-13, -12, -6));
    ut.test("ib12", !isBetween(-5, -12, -6));
    ut.test("ib13", isBetween(3, 1, 3));

    let set1 = new Set('abc');
    let set2 = new Set('cde');
    let setU = setUnion(set1, set2);
    let setI = setIntersection(set1, set2);
    ut.test("s", setU.has('a'));
    ut.test("s", setU.has('b'));
    ut.test("s", setU.has('c'));
    ut.test("s", setU.has('d'));
    ut.test("s", setU.has('e'));
    ut.test("s", setU.size == 5);
    ut.test("s", setI.has('c'));
    ut.test("s", setI.size == 1);

    (new Matrix2d()).unitTest(ut);

    //Run unitTest function for all problems.
    Object.getOwnPropertyNames(problems).forEach((prb) =>
        problems[prb].unitTest(ut)
    );

    log(`${ut.p} tests passed.  ${ut.f} tests failed.  ${ut.fs}.`);
}

function isBetween(x, min, max) {
    return x >= min && x <= max;
}

function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function stringToIntArrayNewline(x) {
    let a = x.trim().split(/\r?\n/);
    a.forEach(function(e, i, a) {
        a[i] = parseInt(e.trim());
    });
    return a;
}

function stringToStringArrayNewline(x) {
    let a = x.trim().split(/\r?\n/);
    a.forEach(function(e, i, a) {
        a[i] = e.trim();
    });
    return a;
}

function stringToIntArrayComma(x) {
    let a = x.trim().split(",");
    a.forEach(function(e, i, a) {
        a[i] = parseInt(e.trim());
    });
    return a;
}

function setUnion(a, b) {
    let x = new Set(a);
    for (let e of b) {
        x.add(e);
    }
    return x;
}

function setIntersection(a, b) {
    let x = new Set();
    for (let e of b) {
        if (a.has(e)) {
            x.add(e);
        }
    }
    return x;
}
//#endregion
//#region DISPLAY CONTROL/////////////////////////////////
let currentBaseId = "About";

function readInput() {
    return gi("i_" + currentBaseId).textContent;
}

function writeInput(x) {
    gi("i_" + currentBaseId).innerHTML = x;
}

function writeOutput(x) {
    gi("o_" + currentBaseId).innerHTML = x;
}

function clearCurrentData() {
    writeInput("");
    writeOutput(
        "Load Input data then press Solve button for result appears here."
    );
}

function loadCurrentInputData() {
    clearCurrentData();
    writeInput(problems[currentBaseId].givenInputData);
}

function fetchData3(pageId) {
    log("fetchData3:" + pageId);
    const templink = document.createElement("a");
    const textblob = new Blob([], {
        type: "text/plain"
    });
    const fileurl = window.URL.createObjectURL(textblob);
    templink.href = fileurl;
    templink.download = pageId;
    document.body.appendChild(templink);
    templink.click();
    setTimeout(function() {
        document.body.removeChild(templink);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function fetchData2(pageId) {
    log("fetching2:" + pageId);
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    //req.addEventListener("load", reqListener);
    req.open("GET", pageId, false);
    req.send();
    log("fetching2 responseText=" + req.responseText);
}

function fetchData(pageId) {
    log("fetching:" + pageId);

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/plain');

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'no-cors',
        cache: 'default',
        credentials: 'include'
    };

    var myRequest = new Request(pageId);

    fetch(myRequest, myInit)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
        })
        .then(function(text) {
            log("Fetched text:" + text);
        })
        .catch(function(error) {
            log('Fetch Error: ' + error.message);

        });
}

function fetchCurrentInputData() {
    clearCurrentData();
    let day = currentBaseId.substring(currentBaseId.indexOf("d") + 1, currentBaseId.indexOf("p"));
    log("day=" + day);
    fetchData3(`https://adventofcode.com/2020/day/${day}/input`);
    writeInput("NOT IMPLEMENTED");
}

function solveCurrentProblem() {
    problems[currentBaseId].solve();
}

function showTabDiv(x) {
    let t = gi("tabdiv");
    if (x) {
        t.className = 'dropdown-content dcshow';
    } else {
        t.className = 'dropdown-content dchide';
    }
}

function showArticle(baseId) {
    //Turn off current article and button.
    gi("a_" + currentBaseId).style.display = "none";
    gi("b_" + currentBaseId).className = "tab tabnotsel";

    //Turn on new article and button.
    gi("a_" + baseId).style.display = "block";
    gi("b_" + baseId).className = "tab tabsel";

    currentBaseId = baseId;
    gi("navlabel").innerHTML = baseId;
    showTabDiv(false);
}
//Auto-create the nav button-tabs, one for each "a_*" element.
function makeNavButton(id) {
    return `<button class="tab tabnotsel" id="b_${id}" onclick="showArticle('${id}')">${id}</button>`;
}

function makeProcessingButtons(baseId) {
    let day = baseId.substring(baseId.indexOf("d") + 1, baseId.indexOf("p"));
    // log("mpb: day=" + day);
    let url = `https://adventofcode.com/2020/day/${day}/input`;

    return `<button onclick="clearCurrentData()">Clear Data</button>
<button onclick="loadCurrentInputData()">Load Given Input Data</button>
<button onclick="solveCurrentProblem()">Solve</button>
<a class="aoca" href="${url}">AOC Input Data</a>`;
}

function makeIoArea(id) {
    return `<br />-----INPUT-----<br />
<pre id="i_${id}" class="ita" contenteditable="true">
Put input data here.
</pre>
<br />-----OUTPUT-----<br />
<div id="o_${id}" class="ota">
Results appear here after pressing the Solve button.
</div>`;
}

function findParentArticleBaseId(elem) {
    while (elem != null) {
        if (elem.id && elem.id[0] == "a" && elem.id[1] == "_") {
            return elem.id.substr(2);
        } else {
            elem = elem.parentNode;
        }
    }
    return "xxxx";
}
window.addEventListener("load", function() {
    let s = "<button class='tab' onclick='showTabDiv(true)'>Menu</button><span id='navlabel'>XXX</span><div id='tabdiv' class='dropdown-content dchide'>";
    document
        .querySelectorAll('[id^="a_"]')
        .forEach((a) => (s += makeNavButton(a.id.substr(2))));
    gi("nav-button-tabs").innerHTML = s + '</div></span>';
    document
        .querySelectorAll(".processing_buttons")
        .forEach((div) => (div.innerHTML = makeProcessingButtons(findParentArticleBaseId(div))));
    document
        .querySelectorAll(".io")
        .forEach(
            (div) => (div.innerHTML = makeIoArea(findParentArticleBaseId(div)))
        );
    showArticle("About");
});
//#endregion