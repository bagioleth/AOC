let problems = {};
//Create a default, empty solution for each problem.
Ydp.forAllParts((ydp) => {
    let sol = new Solution(ydp);
    problems[ydp.tos()] = sol;
});


problems.y2020d1p1 = {
    givenInputData: AOC_Input_Data.y2020d1p1,

    solve: function() {
        let a = stringToIntArrayNewline(readInput());
        writeOutput("The answer is:" + this.docalc(a));
    },
    unitTest: function(ut) {
        const s = " T-y2020d1p1.";
        ut.test(s + "td1", this.docalc([1721, 979, 366, 299, 675, 1456]) == 514579);
    },
    docalc: function(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i; j < arr.length; j++) {
                if (arr[i] + arr[j] == 2020) return arr[i] * arr[j];
            }
        }
        return -1;
    },
};

problems.y2020d1p2 = {
    givenInputData: problems.y2020d1p1.givenInputData,
    solve: function() {
        let u = readInput();
        let a = u.split(/\r?\n/);
        a.forEach(function(e, i, a) {
            a[i] = parseInt(e.trim());
        });
        writeOutput("The answer is:" + this.docalc(a));
    },
    unitTest: function(ut) {
        const s = " T-y2020d1p1.";
        ut.test(s + "td2", this.docalc([1721, 979, 366, 299, 675, 1456]) == 241861950);
    },
    docalc: function(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i; j < arr.length; j++) {
                for (let k = j; k < arr.length; k++) {
                    if (arr[i] + arr[j] + arr[k] == 2020)
                        return arr[i] * arr[j] * +arr[k];
                }
            }
        }
        return -1;
    },
};

problems.y2020d2p1 = {
    givenInputData: AOC_Input_Data.y2020d2p1,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let valid = 0;
        for (let i = 0; i < a.length; i++) {
            if (this.ckpw(a[i])) valid++;
        }
        writeOutput("The answer is:" + valid);
    },
    unitTest: function(ut) {
        const s = " T-y2020d2p1.";
        let x = this.parseRow("3-4 j: tjjj");
        ut.test(s + "1", x.min == 3);
        ut.test(s + "2", x.max == 4);
        ut.test(s + "3", x.char == "j");
        ut.test(s + "4", x.pw == "tjjj");
        ut.test(s + "5", this.countchar("tjjj", "t") == 1);
        ut.test(s + "6", this.countchar("tjjj", "j") == 3);
        ut.test(s + "7", this.countchar("t dd jjddj", "d") == 4);
        ut.test(s + "8", this.ckpw("1-3 a: abcde"));
        ut.test(s + "9", !this.ckpw("1-3 b: cdefg"));
        ut.test(s + "10", this.ckpw("2-9 c: ccccccccc"));
    },
    parseRow: function(r) {
        let x = {};
        let hyphen = r.indexOf("-");
        let colon = r.indexOf(":");
        x.min = parseInt(r);
        x.max = parseInt(r.substr(hyphen + 1).trim());
        x.char = r.substr(colon - 1, 1);
        x.pw = r.substr(colon + 1).trim();
        return x;
    },
    countchar(s, c) {
        let count = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === c) count++;
        }
        return count;
    },
    ckpw(s) {
        let x = this.parseRow(s);
        let cc = this.countchar(x.pw, x.char);
        return cc >= x.min && cc <= x.max;
    },
};

problems.y2020d2p2 = {
    givenInputData: problems.y2020d2p1.givenInputData,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let valid = 0;
        for (let i = 0; i < a.length; i++) {
            if (this.ckpw(a[i])) valid++;
        }
        writeOutput("The answer is:" + valid);
    },
    unitTest: function(ut) {
        const s = " T-y2020d2p2.";

        ut.test(s + "8", this.ckpw("1-3 a: abcde"));
        ut.test(s + "9", !this.ckpw("1-3 b: cdefg"));
        ut.test(s + "10", !this.ckpw("2-9 c: ccccccccc"));
    },
    ckpw(s) {
        let x = problems.y2020d2p1.parseRow(s);
        let count = 0;
        if (x.pw[x.min - 1] == x.char) count++;
        if (x.pw[x.max - 1] == x.char) count++;
        return count == 1;
    },
};

problems.y2020d3p1 = {
    givenInputData: AOC_Input_Data.y2020d3p1,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let hits = 0;
        let x = 0;
        for (let i = 0; i < a.length; i++) {
            if (this.treeHit(a[i], x)) hits++;
            x += 3;
        }

        writeOutput("The answer is: " + hits);
    },
    unitTest: function(ut) {
        const s = " T-y2020d3p1.";

        ut.test(s + "1", this.treeHit("..#...#", 2));
        ut.test(s + "2", this.treeHit("..#...#", 6));
        ut.test(s + "3", this.treeHit("..#...#", 9));
        ut.test(s + "4", !this.treeHit("..#...#", 1));
    },
    treeHit: function(row, x) {
        return "#" == row[x % row.length];
    },
};

problems.y2020d3p2 = {
    givenInputData: problems.y2020d3p1.givenInputData,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let hits = 0;
        let m = 1;
        let x = 0;
        //Right 1, down 1.
        for (let i = 0; i < a.length; i++) {
            if (problems.y2020d3p1.treeHit(a[i], x)) hits++;
            x += 1;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        //Right 3, down 1.
        x = 0;
        hits = 0;
        for (let i = 0; i < a.length; i++) {
            if (problems.y2020d3p1.treeHit(a[i], x)) hits++;
            x += 3;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        //Right 5, down 1.
        x = 0;
        hits = 0;
        for (let i = 0; i < a.length; i++) {
            if (problems.y2020d3p1.treeHit(a[i], x)) hits++;
            x += 5;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        //Right 7, down 1.
        x = 0;
        hits = 0;
        for (let i = 0; i < a.length; i++) {
            if (problems.y2020d3p1.treeHit(a[i], x)) hits++;
            x += 7;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        //Right 1, down 2.
        x = 0;
        hits = 0;
        for (let i = 0; i < a.length; i += 2) {
            if (problems.y2020d3p1.treeHit(a[i], x)) hits++;
            x += 1;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        writeOutput("The answer is: " + m);
    },
    unitTest: function(ut) {
        const s = " T-y2020d3p2.";

    },
};

problems.y2020d4p1 = {
    givenInputData: ``,
    solve: function() {
        let s = readInput();
        let a = this.recsToArray(s);

        writeOutput("The answer is: " + this.totalValid(a));
    },
    unitTest: function(ut) {
        const s = " T-y2020d4p1.";

        let a = this.recsToArray(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`);

        ut.test(s + "1", a[0].ecl == "gry");
        ut.test(s + "2", a[0].hgt == "183cm");

        a = this.recsToArray(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`);

        ut.test(s + "3", a[0].ecl == "gry");
        ut.test(s + "4", a[0].hgt == "183cm");
        ut.test(s + "5", a[1].ecl == "amb");
        ut.test(s + "6", a[2].hcl == "#ae17e1");
        ut.test(s + "7", a[2].ecl == "brn");
        ut.test(s + "8", a[3].hgt == "59in");
        ut.test(s + "9", this.isValid(a[0]));
        ut.test(s + "10", !this.isValid(a[1]));
        ut.test(s + "11", this.isValid(a[2]));
        ut.test(s + "12", !this.isValid(a[3]));
        ut.test(s + "13", this.totalValid(a) == 2);
    },
    totalValid: function(a) {
        let t = 0;
        for (let i = 0; i < a.length; i++) {
            if (this.isValid(a[i])) t++;
        }
        return t;
    },
    isValid: function(r) {
        //FORMAT
        // byr (Birth Year)
        if (!r.hasOwnProperty("byr")) return false;
        // iyr (Issue Year)
        if (!r.hasOwnProperty("iyr")) return false;
        // eyr (Expiration Year)
        if (!r.hasOwnProperty("eyr")) return false;
        // hgt (Height)
        if (!r.hasOwnProperty("hgt")) return false;
        // hcl (Hair Color)
        if (!r.hasOwnProperty("hcl")) return false;
        // ecl (Eye Color)
        if (!r.hasOwnProperty("ecl")) return false;
        // pid (Passport ID)
        if (!r.hasOwnProperty("pid")) return false;
        // cid (Country ID)
        //Don't check.
        return true;
    },
    recsToArray: function(s) {
        // log("pre s=" + s);
        s = s.trim();
        //Replace all blank lines (\n\n) with "},{"
        s = s.replaceAll("\n\n", '"},{"');
        //Replace all doublspaces with one space
        s = s.replaceAll(/ +/g, " ");
        //Delete all blankspaces from the beginning of the lines.
        s = s.replaceAll(/^ +/gm, "");
        //Replace all spaces with ","
        s = s.replaceAll(" ", '","');
        //Replace all colons with ":"
        s = s.replaceAll(":", '":"');
        //Replace all end-of-lines (\n) with ","
        s = s.replaceAll("\n", '","');
        //Add [{ to the beginning and }] to the end.
        s = '[{"' + s + '"}]';

        //KLUDGE BECAUSE I CAN'T FIGURE OUT WHERE THESE ARE COMING FROM.
        s = s.replaceAll('{"",', "{");
        // log("post s=" + s);
        return JSON.parse(s);
    },
};

problems.y2020d4p2 = {
    givenInputData: problems.y2020d4p1.givenInputData,
    solve: function() {
        let s = readInput();
        let a = problems.y2020d4p1.recsToArray(s);

        // for (let i = 0; i < a.length; i++) {
        //   log(this.recToString(a[i]));
        // }

        writeOutput("The answer is: " + this.totalValid(a));
    },
    unitTest: function(ut) {
        const s = " T-y2020d4p2.";
        let x = `eyr:1972 cid:100
                                  hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

                                  iyr:2019
                                  hcl:#602927 eyr:1967 hgt:170cm
                                  ecl:grn pid:012533040 byr:1946

                                  hcl:dab227 iyr:2012
                                  ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

                                  hgt:59cm ecl:zzz
                                  eyr:2038 hcl:74454a iyr:2023
                                  pid:3556412378 byr:2007`;
        let a = problems.y2020d4p1.recsToArray(x);
        ut.test(s + "1", !this.isValid(a[0]));
        ut.test(s + "2", !this.isValid(a[1]));
        ut.test(s + "3", !this.isValid(a[2]));
        ut.test(s + "4", !this.isValid(a[3]));

        x = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
                                  hcl:#623a2f

                                  eyr:2029 ecl:blu cid:129 byr:1989
                                  iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

                                  hcl:#888785
                                  hgt:164cm byr:2001 iyr:2015 cid:88
                                  pid:545766238 ecl:hzl
                                  eyr:2022

                                  iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;
        a = problems.y2020d4p1.recsToArray(x);

        ut.test(s + "v1", this.isValid(a[0]));
        ut.test(s + "v2", this.isValid(a[1]));
        ut.test(s + "v3", this.isValid(a[2]));
        ut.test(s + "v4", this.isValid(a[3]));

        ut.test(s + "lfp1", this.hasExtraProperty({
            x: 0
        }));
        ut.test(s + "lfp2", !this.hasExtraProperty({
            byr: 0
        }));
        // let failed = false;
        // a = problems.y2020d4p1.recsToArray(this.givenInputData);
        // for (let i = 0; i < a.length; i++) {
        //   if (this.hasExtraProperty(a[i])) {
        //     // log("REC W/ EXTRA PROP:" + this.recToString(a[i]));
        //     failed = true;
        //   }
        // }
        // ut.test(s + "lfp3", !failed);
        ut.test(
            s + "iv1",
            this.isValid({
                pid: "123456789",
                hgt: "74in",
                ecl: "grn",
                iyr: "2012",
                eyr: "2030",
                byr: "1980",
                hcl: "#623a2f",
            })
        );
        ut.test(
            s + "iv2",
            !this.isValid({
                pid: "1234567890",
                hgt: "74in",
                ecl: "grn",
                iyr: "2012",
                eyr: "2030",
                byr: "1980",
                hcl: "#623a2f",
            })
        );
        ut.test(
            s + "iv3",
            !this.isValid({
                hcl: "12345678",
                hgt: "74in",
                ecl: "grn",
                iyr: "2012",
                eyr: "2030",
                byr: "1980",
                pid: "123456789",
            })
        );
        ut.test(
            s + "iv4",
            this.isValid({
                hcl: "#123456",
                hgt: "74in",
                ecl: "grn",
                iyr: "2012",
                eyr: "2030",
                byr: "1980",
                pid: "123456789",
            })
        );
        ut.test(
            s + "iv5",
            this.isValid({
                hcl: "#abcdef",
                hgt: "74in",
                ecl: "grn",
                iyr: "2012",
                eyr: "2030",
                byr: "1980",
                pid: "123456789",
            })
        );
        ut.test(
            s + "iv6",
            !this.isValid({
                hcl: "#1234567",
                hgt: "74in",
                ecl: "grn",
                iyr: "2012",
                eyr: "2030",
                byr: "1980",
                pid: "123456789",
            })
        );
        ut.test(
            s + "iv7",
            !this.isValid({
                hcl: "#12345",
                hgt: "74in",
                ecl: "grn",
                iyr: "2012",
                eyr: "2030",
                byr: "1980",
                pid: "123456789",
            })
        );
        ut.test(
            s + "iv8",
            !this.isValid({
                hcl: "123456",
                hgt: "74in",
                ecl: "grn",
                iyr: "2012",
                eyr: "2030",
                byr: "1980",
                pid: "123456789",
            })
        );
    },
    hasExtraProperty: function(r) {
        let p = Object.getOwnPropertyNames(r);
        for (let i = 0; i < p.length; i++) {
            // log("PROP:" + p[i] + "=" + r[p[i]]);

            if (
                ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"].indexOf(
                    p[i]
                ) < 0
            ) {
                // log("EXTRA PROP:" + p[i] + "=" + r[p[i]]);
                return true;
            }
        }
        return false;
    },
    recToString: function(r) {
        let s = "";
        if (!this.isValid(r)) return "";
        // s +=
        //   "" +
        // (this.isValid(r)
        //   ? "<div style='color:white'>V"
        //   : "<div style='color:red'>I");
        s += " byr=" + (r.hasOwnProperty("byr") ? r.byr : "ABSENT");
        s += " iyr=" + (r.hasOwnProperty("iyr") ? r.iyr : "ABSENT");
        s += " eyr=" + (r.hasOwnProperty("eyr") ? r.eyr : "ABSENT");
        s += " hgt=" + (r.hasOwnProperty("hgt") ? r.hgt : "ABSENT");
        s += " hcl=" + (r.hasOwnProperty("hcl") ? r.hcl : "ABSENT");
        s += " ecl=" + (r.hasOwnProperty("ecl") ? r.ecl : "ABSENT");
        s += " pid=" + (r.hasOwnProperty("pid") ? r.pid : "ABSENT");
        return s; //+ "</div>";
    },
    totalValid: function(a) {
        let t = 0;
        for (let i = 0; i < a.length; i++) {
            if (this.isValid(a[i])) t++;
        }
        return t;
    },
    isValid: function(r) {
        //FORMAT
        // byr (Birth Year) four digits; at least 1920 and at most 2002.
        if (!r.hasOwnProperty("byr")) return false;
        if (r.byr.length != 4) return false;
        if (!isBetween(parseInt(r.byr, 10), 1920, 2002)) return false;
        // log("byr ok");

        // iyr (Issue Year) four digits; at least 2010 and at most 2020.
        if (!r.hasOwnProperty("iyr")) return false;
        if (r.iyr.length != 4) return false;
        if (!isBetween(parseInt(r.iyr, 10), 2010, 2020)) return false;
        // log("iyr ok");

        // eyr (Expiration Year) four digits; at least 2020 and at most 2030.
        if (!r.hasOwnProperty("eyr")) return false;
        if (r.eyr.length != 4) return false;
        if (!isBetween(parseInt(r.eyr, 10), 2020, 2030)) return false;
        // log("eyr ok");

        // hgt (Height) a number followed by either cm or in:
        //If cm, the number must be at least 150 and at most 193.
        //If in, the number must be at least 59 and at most 76.
        if (!r.hasOwnProperty("hgt")) return false;
        let noUnit = true;
        if (r.hgt.substr(-2) == "cm") {
            if (!isBetween(parseInt(r.hgt, 10), 150, 193)) return false;
            noUnit = false;
        } else if (r.hgt.substr(-2) == "in") {
            if (!isBetween(parseInt(r.hgt, 10), 59, 76)) return false;
            noUnit = false;
        }
        if (noUnit) return false;
        // log("hgt ok");

        // hcl (Hair Color) a # followed by exactly six characters 0-9 or a-f.
        if (!r.hasOwnProperty("hcl")) return false;
        if (r.hcl.match(/#[0-9,a-f]{6}/) === null) return false;
        if (r.hcl.length != 7) return false;
        // log("hcl ok");

        // ecl (Eye Color) exactly one of: amb blu brn gry grn hzl oth.
        if (!r.hasOwnProperty("ecl")) return false;
        if (
            ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(r.ecl) < 0
        ) {
            return false;
        }
        // log("ecl ok");

        // pid (Passport ID) a nine-digit number, including leading zeroes.
        if (!r.hasOwnProperty("pid")) return false;
        if (r.pid.match(/[0-9]{9}/) === null) return false;
        if (r.pid.length != 9) return false;
        // log("pid ok");

        // cid (Country ID)
        //Don't check.
        return true;
    },
};

problems.y2020d5p1 = {
    givenInputData: AOC_Input_Data.y2020d5p1,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let hi = 0;
        for (let i = 0; i < a.length; i++) {
            if (this.seatId(a[i]) > hi) hi = this.seatId(a[i]);
        }

        writeOutput("The answer is: " + hi);
    },
    unitTest: function(ut) {
        const s = " T-y2020d5p1.";

        ut.test(s + "1", this.row("BFFFBBF") == 70);
        ut.test(s + "2", this.col("RRR") == 7);
        ut.test(s + "3", this.seatId("BFFFBBFRRR") == 567);
        ut.test(s + "4", this.seatId("FFFBBBFRRR") == 119);
        ut.test(s + "5", this.seatId("BBFFBBFRLL") == 820);
    },
    row: function(r) {
        r = r.replaceAll("F", "0");
        r = r.replaceAll("B", "1");
        return parseInt(r, 2);
    },
    col: function(r) {
        r = r.replaceAll("L", "0");
        r = r.replaceAll("R", "1");
        return parseInt(r, 2);
    },
    seatId: function(r) {
        return this.row(r.substr(0, 7)) * 8 + this.col(r.substr(-3));
    },
};

problems.y2020d5p2 = {
    givenInputData: problems.y2020d5p1.givenInputData,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        a.forEach((v, i, a) => (a[i] = problems.y2020d5p1.seatId(v)));
        a = a.sort((a, b) => a - b);
        let hi = 0;
        for (let i = 0; i < a.length; i++) {
            // log("" + a[i]);
            if (a[i] + 1 != a[i + 1]) {
                hi = a[i] + 1;
                break;
            }
            // if (this.seatId(a[i]) > hi) hi = this.seatId(a[i]);
        }

        writeOutput("The answer is: " + hi);
    },
    unitTest: function(ut) {
        const s = " T-y2020d5p2.";

    },
};

problems.y2020d6p1 = {
    givenInputData: AOC_Input_Data.p6p1,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        // log(a.length);
        let sum = 0;
        let group = {};
        for (let i = 0; i < a.length; i++) {
            if (a[i].length == 0) {
                // sum += Object.keys(group).length;
                for (x in Object.keys(group)) {
                    if (group[x]) sum++;
                }
                log("sum=" + sum);
                group = {};
            } else {
                if (Object.keys(group).length == 0) {
                    for (let j = 0; j < a[i].length; j++) {
                        // log("a[i][j]=" + a[i][j]);
                        group[a[i][j]] = true;
                    }
                } else {
                    for (x in Object.keys(group)) {
                        group[x] = false;
                    }
                    for (let j = 0; j < a[i].length; j++) {
                        // log("a[i][j]=" + a[i][j]);
                        group[a[i][j]] = true;

                    }
                }
            }
            sum += Object.keys(group).length;
            writeOutput("The answer is: " + sum);
        }
    },
    unitTest: function(ut) {
        const s = " T-y2020d6p1.";

    },
};

problems.y2020d6p2 = {
    givenInputData: problems.y2020d6p1.givenInputData,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        // log(a.length);
        let sum = 0;
        let group = [];
        for (let i = 0; i < a.length; i++) {
            if (a[i].length == 0) {
                sum += this.intersectionCount(group);
                group = [];
            } else {
                group.push(a[i]);
            }
        }
        sum += this.intersectionCount(group);
        writeOutput("The answer is: " + sum);
    },
    unitTest: function(ut) {
        const s = " T-y2020d6p2.";

        ut.test(s + 'u1', this.unionCount(['abc']) == 3);
        ut.test(s + 'u2', this.unionCount(['a', 'b', 'c']) == 3);
        ut.test(s + 'u3', this.unionCount(['ab', 'ac']) == 3);
        ut.test(s + 'u4', this.unionCount(['a', 'a', 'a', 'a']) == 1);
        ut.test(s + 'u5', this.unionCount(['b']) == 1);
        ut.test(s + 'i1', this.intersectionCount(['abc']) == 3);
        ut.test(s + 'i2', this.intersectionCount(['a', 'b', 'c']) == 0);
        ut.test(s + 'i3', this.intersectionCount(['ab', 'ac']) == 1);
        ut.test(s + 'i4', this.intersectionCount(['a', 'a', 'a', 'a']) == 1);
        ut.test(s + 'i5', this.intersectionCount(['b']) == 1);
    },
    intersectionCount: function(a) {
        if (a.length == 0) return 0;
        let s = new Set(a[0]);
        for (let i = 1; i < a.length; i++) {
            s = setIntersection(s, new Set(a[i]));
        }
        return s.size;
    },
    unionCount: function(a) {
        if (a.length == 0) return 0;
        let s = new Set(a[0]);
        for (let i = 1; i < a.length; i++) {
            s = setUnion(s, new Set(a[i]));
        }
        return s.size;
    }
};


problems.y2020d7p1 = {
    givenInputData: AOC_Input_Data.y2020d7p1,
    solve: function() {
        let s = readInput();
        let d = this.rulesToDigraph(s);
        let count = 0;
        let sg = d.getNodeId('shiny gold');
        for (let i = 0; i < d.nodeNames.length; i++) {
            if (d.isPath(i, sg)) count++;
        }
        writeOutput("The part 1 answer is: " + count + "  The part 2 answer is: " + d.edgeWeightSumRecursive(sg));
    },
    unitTest: function(ut) {
        const s = " T-y2020d7p1.";

        (new Digraph()).unitTest(ut);

        let x = this.parseRule("light red bags contain 1 bright white bag, 2 muted yellow bags");
        ut.test(s + "pr11", x.outerbag === "light red");
        ut.test(s + "pr12", x.innerbags.length === 2);
        ut.test(s + "pr13", x.innerbags[0] === "bright white");
        ut.test(s + "pr14", x.innerbags[1] === "muted yellow");
        x = this.parseRule("bright white bags contain 1 shiny gold bag");
        ut.test(s + "pr21", x.outerbag === "bright white");
        ut.test(s + "pr22", x.innerbags.length === 1);
        ut.test(s + "pr23", x.innerbags[0] === "shiny gold");
        x = this.parseRule("shiny tomato bags contain no other bags");
        ut.test(s + "pr31", x.outerbag === "shiny tomato");
        ut.test(s + "pr32", x.innerbags.length === 0);

        let dd = this.rulesToDigraph(`light red bags contain 1 bright white bag, 2 muted yellow bags.`);
        ut.test(s + "dd1", dd.nodeNames.length === 3);
        ut.test(s + "dd2", dd.edgesTo.length === 3);
        ut.test(s + "dd3", dd.edgesTo[0].length === 3);
        ut.test(s + "dd4", dd.edgesTo[1].length === 3);
        ut.test(s + "dd5", dd.edgesTo[2].length === 3);
        ut.test(s + "dd6", dd.edgesTo[0][0] === 0);
        ut.test(s + "dd7", dd.edgesTo[0][1] === 1);
        ut.test(s + "dd8", dd.edgesTo[0][2] === 2);
        ut.test(s + "dd9a", dd.isEdge(dd.getNodeId('light red'), dd.getNodeId('bright white')));
        ut.test(s + "dd9b", dd.isEdge(dd.getNodeId('light red'), dd.getNodeId('muted yellow')));
        ut.test(s + "dd9c", !dd.isEdge(dd.getNodeId('muted yellow'), dd.getNodeId('light red')));
        ut.test(s + "dd9d", !dd.isEdge(dd.getNodeId('muted yellow'), dd.getNodeId('bright white')));
        ut.test(s + "dd9e", dd.isPath(dd.getNodeId('light red'), dd.getNodeId('bright white')));
        ut.test(s + "dd9f", dd.isPath(dd.getNodeId('light red'), dd.getNodeId('muted yellow')));
        ut.test(s + "dd9g", !dd.isPath(dd.getNodeId('muted yellow'), dd.getNodeId('light red')));
        ut.test(s + "dd9h", !dd.isPath(dd.getNodeId('muted yellow'), dd.getNodeId('bright white')));

        dd.addEdgeTo("shit brown", "light red");
        ut.test(s + "dd10a", dd.isEdge(dd.getNodeId('shit brown'), dd.getNodeId('light red')));
        ut.test(s + "dd10b", dd.isPath(dd.getNodeId('shit brown'), dd.getNodeId('light red')));
        ut.test(s + "dd10c", dd.isPath(dd.getNodeId('shit brown'), dd.getNodeId('bright white')));

        ut.test(s + "ews1a", dd.edgeWeightSum(dd.getNodeId('light red')) === 3);
        ut.test(s + "ews1b", dd.edgeWeightSum(dd.getNodeId('shit brown')) === 1);
        ut.test(s + "ews1c", dd.edgeWeightSumRecursive(dd.getNodeId('shit brown')) === 4);


        // dd.toString();


        let d = this.rulesToDigraph(`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`);
        ut.test(s + "rd1", d.isEdge(d.getNodeId('bright white'), d.getNodeId('shiny gold')));
        ut.test(s + "rd2", d.isEdge(d.getNodeId('dark olive'), d.getNodeId('faded blue')));
        ut.test(s + "rd3", d.isEdge(d.getNodeId('dark olive'), d.getNodeId('dotted black')));
        ut.test(s + "rd4", d.isEdge(d.getNodeId('muted yellow'), d.getNodeId('faded blue')));
        ut.test(s + "rd5", d.isEdge(d.getNodeId('vibrant plum'), d.getNodeId('faded blue')));
        ut.test(s + "rd6", d.isEdge(d.getNodeId('shiny gold'), d.getNodeId('dark olive')));
        ut.test(s + "rd7", d.isEdge(d.getNodeId('light red'), d.getNodeId('bright white')));
        ut.test(s + "rde1", d.edgeWeightSumRecursive(d.getNodeId('shiny gold')) === 32);

        // d.toString();
    },
    parseRule: function(s) {
        s = s.trim();
        s = s.replaceAll('bags', 'bag');
        s = s.replaceAll('bag,', 'bag');
        s = s.replaceAll('contain', '');
        s = s.replaceAll('no other bag', '');
        s = s.trim();
        // log("trimmed down s=" + s);
        let a = s.split('bag');
        let x = {};
        x.outerbag = a[0].trim();
        x.innerbags = [];
        x.innerqtys = [];
        for (let i = 1; i < a.length; i++) {
            let ib = a[i].trim().substring(2).trim();
            let qty = parseInt(a[i].trim());
            if (ib.length > 0) {
                x.innerbags[i - 1] = ib;
                x.innerqtys[i - 1] = qty;
                // log('ib=' + ib);
            }
        }
        // log('x.outerbag=' + x.outerbag);
        return x;
    },
    rulesToDigraph: function(rules) {
        rules = rules.replaceAll('\n', '');
        rules = rules.replaceAll('\r', '');
        rules = rules.trim();
        let a = rules.trim().split('.');
        let d = new Digraph();
        for (let i = 0; i < a.length; i++) {
            if (a[i].trim().length === 0) continue;
            let x = this.parseRule(a[i]);
            d.addNode(x.outerbag);
            for (let j = 0; j < x.innerbags.length; j++) {
                d.addEdgeTo(x.outerbag, x.innerbags[j], x.innerqtys[j]);
            }
        }
        return d;
    }

};

problems.y2020d7p2 = {
    givenInputData: problems.y2020d7p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d7p2.";

    },
};

class Puter {
    constructor() {
        this.instructions = [];
        this.pc = 0;
        this.accumulator = 0;
        this.fault = false;
    }
    parseInstruction(s) {
        s = s.trim();
        let x = {};
        x.operation = s.substr(0, 3);
        x.argument = parseInt(s.substr(3).trim());
        x.executed = false;
        return x;
    }
    loadProgram(s) {
        let a = stringToStringArrayNewline(s);
        for (let i = 0; i < a.length; i++) {
            this.instructions[i] = this.parseInstruction(a[i]);
        }
    }
    reset() {
        this.pc = 0;
        this.accumulator = 0;
        this.fault = false;
        for (let i = 0; i < this.instructions.length; i++) {
            this.instructions[i].executed = false;
        }
    }
    swapnj(i) {
        if (this.instructions[i].operation === 'nop') {
            this.instructions[i].operation = 'jmp';
            return true;
        }
        if (this.instructions[i].operation === 'jmp') {
            this.instructions[i].operation = 'nop';
            return true;
        }
        return false;
    }
    executeNextInstruction() {
        let x = this.instructions[this.pc];
        if (x.executed) {
            this.fault = true;
            return;
        }
        x.executed = true;
        switch (x.operation) {
            case 'acc':
                this.accumulator += x.argument;
                this.pc++;
                break;

            case 'jmp':
                this.pc += x.argument;
                break;

            case 'nop':
                this.pc++;
        }
    }
    runProgram(w) {
        while (!this.fault && (this.pc < this.instructions.length)) {
            this.executeNextInstruction();
            if (w) {
                let s = `pc=${this.pc}  ac=${this.accumulator}`;
                w.innerHTML = s;
            }
        }
    }
}
problems.y2020d8p1 = {
    givenInputData: ``,
    solve: function() {
        let p = new Puter();
        p.loadProgram(readInput());
        p.runProgram();

        writeOutput("The answer is: " + p.accumulator);
        log('pc=' + p.pc + ', accumulator=' + p.accumulator);
    },
    unitTest: function(ut) {
        const s = " T-y2020d8p1.";

    },
};

problems.y2020d8p2 = {
    givenInputData: problems.y2020d8p1.givenInputData,
    solve: function() {
        let p = new Puter();
        p.loadProgram(readInput());

        for (let i = 0; i < p.instructions.length; i++) {
            if (!p.swapnj(i)) continue;
            p.runProgram();
            if (!p.fault) {
                writeOutput("The answer is: " + p.accumulator + "  (instruction #" + i + " was corrupt.)");
                return;
            } else {
                log('swapped ' + i + '  no joy ac=' + p.accumulator);
                p.swapnj(i); //swap them back.
                p.reset();
            }
        }
        writeOutput("There is no solution.");
    },
    unitTest: function(ut) {
        const s = " T-y2020d8p2.";

    },
};

class XmasNumList {
    constructor(pl = 25) {
        this.preambleLength = pl;
        this.nums = [];
    }
    load(s) {
        this.nums = stringToIntArrayNewline(s);
    }
    isValid(i) {
        if (i < this.preambleLength) return false;
        for (let a = i - this.preambleLength; a < i - 1; a++) {
            for (let b = a + 1; b < i; b++) {
                if (this.nums[a] + this.nums[b] === this.nums[i]) return true;
            }
        }
        return false;
    }
    findFirstInvalid() {
        for (let i = this.preambleLength; i < this.nums.length; i++) {
            if (!this.isValid(i)) return i;
        }
        return -1;
    }
    findWeakness(n) {
        for (let i = 0; i < this.nums.length - 1; i++) {
            let sum = this.nums[i];
            let min = sum;
            let max = sum;
            for (let j = i + 1; j < this.nums.length; j++) {
                let x = this.nums[j];
                sum += x;
                if (x > max) max = x;
                if (x < min) min = x;
                if (sum === n) return min + max;
                if (sum > n) break;
            }
        }
        return -1;
    }
}

problems.y2020d9p1 = {
    givenInputData: ``,
    solve: function() {
        let xnl = new XmasNumList(25);
        xnl.load(readInput());
        let fi = xnl.findFirstInvalid();
        writeOutput("The answer is: " + xnl.nums[fi] + ' and the weakness is ' + xnl.findWeakness(xnl.nums[fi]));
    },
    unitTest: function(ut) {
        const s = " T-y2020d9p1.";
        let xnl = new XmasNumList(5);
        xnl.load(`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`);
        let fi = xnl.findFirstInvalid();
        ut.test(s + '1', fi >= 0);
        // log("xnl.nums[fi]=" + xnl.nums[fi]);
        ut.test(s + '2', xnl.nums[fi] === 127);
        ut.test(s + '3', xnl.findWeakness(127) === 62);

    },
};

problems.y2020d9p2 = {
    givenInputData: problems.y2020d9p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d9p2.";

        ut.test(s + "10", 1 == 1);
    },
};

class AdChain {
    constructor() {
        this.nums = [];
    }
    load(s) {
        this.nums = stringToIntArrayNewline(s);
        this.nums.push(0); //add the outlet.
        this.nums.sort((a, b) => a - b);
        this.nums.push(this.nums[this.nums.length - 1] + 3); //add the device.
    }
    loadX(s) {
        this.nums = stringToIntArrayNewline(s);
        this.nums.push(0); //add the outlet.
        this.nums.sort((a, b) => a - b);
        // this.nums.push(this.nums[this.nums.length - 1] + 3); //add the device.
    }
    calc1() {
        let diff1 = 0;
        let diff3 = 0;
        for (let i = 1; i < this.nums.length; i++) {
            let prev = this.nums[i - 1];
            let curr = this.nums[i];
            if (curr - prev === 1) diff1++;
            if (curr - prev === 3) diff3++;
        }
        return diff1 * diff3;
    }
    // //Calc the max number of paths for sequence frm 0 to n.
    // maxPathsData = [1, 1, 2]; //Used for memoization.
    // maxPaths(n) {
    //     // if (n === 0) return 1;
    //     // if (n === 1) return 1;
    //     // if (n === 2) return 2;
    //     if (this.maxPathsData[n]) return this.maxPathsData[n];
    //     let mp = this.maxPaths(n - 1) + this.maxPaths(n - 2) + this.maxPaths(n - 3);
    //     this.maxPathsData[n] = mp;
    //     return mp;
    // }
    // numHoles() {
    //     if (this.nums.length <= 1) return 0;
    //     let current = this.nums[0];
    //     let missing = 0;
    //     for (let i = 1; i < this.nums.length; i++) {
    //         missing += this.nums[i] - (current + 1);
    //         current = this.nums[i];
    //     }
    //     return missing;
    // }
    // calcPaths6() {
    //     let contiguousSizes = [];
    //     let holeSizes = [];
    //     let wasAdapter = true;
    //     let runSize = 0;
    //     for (let n = 0; n <= this.nums[this.nums.length - 1]; n++) {
    //         let isAdapter = this.nums.includes(n);
    //         if (isAdapter !== wasAdapter) {
    //             if (wasAdapter) {
    //                 contiguousSizes.push(runSize);
    //             } else {
    //                 holeSizes.push(runSize);
    //             }
    //             runSize = 1;
    //             wasAdapter = isAdapter;
    //         } else {
    //             runSize++;
    //         }
    //     }
    //     contiguousSizes.push(runSize - 1);
    //     // log("holeSizes.length=" + holeSizes.length);
    //     // for (let x = 0; x < holeSizes.length; x++) {
    //     //     log("x=" + x + " hs=" + holeSizes[x]);
    //     // }
    //     // log("contiguousSizes.length=" + contiguousSizes.length);
    //     // for (let x = 0; x < contiguousSizes.length; x++) {
    //     //     log("x=" + x + " cs=" + contiguousSizes[x]);
    //     // }
    //     let currentRegion = 0;
    //     let p = this.maxPaths(contiguousSizes[0]);
    //     for (let i = 1; i < contiguousSizes.length; i++) {
    //         if (holeSizes[i - 1] > 2) return 0; //no paths possible thru a gap this size.
    //         if (holeSizes[i - 1] === 1) {
    //             if (contiguousSizes[i - 1] > 1 && contiguousSizes[i] > 1) {
    //                 p *= 3;
    //             } else if (contiguousSizes[i - 1] > 1 || contiguousSizes[i] > 1) {
    //                 p *= 2;
    //             }
    //         }
    //         p *= this.maxPaths(contiguousSizes[i]);

    //     }
    //     return p;
    // }
    // calcPaths5() {
    //     let max = this.nums[this.nums.length - 1];
    //     return this.maxPaths(max);
    // }
    // calcPaths2() {
    //     let max = this.nums[this.nums.length - 1];
    //     return this.maxPaths(max) / Math.pow(2, this.numHoles());
    // }
    // calcPaths3() {
    //     return Math.pow(2, this.nums[this.nums.length - 1] - this.numHoles() - 1);
    // }
    // calcPaths4(n) {
    //     return -603;
    //     if (n === 0) return 1;
    //     if (n === 1) return 1;
    //     if (n === 2) return 2;
    //     return this.calcPaths4(n - 1) + this.calcPaths4(n - 2) + this.calcPaths4(n - 3);
    // }
    calcPaths() {
        //Build a digraph of all possible connections.
        let dg = new Digraph();
        // log("1dg=" + dg.toString());

        for (let i = 0; i < this.nums.length - 1; i++) {
            let parent = this.nums[i];
            for (let j = i + 1; j < this.nums.length; j++) {
                let child = this.nums[j];
                if (child > parent + 3) break;
                dg.addEdgeTo("n" + parent, "n" + child);
            }
        }
        // log("2dg=" + dg.toString());
        return dg.numberOfPaths("n" + this.nums[0], "n" + this.nums[this.nums.length - 1]);
    }

}
problems.y2020d10p1 = {
    givenInputData: AOC_Input_Data.y2020d10p1,
    solve: function() {
        let ac = new AdChain();
        ac.load(readInput());

        writeOutput("The answer is: " + ac.calc1());
    },
    td1: `16
    10
    15
    5
    1
    11
    7
    19
    6
    12
    4`,
    td2: `28
    33
    18
    42
    31
    14
    46
    20
    48
    47
    24
    23
    49
    45
    19
    38
    39
    11
    1
    32
    25
    35
    8
    17
    7
    9
    4
    2
    34
    10
    3`,
    unitTest: function(ut) {
        const s = " T-y2020d10p1.";
        let ac = new AdChain();
        ac.load(this.td1);
        ut.test(s + "1", ac.calc1() === 35);
        ac.load(this.td2);
        ut.test(s + "2", ac.calc1() === 220);
    },
};

problems.y2020d10p2 = {
    givenInputData: problems.y2020d10p1.givenInputData,
    solve: function() {
        let ac = new AdChain();
        ac.load(readInput());

        writeOutput("The answer is: " + ac.calcPaths());
    },
    unitTest: function(ut) {
        const s = " T-y2020d10p2.";
        let ac = new AdChain();
        ac.load(problems.y2020d10p1.td1);
        ut.test(s + "1b", ac.calcPaths() === 8);
        // ut.test(s + "1b6", ac.calcPaths6() === 8);
        // ut.test(s + "1b2", ac.calcPaths2() === 8);
        // ut.test(s + "1b3", ac.calcPaths3() === 8);
        // ut.test(s + "1b4", ac.numHoles() === 10);
        // log('1b ac.calcPaths()=' + ac.calcPaths());
        // log('1b6 ac.calcPaths6()=' + ac.calcPaths6());
        // log('1b2 ac.calcPaths2()=' + ac.calcPaths2());
        // log('1b2 ac.calcPaths3()=' + ac.calcPaths3());
        // log('1b2 ac.calcPaths3()=' + ac.calcPaths3());
        // log('1b3 ac.calcPaths4()=' + ac.calcPaths4());
        // log('1b4 ac.numHoles()=' + ac.numHoles());
        ac.load(problems.y2020d10p1.td2);
        // log('2b ac.calcPaths()=' + ac.calcPaths());
        ut.test(s + "2b", ac.calcPaths() === 19208);
        // ut.test(s + "2b2", ac.calcPaths2() === 19208);



        let ac2 = new AdChain();
        for (let i = 0; i <= 50; i++) {
            ac2.nums.push(i);
            // log("i=" + i + " paths=" + ac2.calcPaths() + " paths2=" + ac2.calcPaths2());
            // log("i=" + i + " paths=" + ac2.calcPaths() + " paths6=" + ac2.calcPaths6());
            // log("i=" + i + " paths6=" + ac2.calcPaths6());
        }

        let td = "1";
        ac.loadX(td);
        // log("***maxa=1 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n2";
        ac.loadX(td);
        // log("***maxa=2 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n4";
        ac.loadX(td);
        // log("***maxa=3 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n5";
        ac.loadX(td);
        // log("***maxa=4 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n6";
        ac.loadX(td);
        // log("***maxa=5 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n7";
        ac.loadX(td);
        // log("***maxa=6 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n10";
        ac.loadX(td);
        // log("***maxa=7 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

    },
};

class AOC_gol {
    constructor() {
        this.matrix = new Matrix2d();
        this.stable = false;
    }
    load(s) {
        let a = stringToStringArrayNewline(s);
        for (let y = a.length - 1; y >= 0; y--) {
            for (let x = 0; x < a[y].length; x++) {
                // log("x=" + x + " y=" + y + " char=" + a[y].charAt(x));
                this.matrix.set(x, y, a[y].charAt(x));
            }
        }
    }
    isEmptySeat(x, y) {
        if (this.matrix.isOutOfBounds(x, y)) return false;
        let c = this.matrix.get(x, y);
        return (c === 'L');
    }
    isOccupiedSeat(x, y) {
        if (this.matrix.isOutOfBounds(x, y)) return false;
        let c = this.matrix.get(x, y);
        return (c === '#');
    }
    adjacentSeatsOccupied(x, y) {
        let n = 0;
        if (this.isOccupiedSeat(x - 1, y - 1)) n++;
        if (this.isOccupiedSeat(x, y - 1)) n++;
        if (this.isOccupiedSeat(x + 1, y - 1)) n++;
        if (this.isOccupiedSeat(x - 1, y)) n++;
        if (this.isOccupiedSeat(x + 1, y)) n++;
        if (this.isOccupiedSeat(x - 1, y + 1)) n++;
        if (this.isOccupiedSeat(x, y + 1)) n++;
        if (this.isOccupiedSeat(x + 1, y + 1)) n++;
        return n;
    }
    isLosSeatOccupied(x, y, dx, dy) {
        let nx = x;
        let ny = y;
        while (true) {
            nx += dx;
            ny += dy;
            if (this.matrix.isOutOfBounds(nx, ny)) return false;
            if (this.isOccupiedSeat(nx, ny)) return true;
            if (this.isEmptySeat(nx, ny)) return false;
        }
    }
    visibleSeatsOccupied(x, y) {
        let n = 0;
        if (this.isLosSeatOccupied(x, y, 1, 1)) n++;
        if (this.isLosSeatOccupied(x, y, 1, 0)) n++;
        if (this.isLosSeatOccupied(x, y, 1, -1)) n++;
        if (this.isLosSeatOccupied(x, y, 0, 1)) n++;
        if (this.isLosSeatOccupied(x, y, 0, -1)) n++;
        if (this.isLosSeatOccupied(x, y, -1, 1)) n++;
        if (this.isLosSeatOccupied(x, y, -1, 0)) n++;
        if (this.isLosSeatOccupied(x, y, -1, -1)) n++;
        return n;
    }
    toLog() {
        for (let x = 0; x <= this.matrix.maxX; x++) {
            for (let y = 0; y <= this.matrix.maxY; y++) {
                log("x=" + x + " y=" + y + " val=" + this.matrix.get(x, y));
            }
        }
    }
    stepP1() {
        let m = new Matrix2d();
        let change = false;
        for (let x = 0; x <= this.matrix.maxX; x++) {
            for (let y = 0; y <= this.matrix.maxY; y++) {
                m.set(x, y, this.matrix.get(x, y));
                if (this.isEmptySeat(x, y)) {
                    if (this.adjacentSeatsOccupied(x, y) == 0) {
                        m.set(x, y, '#');
                        change = true;
                    }
                } else if (this.isOccupiedSeat(x, y)) {
                    if (this.adjacentSeatsOccupied(x, y) >= 4) {
                        m.set(x, y, 'L');
                        change = true;
                    }
                }
            }
        }
        if (change) {
            this.matrix = m;
        } else {
            this.stable = true;
        }
    }
    stepP2() {
        let m = new Matrix2d();
        let change = false;
        for (let x = 0; x <= this.matrix.maxX; x++) {
            for (let y = 0; y <= this.matrix.maxY; y++) {
                m.set(x, y, this.matrix.get(x, y));
                if (this.isEmptySeat(x, y)) {
                    if (this.visibleSeatsOccupied(x, y) == 0) {
                        m.set(x, y, '#');
                        change = true;
                    }
                } else if (this.isOccupiedSeat(x, y)) {
                    if (this.visibleSeatsOccupied(x, y) >= 5) {
                        m.set(x, y, 'L');
                        change = true;
                    }
                }
            }
        }
        if (change) {
            this.matrix = m;
        } else {
            this.stable = true;
        }
    }
    totalSeatsOcupied() {
        let n = 0;
        for (let x = 0; x <= this.matrix.maxX; x++) {
            for (let y = 0; y <= this.matrix.maxY; y++) {
                if (this.isOccupiedSeat(x, y)) {
                    n++;
                }
            }
        }
        return n;
    }
}

problems.y2020d11p1 = {
    givenInputData: ``,
    solve: function() {
        let ag = new AOC_gol();
        ag.load(readInput());
        log("ag.maxX=" + ag.maxX + " ag.maxY=" + ag.maxY);
        // ag.toLog();
        while (!ag.stable) ag.stepP1();

        writeOutput("The answer is: " + ag.totalSeatsOcupied());
    },
    unitTest: function(ut) {
        const s = " T-y2020d11p1.";
    },
};

problems.y2020d11p2 = {
    givenInputData: problems.y2020d11p1.givenInputData,
    solve: function() {
        let ag = new AOC_gol();
        ag.load(readInput());
        log("ag.maxX=" + ag.maxX + " ag.maxY=" + ag.maxY);
        // ag.toLog();
        while (!ag.stable) ag.stepP2();

        writeOutput("The answer is: " + ag.totalSeatsOcupied());
    },
    unitTest: function(ut) {
        const s = " T-y2020d11p2.";
    },
};

class Boat {
    constructor(x, y) {
        this.startX = x;
        this.startY = y;
        this.currentX = x;
        this.currentY = y;
        this.facing = 0;
    }
    direction(d) {
        switch (d) {
            case 'N':
                return 90;
            case 'S':
                return 270;
            case 'E':
                return 0;
            case 'W':
                return 180;
            case 'F':
                return this.facing;
            default:
                return 'T';
        }
    }
    manhattanDistance() {
        log("startX=" + this.startX + " currentX=" + this.currentX + " startY=" + this.startY + " currentY=" + this.currentY);
        return Math.abs(this.startX - this.currentX) + Math.abs(this.startY - this.currentY);
    }
    normalize(deg) {
        while (deg < 0) deg += 360;
        while (deg >= 360) deg -= 360;
        return deg;
    }
    move(s) {
        let cmd = s.charAt(0);
        let val = parseInt(s.substr(1));
        log("cmd=" + cmd + " val=" + val + " dir=" + this.direction(cmd));
        switch (this.direction(cmd)) {
            case 0:
                this.currentX += val;
                break;
            case 180:
                this.currentX -= val;
                break;
            case 90:
                this.currentY += val;
                break;
            case 270:
                this.currentY -= val;
                break;
            default:
                if (cmd === 'L') {
                    this.facing = this.normalize(this.facing + val);
                } else if (cmd === 'R') {
                    this.facing = this.normalize(this.facing - val);
                }
        }
    }
    run(a) {
        for (let i = 0; i < a.length; i++) {
            // log("i=" + i + " a[i]=" + a[i]);
            this.move(a[i]);
        }
    }
};

class Boat2 extends Boat {
    constructor(x, y) {
        super(x, y);
        this.waypointdX = x + 10;
        this.waypointdY = y + 1;
        // this.dlog();
        // log("---");
    }
    dlog() {
        log("currentX=" + this.currentX + " currentY=" + this.currentY);
        log("waypointdX=" + this.waypointdX + " waypointdY=" + this.waypointdY);
    }
    move(s) {
        let cmd = s.charAt(0);
        let val = parseInt(s.substr(1));
        log("cmd=" + cmd + " val=" + val);
        if (cmd === 'F') {
            //move toward waypoint.
            this.currentX += this.waypointdX * val;
            this.currentY += this.waypointdY * val;
        } else if ((cmd === 'R') || (cmd === 'L')) {
            if (cmd === 'R') val = -val;
            val = this.normalize(val);
            if (val === 90) {
                let temp = this.waypointdX;
                this.waypointdX = -this.waypointdY;
                this.waypointdY = temp;
            } else if (val === 180) {
                this.waypointdX = -this.waypointdX;
                this.waypointdY = -this.waypointdY;
            } else if (val === 270) {
                let temp = this.waypointdX;
                this.waypointdX = this.waypointdY;
                this.waypointdY = -temp;
            }
        } else if (cmd === 'N') {
            this.waypointdY += val;

        } else if (cmd === 'S') {
            this.waypointdY -= val;

        } else if (cmd === 'E') {
            this.waypointdX += val;

        } else if (cmd === 'W') {
            this.waypointdX -= val;
        }
        // this.dlog();
    }
};

problems.y2020d12p1 = {
    givenInputData: AOC_Input_Data.y2020d12p1,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let b = new Boat(0, 0);
        b.run(a);

        writeOutput("The answer is: " + b.manhattanDistance());
    },
    unitTest: function(ut) {
        const s = " T-y2020d12p1.";
    },
};

problems.y2020d12p2 = {
    givenInputData: problems.y2020d12p1.givenInputData,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let b = new Boat2(0, 0);
        b.run(a);

        writeOutput("The answer is: " + b.manhattanDistance());
    },
    unitTest: function(ut) {
        const s = " T-y2020d12p2.";
    },
};

problems.y2020d13p1 = {
    givenInputData: AOC_Input_Data.y2020d13p1,
    departure_ready: 0,
    departure_time: -1,
    departure_bus: -1,
    busses: [],
    reset: function() {
        this.departure_ready = 0;
        this.departure_time = -1;
        this.departure_bus = -1;
        this.busses = [];
    },
    parse: function(s) {
        let a = stringToStringArrayNewline(s);
        this.departure_ready = parseInt(a[0], 10);

        let b = stringToIntArrayComma(a[1]);
        for (let i = 0; i < b.length; i++) {
            // if (b[i].trim() === 'x') continue;
            let bus = parseInt(b[i], 10);
            if (!isNaN(bus)) this.busses.push(bus);
        }
        // this.dlog();
    },
    dlog: function() {
        log("departure_ready=" + this.departure_ready);
        log("departure_time=" + this.departure_time);
        log("departure_bus=" + this.departure_bus);
        for (let i = 0; i < this.busses.length; i++) {
            log("busses[" + i + "]=" + this.busses[i]);
        }
    },
    findTime: function() {
        let waitTime = 0;
        while (true) {
            let t = this.departure_ready + waitTime;
            for (let i = 0; i < this.busses.length; i++) {
                if (t % this.busses[i] === 0) {
                    this.departure_time = t;
                    this.departure_bus = this.busses[i];
                    return;
                }
            }
            waitTime++;
        }
    },
    solve: function() {
        this.reset();
        this.parse(readInput());
        this.findTime();

        writeOutput("The answer is: " +
            (this.departure_time - this.departure_ready) * this.departure_bus +
            ".  Take bus #" + this.departure_bus + " at time " + this.departure_time + ".");
        // this.dlog();
    },
    unitTest: function(ut) {
        const s = " T-y2020d13p1.";
    },
};


problems.y2020d13p2 = {
    givenInputData: problems.y2020d13p1.givenInputData,
    earliestTime: 0,
    busses: [],
    largestBusnum: -1,
    largestBusnumOffset: -1,
    reset: function() {
        this.earliestTime = 0;
        this.busses = [];
        this.largestBusnum = -1;
        this.largestBusnumOffset = -1;
    },
    dlog: function() {
        log("earliestTime=" + this.earliestTime);
        log("largestBusnum=" + this.largestBusnum);
        log("largestBusnumOffset=" + this.largestBusnumOffset);
        for (let i = 0; i < this.busses.length; i++) {
            log("busses[" + i + "].busnum=" + this.busses[i].busnum +
                " offset=" + this.busses[i].offset);
        }
    },
    parse: function(s) {
        let a = stringToStringArrayNewline(s);
        let b = a[1].split(",");
        for (let i = 0; i < b.length; i++) {
            // log("b[i]=" + b[i]);
            let bus = parseInt(b[i], 10);
            if (!isNaN(bus)) {
                if (bus > this.largestBusnum) {
                    this.largestBusnum = bus;
                    this.largestBusnumOffset = i;
                }
                this.busses.push({
                    offset: i,
                    busnum: bus
                });
            }
        }
        // this.dlog();
    },
    findTime: function() {
        this.earliestTime = this.largestBusnum - this.largestBusnumOffset;
        let step = this.largestBusnum;
        let bs = this.busses.filter(x => x.busnum != this.largestBusnum);
        while (true) {
            let ok = true;
            for (let i = 0; i < bs.length; i++) {
                let b = bs[i];
                if ((this.earliestTime + b.offset) % b.busnum !== 0) {
                    ok = false;
                    break;
                } else {
                    //found a match; increase the cycle length.
                    step = Tmath.lcm(b.busnum, step);
                }
            }
            if (ok) return;
            this.earliestTime += step;
        }
        // this.dlog();
    },
    oldfindTime: function() {
        this.earliestTime = this.largestBusnum - this.largestBusnumOffset;
        while (true) {
            let ok = true;
            for (let i = 0; i < this.busses.length; i++) {
                let b = this.busses[i];
                if ((this.earliestTime + b.offset) % b.busnum !== 0) {
                    ok = false;
                    break;
                }
            }
            if (ok) return;
            this.earliestTime += this.largestBusnum;
        }
        // this.dlog();
    },
    eval: function(s) {
        this.reset();
        this.parse(s);
        this.findTime();
        // log("eval done");
        // this.dlog();
        return this.earliestTime;
    },
    solve: function() {
        this.eval(readInput());

        writeOutput("The answer is: " + this.earliestTime);
    },
    unitTest: function(ut) {
        const s = " T-y2020d13p2.";
        ut.test(s + "1", this.eval("939\n7,13,x,x,59,x,31,19") === 1068781);
        ut.test(s + "2", this.eval("939\n17,x,13,19") === 3417);
        ut.test(s + "3", this.eval("939\n67,7,59,61") === 754018);
        ut.test(s + "4", this.eval("939\n67,x,7,59,61") === 779210);
        ut.test(s + "5", this.eval("939\n67,7,x,59,61") === 1261476);
        ut.test(s + "6", this.eval("939\n1789,37,47,1889") === 1202161486);
    },
};


problems.y2020d14p1 = {
    givenInputData: AOC_Input_Data.y2020d14p1,
    mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    maskLh: "XXXX",
    maskRh: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    mask0Lh: 0,
    mask0Rh: 0,
    mask1Lh: 0,
    mask1Rh: 0,
    mem: {},
    opcount: 0,
    reset: function() {
        this.mem = [];
        this.opcount = 0;
    },
    store: function(loc, val) {
        this.mem[loc] = this.masked(val);
    },
    masked: function(val) {
        let newvalstring = "";
        let valstring = ('000000000000000000000000000000000000' + val.toString(2)).substr(-36);
        for (let i = 0; i < 36; i++) {
            let m = this.mask.substr(i, 1);
            if (m === '1') {
                newvalstring += '1';
            } else if (m === '0') {
                newvalstring += '0';
            } else {
                newvalstring += valstring.substr(i, 1);
            }
        }
        return parseInt(newvalstring, 2);
    },
    oldmasked: function(val) {
        //JavaScript bitwise operators work on 32-bit integers.
        let h = Math.pow(2, 32);
        let lh = Math.floor(val / h);
        let rh = val - lh;
        let newlh = (lh & this.mask0Lh) | this.mask1Lh;
        let newrh = (rh & this.mask0Rh) | this.mask1Rh;
        let newval = (lh * h) + rh;
        log("mask=" + this.mask + " val = " + val.toString(10) + ": " + val.toString(2) +
            " h = " + h.toString(2) +
            " lh=" + lh.toString(2) + " rh=" + rh.toString(2) +
            " newlh=" + newlh.toString(2) + " newrh=" + newrh.toString(2) +
            " newval=" + newval + ":" + newval.toString(2));
        return newval;
        // return (val & this.mask0s) | this.mask1s;
    },
    calcSum: function() {
        let sum = Object.values(this.mem)
            .reduce((accumulator, currentValue) => accumulator + currentValue);
        return sum;
    },
    exec(instruction) {
        let op = instruction.substr(0, 3);
        let eq = instruction.indexOf("=");
        if (op === 'mem') {
            let loc = parseInt(instruction.substr(4), 10);
            let val = parseInt(instruction.substr(eq + 1).trim());
            this.store(loc, val);
        } else {
            this.setMask(instruction.substr(eq + 1).trim());
        }
        this.opcount++;
    },
    setMask(m) {
        this.mask = m;
        this.maskLh = m.substr(0, 4);
        this.maskRh = m.substr(4);
        this.mask0Lh = parseInt(this.maskLh.replaceAll('X', '1'), 2);
        this.mask0Rh = parseInt(this.maskRh.replaceAll('X', '1'), 2);
        this.mask1Lh = parseInt(this.maskLh.replaceAll('X', '0'), 2);
        this.mask1Rh = parseInt(this.maskRh.replaceAll('X', '0'), 2);
        // this.mask1s = parseInt(m.replaceAll('X', '0'), 2);
        // log("mask=" + this.mask);
        // log("maskLh=" + this.maskLh + " mask0Lh=" + this.mask0Lh.toString(2) + " mask1Lh=" + this.mask1Lh.toString(2));
        // log("maskRh=" + this.maskRh + " mask0Rh=" + this.mask0Rh.toString(2) + " mask1Rh=" + this.mask1Rh.toString(2));
    },
    run: function(instructions) {
        this.reset();
        let a = stringToStringArrayNewline(instructions);
        for (let i = 0; i < a.length; i++) {
            this.exec(a[i]);
        }
    },
    solve: function() {
        this.run(readInput());

        writeOutput("The answer is: " + this.calcSum() +
            ".  There were " + this.opcount + " instructions.");
    },
    unitTest: function(ut) {
        const s = " T-y2020d14p1.";
        let td = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
        mem[8] = 11
        mem[7] = 101
        mem[8] = 0`;
        this.run(td);
        ut.test(s + "a1", this.calcSum() === 165);
        ut.test(s + "a2", this.opcount === 4);

        this.setMask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        ut.test(s + "b1a", this.masked(12) === 12);
        ut.test(s + "b1b", this.masked(0) === 0);
        // ut.test(s + "b1c", this.masked(-1) === -1);
        ut.test(s + "b2a1", this.mask0Lh === Math.pow(2, 4) - 1);
        // log("b2a this.mask0Lh =" + this.mask0Lh);
        // log("b2a this.mask0Rh =" + this.mask0Rh);
        ut.test(s + "b2a2a", this.mask0Rh === Math.pow(2, 32) - 1);
        ut.test(s + "b2a2b", this.mask0Lh === 15);
        ut.test(s + "b2b1", this.mask1Lh === 0);
        ut.test(s + "b2b2", this.mask1Rh === 0);
        ut.test(s + "b2c1", this.maskLh === 'XXXX');
        ut.test(s + "b2c2", this.maskRh === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        //12345678901234567890123456789012

        this.setMask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1');
        ut.test(s + "b3a", this.masked(0) === 1);
        ut.test(s + "b3b", this.masked(1) === 1);

        this.setMask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0');
        ut.test(s + "b4a", this.masked(0) === 0);
        ut.test(s + "b4b", this.masked(1) === 0);

        this.setMask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX10');
        ut.test(s + "b5a", this.masked(0) === 2);
        ut.test(s + "b5b", this.masked(1) === 2);
        ut.test(s + "b5c", this.masked(4) === 6);
        ut.test(s + "b5d", this.masked(5) === 6);
        ut.test(s + "b5e", this.masked(6) === 6);

        this.setMask('11XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1');
        ut.test(s + "b6a", this.masked(0) === 51539607553);
        // log("this.masked(0)=" + this.masked(0));


    },
};


problems.y2020d14p2 = {
    givenInputData: problems.y2020d14p1.givenInputData,
    mask: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    mem: {},
    opcount: 0,
    reset: function() {
        this.mem = {};
        this.opcount = 0;
    },
    store: function(loc, val) {
        let locs = this.expandX(this.masked(loc));
        for (let x of locs) this.mem[x] = val;
    },
    //Takes a string "s" and returns an array of strings with the 
    //Xs replaced with a 0 and a 1; or an array with just s if there are no Xs.
    expandX: function(s) {
        let a = [];
        if (s.indexOf('X') < 0) {
            a.push(s);
        } else {
            a.push(...this.expandX(s.replace('X', '0')));
            a.push(...this.expandX(s.replace('X', '1')));
        }
        return a;
    },
    //Return a string representation of value.
    masked: function(val) {
        let a = [];
        let newvalstring = "";
        let valstring = ('000000000000000000000000000000000000' + val.toString(2)).substr(-36);
        for (let i = 0; i < 36; i++) {
            let m = this.mask.substr(i, 1);
            if (m === '1') {
                newvalstring += '1';
            } else if (m === '0') {
                newvalstring += valstring.substr(i, 1);
            } else {
                newvalstring += 'X';
            }
        }
        return newvalstring;
    },
    calcSum: function() {
        let sum = Object.values(this.mem)
            .reduce((accumulator, currentValue) => accumulator + currentValue);
        return sum;
    },
    exec(instruction) {
        let op = instruction.substr(0, 3);
        let eq = instruction.indexOf("=");
        if (op === 'mem') {
            let loc = parseInt(instruction.substr(4), 10);
            let val = parseInt(instruction.substr(eq + 1).trim());
            this.store(loc, val);
        } else {
            this.setMask(instruction.substr(eq + 1).trim());
        }
        this.opcount++;
    },
    setMask(m) {
        this.mask = m;
    },
    run: function(instructions) {
        this.reset();
        let a = stringToStringArrayNewline(instructions);
        for (let i = 0; i < a.length; i++) {
            this.exec(a[i]);
        }
    },
    solve: function() {
        this.run(readInput());

        writeOutput("The answer is: " + this.calcSum() +
            ".  There were " + this.opcount + " instructions.");
    },
    unitTest: function(ut) {
        const s = " T-y2020d14p2.";
    },
};

problems.y2020d15p1 = {
    givenInputData: `16,1,0,18,12,14,19`,
    prevs: [],
    lastturn: -1,
    lastnum: -1,
    doturn: function() {
        //set up current turn.
        let turn = this.lastturn + 1;
        let considernum = this.lastnum;
        let newnum = -1;

        //Check memory for this turn's number.
        let n = this.prevs[considernum];
        if ((n === undefined) || (n === null)) {
            newnum = 0;
        } else {
            newnum = this.lastturn - n;
        }

        //put lastnum in memory.
        this.prevs[this.lastnum] = this.lastturn;

        this.lastturn = turn;
        this.lastnum = newnum;

    },
    loadstart: function(ns, t = 1000) {
        this.prevs = new Array(t + 10);
        let a = stringToIntArrayComma(ns);
        for (let i = 0; i < a.length - 1; i++) {
            this.prevs[a[i]] = i + 1;
        }
        this.lastturn = a.length;
        this.lastnum = a[a.length - 1];
    },
    doturns: function(ns, t) {
        this.loadstart(ns, t);
        while (this.lastturn < t) this.doturn();
        return this.lastnum;
    },
    solve: function() {
        writeOutput("The answer is: " + this.doturns(readInput(), 2020));
    },
    unitTest: function(ut) {
        const s = " T-y2020d15p1.";
        this.loadstart("0,1,2");
        ut.test(s + "a0", this.prevs[0] === 1);
        ut.test(s + "a1", this.prevs[1] === 2);
        // ut.test(s + "a2", this.prevs[2] === 3);
        // ut.test(s + "a3", this.prevs.length === 2);
        ut.test(s + "a4", this.lastnum === 2);
        ut.test(s + "a5", this.lastturn === 3);

        this.doturn();
        // ut.test(s + "b1", this.prevs.length === 3);
        ut.test(s + "b2", this.prevs[0] === 1);
        ut.test(s + "b3", this.lastturn === 4);
        ut.test(s + "b4", this.lastnum === 0);

        this.doturn();
        // ut.test(s + "c1", this.prevs.length === 3);
        ut.test(s + "c2", this.prevs[0] === 4);

        this.loadstart("0,3,6"); //0 3 6
        ut.test(s + "d0", this.prevs[0] === 1);
        ut.test(s + "d1", this.prevs[3] === 2);
        // ut.test(s + "d2", this.prevs.length === 4);
        ut.test(s + "d3", this.lastnum === 6);
        ut.test(s + "d4", this.lastturn === 3);

        this.doturn(); //0 3 6 0
        // ut.test(s + "e1", this.prevs.length === 7);
        ut.test(s + "e2", this.prevs[0] === 1);
        ut.test(s + "e3", this.prevs[6] === 3);
        ut.test(s + "e4", this.lastnum === 0);
        ut.test(s + "e5", this.lastturn === 4);

        this.doturn(); //0 3 6 0 3
        // ut.test(s + "f1", this.prevs.length === 7);
        ut.test(s + "f2", this.prevs[0] === 4);
        ut.test(s + "f3", this.lastnum === 3);
        ut.test(s + "f4", this.lastturn === 5);

        this.doturn();
        ut.test(s + "g1", this.lastnum === 3);
        ut.test(s + "g2", this.lastturn === 6);

        this.doturn();
        ut.test(s + "h1", this.lastnum === 1);
        ut.test(s + "h2", this.lastturn === 7);

        this.doturn();
        ut.test(s + "i1", this.lastnum === 0);
        ut.test(s + "i2", this.lastturn === 8);

        this.doturn();
        ut.test(s + "j1", this.lastnum === 4);
        ut.test(s + "j2", this.lastturn === 9);

        this.doturn();
        ut.test(s + "k1", this.lastnum === 0);
        ut.test(s + "k2", this.lastturn === 10);




        ut.test(s + "gg1", this.doturns('0,3,6', 2020) === 436);
        // ut.test(s + "gg2", this.doturns('1,3,2', 2020) === 1);
        // ut.test(s + "gg3", this.doturns('2,1,3', 2020) === 10);
        // ut.test(s + "gg4", this.doturns('1,2,3', 2020) === 27);
        // ut.test(s + "gg5", this.doturns('2,3,1', 2020) === 78);
        // ut.test(s + "gg6", this.doturns('3,2,1', 2020) === 438);
        // ut.test(s + "gg7", this.doturns('3,1,2', 2020) === 1836);

    },
};


problems.y2020d15p2 = {
    givenInputData: problems.y2020d15p1.givenInputData,
    solve: function() {
        writeOutput("The answer is: " + problems.y2020d15p1.doturns(readInput(), 30000000));
    },
    unitTest: function(ut) {
        const s = " T-y2020d15p2.";

        // ut.test(s + "gg1", problems.y2020d15p1.doturns('0,3,6', 3000000) === 175594);
        ut.test(s + "gg1", problems.y2020d15p1.doturns('0,3,6', 30000000) === 175594);
        // ut.test(s + "gg2", problems.y2020d15p1.doturns('1,3,2', 30000000) === 2578);
        // ut.test(s + "gg3", problems.y2020d15p1.doturns('2,1,3', 30000000) === 3544142);
        // ut.test(s + "gg4", problems.y2020d15p1.doturns('1,2,3', 30000000) === 261214);
        // ut.test(s + "gg5", problems.y2020d15p1.doturns('2,3,1', 30000000) === 6895259);
        // ut.test(s + "gg6", problems.y2020d15p1.doturns('3,2,1', 30000000) === 18);
        // ut.test(s + "gg7", problems.y2020d15p1.doturns('3,1,2', 30000000) === 362);
    },
};
class Rule {
    constructor(name, range1min, range1max, range2min, range2max) {
        this.name = name;
        this.range1min = range1min;
        this.range1max = range1max;
        this.range2min = range2min;
        this.range2max = range2max;
        this.canBeField = new Set();
        this.mustBeFieldName = "";
        this.mustBeFieldNum = -1;
        // log("NEW RULE:" + name + ":" +
        //     range1min + "-" + range1max +
        //     " " + range2min + "-" + range2max);
    }
    match(v) {
        if (isBetween(v, this.range1min, this.range1max)) return true;
        if (isBetween(v, this.range2min, this.range2max)) return true;
        return false;
    }
}
class Ticket {
    constructor(s) {
        this.fields = stringToIntArrayComma(s);
    }
    toString(names) {
        for (let i = 0; i < this.fields.length; i++) {

        }
    }
}
class Scanner {
    constructor() {
        this.rules = [];
        this.tickets = [];
        this.yourticket = null;
        this.fieldnames = [];
    }
    addRule(r) {
        this.rules.push(r);
    }
    isFieldValid(f) {
        for (let r of this.rules) {
            if (r.match(f)) return true;
        }
        return false;
    }
    isTicketValid(t) {
        for (let f of t.fields) {
            if (!this.isFieldValid(f)) {
                return false;
            }
        }
        return true;
    }
    sumInvalidFields() {
        let sum = 0;
        for (let t of this.tickets) {
            for (let f of t.fields) {
                if (!this.isFieldValid(f)) {
                    // log("INVALID FIELD:" + f);
                    sum += f;
                }
            }
        }
        return sum;
    }
    parseRule(rs) {
        let colon = rs.indexOf(":");
        let or = rs.substr(colon).indexOf("or") + colon;
        let hyphen1 = rs.indexOf("-");
        let hyphen2 = rs.substr(hyphen1 + 1).indexOf("-") + hyphen1 + 1;
        let name = rs.substring(0, colon).trim();
        let min1 = parseInt(rs.substr(colon + 1).trim());
        let max1 = parseInt(rs.substr(hyphen1 + 1).trim());
        let min2 = parseInt(rs.substr(or + 2).trim());
        let max2 = parseInt(rs.substr(hyphen2 + 1).trim());
        this.addRule(new Rule(name, min1, max1, min2, max2));
    }
    parseRules(rs) {
        let a = stringToStringArrayNewline(rs);
        for (let s of a) this.parseRule(s);
    }
    parseTicket(t) {
        this.tickets.push(new Ticket(t));
    }
    parseTickets(ts) {
        let a = stringToStringArrayNewline(ts);
        for (let s of a) this.parseTicket(s);
        this.removeInvalidTickets();
    }
    parseInput(s) {
        let yourticket = s.indexOf("your ticket:");
        let nearbytickets = s.indexOf("nearby tickets:");
        let rules = s.substring(0, yourticket);
        let yt = s.substring(yourticket + 12, nearbytickets - 1).trim();
        let nts = s.substr(nearbytickets + 15).trim();
        // log("rules=" + rules);
        // log("yt=" + yt);
        // log("nts=" + nts);
        this.parseRules(rules);
        this.yourticket = new Ticket(yt);
        this.parseTickets(nts);
    }
    removeInvalidTickets() {
        let valids = [];
        for (let t of this.tickets) {
            if (this.isTicketValid(t)) valids.push(t);
        }
        this.tickets = valids;
    }
    findAllowedFields() {
        for (let r of this.rules) {
            //Load all field numbers valid for your ticket.
            for (let i = 0; i < this.yourticket.fields.length; i++) {
                if (r.match(this.yourticket.fields[i])) {
                    // log("BEC YT rulename=" + r.name + " can be " + i);
                    r.canBeField.add(i);
                }
            }
        }
        // log("YT EVAL::" + this.toString());


        for (let r of this.rules) {
            // log("checking rulename=" + r.name);

            //Remove impossible field numbers.
            for (let h = 0; h < this.tickets.length; h++) {
                let t = this.tickets[h];
                for (let i = 0; i < t.fields.length; i++) {
                    // log("checking rulename=" + r.name +
                    //     " tic" + h + " field=" + i + " val=" + t.fields[i]);
                    if (!r.match(t.fields[i])) {
                        // log("BEC TIC" + h + " rulename=" + r.name + " cannot be " + i);
                        r.canBeField.delete(i);
                    }
                }
            }
        }
        // log("NTS EVAL::" + this.toString());
        return;
        // If rule can only apply to one field, 
        // remove that field from all other rule possible fields.
        let more = true;
        while (more) {
            more = false;
            for (let r of this.rules) {
                if (r.canBeField.size === 1) {
                    for (let f of r.canBeField) {
                        r.mustBeFieldNum = f;
                        r.mustBeFieldName = this.rules[f].name;
                        for (let rr of this.rules) {
                            if (r.name !== rr.name) {
                                log("deleting " + f + " from " + rr.name + " bec of " + r.name);
                                if (rr.canBeField.delete(f)) more = true;
                            }
                        }
                    }
                }
            }
        }
        log("RULE EVAL::" + this.toString());
    }
    calcd() {
        let m = 1;
        for (let r of this.rules) {
            if (r.name.startsWith("departure")) {
                // log("MULT name=" + r.name +
                //     " fieldnum=" + r.mustBeFieldNum + " val=" + this.yourticket[r.mustBeFieldNum]);
                m *= this.yourticket.fields[r.mustBeFieldNum];
            }
        }
        return m;
    }
    toString() {
        let s = "<BR/>SCANNER";
        for (let r of this.rules) {
            s += ("<BR/>rule=" + r.name);
            for (let f of r.canBeField) {
                s += ("<BR/>--field=" + f);
            }
        }
        return s + "<BR/>";
    }

    oldfindAllowedFields() {
        for (let i = 0; i < this.rules; i++) { //For all rules.
            let matchall = true;
            for (let j = 0; j < this.tickets; j++) { //For all tickets.
                for (let k = 0; k < this.tickets[j].length; k++) { //For all fields on the ticket.
                    //Set it to true if it's never been visited before.
                    if ((this.rules[i].canBeField[k] === null) ||
                        (this.rules[i].canBeField[k] === null)) {
                        this.rules[i].canBeField[k] = true;
                    }
                    //Set it to false if one of the fields will not match the rule.
                    if (!this.rules[i].match(this.tickets[j].fields[k])) {
                        this.rules[i].canBeField[k] = false;
                    }
                }
            }
        }
    }
}
problems.y2020d16p1 = {
    givenInputData: AOC_Input_Data.y2020d16p1,
    solve: function() {
        let s = readInput();
        let sc = new Scanner();
        sc.parseInput(s);

        writeOutput("The answer is: " + sc.sumInvalidFields());
    },
    unitTest: function(ut) {
        const s = " T-y2020d16p1.";
        let sc = new Scanner();
        sc.parseInput(`class: 1-3 or 5-7
        row: 6-11 or 33-44
        seat: 13-40 or 45-50
        
        your ticket:
        7,1,14
        
        nearby tickets:
        7,3,47
        40,4,50
        55,2,20
        38,6,12`);

        ut.test(s + "1", sc.sumInvalidFields() === 71);
    },
};


problems.y2020d16p2 = {
    givenInputData: problems.y2020d16p1.givenInputData,
    solve: function() {
        let s = readInput();

        // showArticle("Debug");
        let sc = new Scanner();
        sc.parseInput(s);
        sc.findAllowedFields();
        // log(sc.toString());
        writeOutput("The answer is: " + sc.calcd());
        /*CORRECT ANSWER CREATED HALF BY HAND  BECAUSE I'M TIRED OF DEBUGGING THIS PROBLEM:
rule=departure location
--field=13

rule=departure station
--field=10

rule=departure platform
--field=11

rule=departure track
--field=2

rule=departure date
--field=3

rule=departure time
--field=7

rule=arrival location
--field=18

rule=arrival station
--field=16

rule=arrival platform
--field=1

rule=arrival track
--field=5

rule=class
--field=4

rule=duration
--field=17

rule=price
--field=9


rule=route
--field=14

rule=row
--field=8

rule=seat
--field=12

rule=train
--field=0

rule=type
--field=15

rule=wagon
--field=6

rule=zone
--field=19

---

rule=departure location
--field=13  val=137

rule=departure station
--field=10 val=173

rule=departure platform
--field=11 val=61

rule=departure track
--field=2 val=59

rule=departure date
--field=3 val=79

rule=departure time
--field=7 val=73

137 * 173 * 61 * 59 * 79 * 73 = 491924517533

*/
    },
    unitTest: function(ut) {
        const s = " T-y2020d16p2.";
        let sc = new Scanner();
        sc.parseInput(`class: 0-1 or 4-19
        row: 0-5 or 8-19
        seat: 0-13 or 16-19
        
        your ticket:
        11,12,13
        
        nearby tickets:
        3,9,18
        15,1,5
        5,14,9`);
        sc.findAllowedFields();
        // log(sc.toString());
        // ut.test(s + "1", sc.sumInvalidFields() === 71);
    },
};

class AOC_gol4d {
    constructor() {
        this.clear();
    }
    clear() {
        this.matrix = new MatrixNdMap(4, ".");
    }
    load(s) {
        let a = stringToStringArrayNewline(s);
        this.clear();
        for (let y = 0; y < a.length; y++) {
            for (let x = 0; x < a[y].length; x++) {
                // log("x=" + x + " y=" + y + " char=" + a[y].charAt(x));
                this.matrix.set([x - Math.floor(a[y].length / 2), -(y - Math.floor(a.length / 2)), 0], a[y].charAt(x));
            }
        }
    }
    isCubeActive(coord) {
        let c = this.matrix.get(coord);
        return (c === '#');
    }
    adjacentCubesActive(coord) {
        let n = 0;
        this.forEachAdjacent(coord, (c) => {
            if (this.isCubeActive(c)) n++;
        });
        return n;
    }
    step(n = 1) {
        for (let i = 0; i < n; i++) this.stepone();
    }
    stepone() {
        let mm = new MatrixNdMap(4, ".");
        this.matrix.forEachCoordInCurrentRange((coord) => {
            //     "During a cycle, all cubes simultaneously change their state 
            // according to the following rules:
            // If a cube is active and exactly 2 or 3 of its neighbors are also 
            // active, the cube remains active. Otherwise, the cube becomes inactive.
            // If a cube is inactive but exactly 3 of its neighbors are active, 
            // the cube becomes active. Otherwise, the cube remains inactive." -AOC2020
            let c = this.matrix.get(coord);
            let n = this.adjacentCubesActive(coord);
            if (c === "#") { //Active
                if ((n === 2) || (n === 3)) {
                    mm.set(coord, "#");
                } else {
                    mm.set(coord, ".");
                }
            } else { //Inactive
                if (n === 3) {
                    mm.set(coord, "#");
                } else {
                    mm.set(coord, ".");
                }
            }
        }, 1);
        this.matrix = mm;
    }
    totalActiveCubes() {
        return this.matrix.totalSetTo("#");
    }
}

class AOC_gol3d {
    constructor() {
        this.matrix = new Matrix3d(1000, ".");
    }
    load(s) {
        let a = stringToStringArrayNewline(s);
        this.matrix = new Matrix3d(1000, ".");
        for (let y = 0; y < a.length; y++) {
            for (let x = 0; x < a[y].length; x++) {
                // log("x=" + x + " y=" + y + " char=" + a[y].charAt(x));
                this.matrix.set(x - Math.floor(a[y].length / 2), -(y - Math.floor(a.length / 2)), 0, a[y].charAt(x));
            }
        }
    }
    isCubeActive(x, y, z) {
        if (this.matrix.isOutOfBounds(x, y)) return false;
        let c = this.matrix.get(x, y, z);
        return (c === '#');
    }
    adjacentCubesActive(x, y, z) {
        let n = 0;
        for (let xx = x - 1; xx <= x + 1; xx++) {
            for (let yy = y - 1; yy <= y + 1; yy++) {
                for (let zz = z - 1; zz <= z + 1; zz++) {
                    if ((xx === x) && (yy === y) && (zz === z)) continue;
                    if (this.isCubeActive(xx, yy, zz)) n++;
                }
            }
        }
        return n;
    }
    step(n = 1) {
        for (let i = 0; i < n; i++) this.stepone();
    }
    stepone() {
        let mm = new Matrix3d();
        this.matrix.forEachXYZ((x, y, z, m) => {
            //     "During a cycle, all cubes simultaneously change their state 
            // according to the following rules:
            // If a cube is active and exactly 2 or 3 of its neighbors are also 
            // active, the cube remains active. Otherwise, the cube becomes inactive.
            // If a cube is inactive but exactly 3 of its neighbors are active, 
            // the cube becomes active. Otherwise, the cube remains inactive." -AOC2020
            let c = m.get(x, y, z);
            let n = this.adjacentCubesActive(x, y, z);
            if (c === "#") { //Active
                if ((n === 2) || (n === 3)) {
                    mm.set(x, y, z, "#");
                } else {
                    mm.set(x, y, z, ".");
                }
            } else { //Inactive
                if (n === 3) {
                    mm.set(x, y, z, "#");
                } else {
                    mm.set(x, y, z, ".");
                }
            }
        }, 1);
        this.matrix = mm;
    }

    totalActiveCubes() {
        let n = 0;
        this.matrix.forEachXYZ((x, y, z, m) => {
            if (this.isCubeActive(x, y, z)) n++;
        });
        return n;
    }

    totalActiveCubesWhereZis(Z) {
        let n = 0;
        this.matrix.forEachXYZ((x, y, z, m) => {
            if ((z === Z) && (this.isCubeActive(x, y, z))) n++;
        });
        return n;
    }
    logWhereZis(Z, size) {
        log("z=" + Z);
        for (let y = size; y >= -size; y--) {
            let xStr = "";
            for (let x = -size; x <= size; x++) {
                let c = this.matrix.get(x, y, Z);
                if (c === null) c = ".";
                if ((x === 0) && (y === 0)) {
                    if (c === ".") {
                        c = "o";
                    } else {
                        c = "*";
                    }
                }
                xStr += c;
            }
            log("<code>" + xStr + "</code>");
        }
    }
}

problems.y2020d17p1 = {
    givenInputData: AOC_Input_Data.y2020d17p1,
    solve: function() {
        let s = readInput();
        let gol = new AOC_gol3d();
        gol.load(s);
        gol.step(6);
        writeOutput("The answer is: " + gol.totalActiveCubes());
    },
    unitTest: function(ut) {
        const s = " T-y2020d17p1.";
        let d = `.#.
..#
###`;
        let gol = new AOC_gol3d();
        // log("Test Series a");
        gol.load(`.`);
        // gol.logWhereZis(0, 3);
        ut.test(s + "a1a", gol.totalActiveCubes() === 0);
        ut.test(s + "a1b", gol.adjacentCubesActive(0, 0, 0) === 0);
        gol.step();
        ut.test(s + "a2a", gol.totalActiveCubes() === 0);
        ut.test(s + "a2b", gol.adjacentCubesActive(0, 0, 0) === 0);

        // log("Test Series b");
        gol.load(`#`);
        // gol.logWhereZis(0, 3);
        ut.test(s + "b1a", gol.totalActiveCubes() === 1);
        ut.test(s + "b1b", gol.adjacentCubesActive(0, 0, 0) === 0);
        gol.step();
        ut.test(s + "b2a", gol.totalActiveCubes() === 0);
        ut.test(s + "b2b", gol.adjacentCubesActive(0, 0, 0) === 0);
        gol.step(10);
        ut.test(s + "b3a", gol.totalActiveCubes() === 0);
        ut.test(s + "b3b", gol.adjacentCubesActive(0, 0, 0) === 0);

        // log("Test Series bb");
        gol.load(`###\n###\n###`);
        // gol.logWhereZis(0, 3);
        ut.test(s + "bb1a", gol.totalActiveCubes() === 9);
        ut.test(s + "bb1b", gol.adjacentCubesActive(0, 0, 0) === 8);
        ut.test(s + "bb1c", gol.adjacentCubesActive(1, 1, 0) === 3);
        ut.test(s + "bb1d", gol.adjacentCubesActive(0, 1, 0) === 5);
        ut.test(s + "bb1e", gol.isCubeActive(1, 1, 0));
        ut.test(s + "bb1f", gol.isCubeActive(0, 1, 0));
        gol.step();
        // gol.logWhereZis(0, 3);

        // log("Test Series c");
        gol.load(d);
        // gol.logWhereZis(0, 3);
        ut.test(s + "c1a", gol.totalActiveCubes() === 5);
        ut.test(s + "c1b", gol.totalActiveCubesWhereZis(0) === 5);
        ut.test(s + "c1c", gol.totalActiveCubesWhereZis(1) === 0);
        ut.test(s + "c1d", gol.adjacentCubesActive(0, 0, 0) === 5);
        ut.test(s + "c1e", !gol.isCubeActive(0, 0, 0));
        ut.test(s + "c1e", gol.isCubeActive(1, 0, 0));
        ut.test(s + "c1ff1", gol.isCubeActive(0, 1, 0));
        // log("c1ff2:adjacentCubesActive=" + gol.adjacentCubesActive(0, 1, 0));
        ut.test(s + "c1ff2", gol.adjacentCubesActive(0, 1, 0) === 1);
        gol.step();
        // gol.logWhereZis(-1, 3);
        // gol.logWhereZis(0, 3);
        // gol.logWhereZis(1, 3);
        ut.test(s + "c2a", gol.totalActiveCubes() === 11);
        ut.test(s + "c2b-1", gol.totalActiveCubesWhereZis(-1) === 3);
        ut.test(s + "c2b0", gol.totalActiveCubesWhereZis(0) === 5);
        ut.test(s + "c2b1", gol.totalActiveCubesWhereZis(1) === 3);
        ut.test(s + "c2ff1", !gol.isCubeActive(0, 1, 0));
        // log("c2ff2:adjacentCubesActive=" + gol.adjacentCubesActive(0, 1, 0));
        ut.test(s + "c2ff2", gol.adjacentCubesActive(0, 1, 0) === 4);




        gol.load(d);
        gol.step(6);
        ut.test(s + "z1", gol.totalActiveCubes() === 112);
    },
};


problems.y2020d17p2 = {
    givenInputData: problems.y2020d17p1.givenInputData,
    solve: function() {
        let s = readInput();
        let gol = new AOC_gol4d();
        gol.load(s);
        gol.step(6);
        writeOutput("The answer is: " + gol.totalActiveCubes());

    },
    unitTest: function(ut) {
        const s = " T-y2020d17p2.";
        ut.test(s + "1", 1 === 1);
    },
};

problems.y2020d18p1 = {
    givenInputData: ``,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d18p1.";
        ut.test(s + "1", 1 === 1);
    },
};


problems.y2020d18p2 = {
    givenInputData: problems.y2020d18p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d18p2.";
        ut.test(s + "1", 1 === 1);
    },
};

problems.y2020d19p1 = {
    givenInputData: ``,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d19p1.";
        ut.test(s + "1", 1 === 1);
    },
};


problems.y2020d19p2 = {
    givenInputData: problems.y2020d19p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d19p2.";
        ut.test(s + "1", 1 === 1);
    },
};

problems.y2020d20p1 = {
    givenInputData: ``,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d20p1.";
        ut.test(s + "1", 1 === 1);
    },
};


problems.y2020d20p2 = {
    givenInputData: problems.y2020d20p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d20p2.";
        ut.test(s + "1", 1 === 1);
    },
};

problems.y2020d21p1 = {
    givenInputData: ``,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d21p1.";
        ut.test(s + "1", 1 === 1);
    },
};


problems.y2020d21p2 = {
    givenInputData: problems.y2020d21p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d21p2.";
        ut.test(s + "1", 1 === 1);
    },
};

problems.y2020d22p1 = {
    givenInputData: ``,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d22p1.";
        ut.test(s + "1", 1 === 1);
    },
};


problems.y2020d22p2 = {
    givenInputData: problems.y2020d22p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d22p2.";
        ut.test(s + "1", 1 === 1);
    },
};

problems.y2020d23p1 = {
    givenInputData: ``,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d23p1.";
        ut.test(s + "1", 1 === 1);
    },
};


problems.y2020d23p2 = {
    givenInputData: problems.y2020d23p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d23p2.";
        ut.test(s + "1", 1 === 1);
    },
};

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `${this.x},${this.y}`;
    }
    go(d) {
        // if (d.indexOf('e') >= 0) this.x++;
        // if (d.indexOf('w') >= 0) this.x--;
        // if (d.indexOf('n') >= 0) this.y++;
        // if (d.indexOf('s') >= 0) this.y--;
        if (d === 'e') this.x++;
        if (d === 'w') this.x--;
        if (d === 'n') this.y++;
        if (d === 's') this.y--;
    }
    goAllHex(ds) {
        ds = ds.replaceAll("e", "_e");
        ds = ds.replaceAll("w", "_w");
        ds = ds.replaceAll("n_e", "ne");
        ds = ds.replaceAll("s_e", "se");
        ds = ds.replaceAll("n_w", "nw");
        ds = ds.replaceAll("s_w", "sw");
        ds = ds.replaceAll("_w", "ww");
        ds = ds.replaceAll("_e", "ee");

        for (let i = 0; i < ds.length; i++) {
            this.go(ds[i]);
        }
    }
}
class Hexgrid extends Matrix2d {
    constructor() {
        super(1000, false);
    }
    // get(x, y) {
    //     let key = (new Coord(x, y)).toString();
    //     log("getting:" + key);
    //     if (!this.values.get(key)) {
    //         return false;
    //     }
    //     log("get:" + x + "," + y + " val=" + this.values[key]);
    //     return this.values.get(key);
    // }

    // set(x, y, v) {
    //     log("setting " + x + "," + y + " to " + v);
    //     let k = new Coord(x, y);
    //     if (x < this.minx) this.minx = x;
    //     if (y < this.miny) this.miny = y;
    //     if (x > this.maxx) this.maxx = x;
    //     if (y > this.maxy) this.maxy = y;
    //     this.values.set(k.toString(), v);
    // }
    flip(coord) {
        this.set(coord.x, coord.y, !this.get(coord.x, coord.y));
        // let key = coord.toString();
        // if (!this.values[key]) {
        //     this.values[key] = true;
        // } else {
        //     this.values[key] = false;
        // }
    }
    countAll(v) {
        // let vals = Object.values(this.values);
        let count = 0;
        this.forEachXY((x, y, matrix) => {
            if (this.get(x, y)) count++;
        });
        // for (let i = 0; i < vals.length; i++) {
        //     if (vals[i] === v) count++;
        // }
        return count;
    }
    isValidCoord(x, y) {
        //Both x and y must be even or odd.
        return ((x + y) % 2 === 0);
    }
    countAdjacent(x, y, v) {
        let count = 0;
        if (this.get(x + 2, y) === v) count++;
        if (this.get(x + 1, y + 1) === v) count++;
        if (this.get(x + 1, y - 1) === v) count++;
        if (this.get(x - 2, y) === v) count++;
        if (this.get(x - 1, y + 1) === v) count++;
        if (this.get(x - 1, y - 1) === v) count++;
        // log("adj to " + x + "," + y + " are " + count + " of " + v);
        return count;
    }
    nextVal(x, y) {
        let t = this.get(x, y);
        let blacks = this.countAdjacent(x, y, true);
        if (t === true) { //black tile
            if ((blacks === 0) || (blacks > 2)) {
                return false;
            } else {
                return true;
            }
        } else { //white tile
            if (blacks === 2) {
                return true;
            } else {
                return false;
            }
        }
    }
    step() {
        let hg2 = new Hexgrid();
        this.forEachXY((x, y, matrix) => {
            if ( /*this.isValidCoord(x, y)*/ true) {
                let t = this.get(x, y);
                let blacks = this.countAdjacent(x, y, true);
                if (t === true) { //black tile
                    if ((blacks === 0) || (blacks > 2)) {
                        hg2.set(x, y, false);
                    } else {
                        hg2.set(x, y, t);
                    }
                } else { //white tile
                    if (blacks === 2) {
                        hg2.set(x, y, true);
                    } else {
                        hg2.set(x, y, t);
                    }
                }
            }
        }, 2);
        return hg2;
    }
    load(flips) {
        for (let i = 0; i < flips.length; i++) {
            let c = new Coord(0, 0);
            c.goAllHex(flips[i]);
            this.flip(c);
        }
    }
    // logGrid(){
    //     this.forEachXY((x, y, matrix) => {
    //         let s="";
    //         if (this.isValidCoord(x, y)) {
    // }
};
problems.y2020d24p1 = {
    givenInputData: AOC_Input_Data.y2020d24p1,
    solve: function() {
        //Note: for the Hexgrid, black is true and white is false.
        let hg = new Hexgrid();
        let flips = stringToStringArrayNewline(readInput());
        hg.load(flips);

        writeOutput("The answer is: " + hg.countAll(true));
    },
    unitTest: function(ut) {
        const s = " T-y2020d24p1.";
        let c = new Coord(0, 0);
        ut.test(s + "c1", c.toString() === "0,0");
        c.goAllHex("w");
        ut.test(s + "c2", c.toString() === "-2,0");
        c.goAllHex("wensne");
        ut.test(s + "c3", c.toString() === "-1,1");

        let hg = new Hexgrid();
        ut.test(s + "h1", hg.countAll(true) === 0);
        hg.flip(c);
        ut.test(s + "h2", hg.countAll(true) === 1);
        hg.flip(c);
        ut.test(s + "h3", hg.countAll(true) === 0);


    },
};


problems.y2020d24p2 = {
    givenInputData: problems.y2020d24p1.givenInputData,
    solve: function() {
        //Note: for the Hexgrid, black is true and white is false.
        let hg = new Hexgrid();
        let flips = stringToStringArrayNewline(readInput());
        hg.load(flips);
        for (let d = 1; d < 101; d++) hg = hg.step();


        writeOutput("The answer is: " + hg.countAll(true));
    },
    unitTest: function(ut) {
        const s = " T-y2020d24p2.";
        let c = new Coord(0, 0);
        let hg = new Hexgrid();
        ut.test(s + "h1", hg.countAll(true) === 0);
        hg.flip(c);
        ut.test(s + "h2", hg.countAll(true) === 1);
        ut.test(s + "h3", hg.countAdjacent(0, 0, true) === 0);
        ut.test(s + "h3b", hg.countAdjacent(2, 0, true) === 1);
        c.goAllHex("e");
        hg.flip(c);
        ut.test(s + "h4", hg.get(2, 0) === true);
        hg.set(-2, 0, true);
        ut.test(s + "h5", hg.get(-2, 0) === true);
        ut.test(s + "h6", hg.countAdjacent(0, 0, true) === 2);
        ut.test(s + "h7", hg.countAll(true) === 3);
        ut.test(s + "h8", hg.countAdjacent(1, 1, true) === 2);
        ut.test(s + "h9", hg.countAdjacent(-1, 1, true) === 2);
        hg.set(1, 1, true);
        ut.test(s + "h10", hg.countAdjacent(0, 0, true) === 3);
        hg.set(-1, 1, true);
        hg.set(1, -1, true);
        hg.set(-1, -1, true);
        ut.test(s + "h11", hg.countAdjacent(0, 0, true) === 6);
        ut.test(s + "h12", hg.countAll(true) === 7);
        ut.test(s + "h12b", hg.nextVal(0, 0) === false);
        hg = hg.step();
        // log("h13:" + hg.countAll(true));
        ut.test(s + "h13", hg.countAll(true) === 6);


        let ss = `sesenwnenenewseeswwswswwnenewsewsw
        neeenesenwnwwswnenewnwwsewnenwseswesw
        seswneswswsenwwnwse
        nwnwneseeswswnenewneswwnewseswneseene
        swweswneswnenwsewnwneneseenw
        eesenwseswswnenwswnwnwsewwnwsene
        sewnenenenesenwsewnenwwwse
        wenwwweseeeweswwwnwwe
        wsweesenenewnwwnwsenewsenwwsesesenwne
        neeswseenwwswnwswswnw
        nenwswwsewswnenenewsenwsenwnesesenew
        enewnwewneswsewnwswenweswnenwsenwsw
        sweneswneswneneenwnewenewwneswswnese
        swwesenesewenwneswnwwneseswwne
        enesenwswwswneneswsenwnewswseenwsese
        wnwnesenesenenwwnenwsewesewsesesew
        nenewswnwewswnenesenwnesewesw
        eneswnwswnwsenenwnwnwwseeswneewsenese
        neswnwewnwnwseenwseesewsenwsweewe
        wseweeenwnesenwwwswnew`;
        let flips = stringToStringArrayNewline(ss);
        hg = new Hexgrid();
        hg.load(flips);
        ut.test(s + "hh0", hg.countAll(true) === 10);
        hg = hg.step();
        ut.test(s + "hh1", hg.countAll(true) === 15);
        hg = hg.step();
        ut.test(s + "hh2", hg.countAll(true) === 12);
    },
};

problems.y2020d25p1 = {
    givenInputData: ``,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d25p1.";
        ut.test(s + "1", 1 === 1);
    },
};


problems.y2020d25p2 = {
    givenInputData: problems.y2020d25p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-y2020d25p2.";
        ut.test(s + "1", 1 === 1);
    },
};