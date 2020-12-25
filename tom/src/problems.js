let problems = {};

problems.d1p1 = {
    givenInputData: AOC_Input_Data.d1p1,

    solve: function() {
        let a = stringToIntArrayNewline(readInput());
        writeOutput("The answer is:" + this.docalc(a));
    },
    unitTest: function(ut) {
        const s = " T-d1p1.";
        this.docalc([1721, 979, 366, 299, 675, 1456]) == 514579 ?
            ut.p++
            :
            (ut.f += s + "td1");
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

problems.d1p2 = {
    givenInputData: problems.d1p1.givenInputData,
    solve: function() {
        let u = readInput();
        let a = u.split(/\r?\n/);
        a.forEach(function(e, i, a) {
            a[i] = parseInt(e.trim());
        });
        writeOutput("The answer is:" + this.docalc(a));
    },
    unitTest: function(ut) {
        const s = " T-d1p1.";
        this.docalc([1721, 979, 366, 299, 675, 1456]) == 241861950 ?
            ut.p++
            :
            (ut.f += s + "td2");
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

problems.d2p1 = {
    givenInputData: AOC_Input_Data.d2p1,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let valid = 0;
        for (let i = 0; i < a.length; i++) {
            if (this.ckpw(a[i])) valid++;
        }
        writeOutput("The answer is:" + valid);
    },
    unitTest: function(ut) {
        const s = " T-d2p1.";
        let x = this.parseRow("3-4 j: tjjj");
        x.min == 3 ? ut.p++ : (ut.f += s + "1");
        x.max == 4 ? ut.p++ : (ut.f += s + "2");
        x.char == "j" ? ut.p++ : (ut.f += s + "3");
        x.pw == "tjjj" ? ut.p++ : (ut.f += s + "4");
        this.countchar("tjjj", "t") == 1 ? ut.p++ : (ut.f += s + "5");
        this.countchar("tjjj", "j") == 3 ? ut.p++ : (ut.f += s + "6");
        this.countchar("t dd jjddj", "d") == 4 ? ut.p++ : (ut.f += s + "7");

        this.ckpw("1-3 a: abcde") ? ut.p++ : (ut.f += s + "8");
        !this.ckpw("1-3 b: cdefg") ? ut.p++ : (ut.f += s + "9");
        this.ckpw("2-9 c: ccccccccc") ? ut.p++ : (ut.f += s + "10");
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

problems.d2p2 = {
    givenInputData: problems.d2p1.givenInputData,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let valid = 0;
        for (let i = 0; i < a.length; i++) {
            if (this.ckpw(a[i])) valid++;
        }
        writeOutput("The answer is:" + valid);
    },
    unitTest: function(ut) {
        const s = " T-d2p2.";

        this.ckpw("1-3 a: abcde") ? ut.p++ : (ut.f += s + "8");
        !this.ckpw("1-3 b: cdefg") ? ut.p++ : (ut.f += s + "9");
        !this.ckpw("2-9 c: ccccccccc") ? ut.p++ : (ut.f += s + "10");
    },
    ckpw(s) {
        let x = problems.d2p1.parseRow(s);
        let count = 0;
        if (x.pw[x.min - 1] == x.char) count++;
        if (x.pw[x.max - 1] == x.char) count++;
        return count == 1;
    },
};

problems.d3p1 = {
    givenInputData: AOC_Input_Data.d3p1,
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
        const s = " T-d3p1.";

        this.treeHit("..#...#", 2) ? ut.p++ : (ut.f += s + "1");
        this.treeHit("..#...#", 6) ? ut.p++ : (ut.f += s + "2");
        this.treeHit("..#...#", 9) ? ut.p++ : (ut.f += s + "3");
        !this.treeHit("..#...#", 1) ? ut.p++ : (ut.f += s + "4");
    },
    treeHit: function(row, x) {
        return "#" == row[x % row.length];
    },
};

problems.d3p2 = {
    givenInputData: problems.d3p1.givenInputData,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let hits = 0;
        let m = 1;
        let x = 0;
        //Right 1, down 1.
        for (let i = 0; i < a.length; i++) {
            if (problems.d3p1.treeHit(a[i], x)) hits++;
            x += 1;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        //Right 3, down 1.
        x = 0;
        hits = 0;
        for (let i = 0; i < a.length; i++) {
            if (problems.d3p1.treeHit(a[i], x)) hits++;
            x += 3;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        //Right 5, down 1.
        x = 0;
        hits = 0;
        for (let i = 0; i < a.length; i++) {
            if (problems.d3p1.treeHit(a[i], x)) hits++;
            x += 5;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        //Right 7, down 1.
        x = 0;
        hits = 0;
        for (let i = 0; i < a.length; i++) {
            if (problems.d3p1.treeHit(a[i], x)) hits++;
            x += 7;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        //Right 1, down 2.
        x = 0;
        hits = 0;
        for (let i = 0; i < a.length; i += 2) {
            if (problems.d3p1.treeHit(a[i], x)) hits++;
            x += 1;
        }
        m = m * hits;
        log("hits=" + hits + ". m=" + m);

        writeOutput("The answer is: " + m);
    },
    unitTest: function(ut) {
        const s = " T-d3p2.";

        1 == 1 ? ut.p++ : (ut.f += s + "10");
    },
};

problems.d4p1 = {
    givenInputData: ``,
    solve: function() {
        let s = readInput();
        let a = this.recsToArray(s);

        writeOutput("The answer is: " + this.totalValid(a));
    },
    unitTest: function(ut) {
        const s = " T-d4p1.";

        let a = this.recsToArray(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`);

        a[0].ecl == "gry" ? ut.p++ : (ut.f += s + "1");
        a[0].hgt == "183cm" ? ut.p++ : (ut.f += s + "2");

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

        a[0].ecl == "gry" ? ut.p++ : (ut.f += s + "3");
        a[0].hgt == "183cm" ? ut.p++ : (ut.f += s + "4");
        a[1].ecl == "amb" ? ut.p++ : (ut.f += s + "5");
        a[2].hcl == "#ae17e1" ? ut.p++ : (ut.f += s + "6");
        a[2].ecl == "brn" ? ut.p++ : (ut.f += s + "7");
        a[3].hgt == "59in" ? ut.p++ : (ut.f += s + "8");
        this.isValid(a[0]) ? ut.p++ : (ut.f += s + "9");
        !this.isValid(a[1]) ? ut.p++ : (ut.f += s + "10");
        this.isValid(a[2]) ? ut.p++ : (ut.f += s + "11");
        !this.isValid(a[3]) ? ut.p++ : (ut.f += s + "12");
        this.totalValid(a) == 2 ? ut.p++ : (ut.f += s + "13");
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

problems.d4p2 = {
    givenInputData: problems.d4p1.givenInputData,
    solve: function() {
        let s = readInput();
        let a = problems.d4p1.recsToArray(s);

        // for (let i = 0; i < a.length; i++) {
        //   log(this.recToString(a[i]));
        // }

        writeOutput("The answer is: " + this.totalValid(a));
    },
    unitTest: function(ut) {
        const s = " T-d4p2.";
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
        let a = problems.d4p1.recsToArray(x);
        !this.isValid(a[0]) ? ut.p++ : (ut.f += s + "1");
        !this.isValid(a[1]) ? ut.p++ : (ut.f += s + "2");
        !this.isValid(a[2]) ? ut.p++ : (ut.f += s + "3");
        !this.isValid(a[3]) ? ut.p++ : (ut.f += s + "4");

        x = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
                                  hcl:#623a2f

                                  eyr:2029 ecl:blu cid:129 byr:1989
                                  iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

                                  hcl:#888785
                                  hgt:164cm byr:2001 iyr:2015 cid:88
                                  pid:545766238 ecl:hzl
                                  eyr:2022

                                  iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;
        a = problems.d4p1.recsToArray(x);

        this.isValid(a[0]) ? ut.p++ : (ut.f += s + "v1");
        this.isValid(a[1]) ? ut.p++ : (ut.f += s + "v2");
        this.isValid(a[2]) ? ut.p++ : (ut.f += s + "v3");
        this.isValid(a[3]) ? ut.p++ : (ut.f += s + "v4");

        ut.test(s + "lfp1", this.hasExtraProperty({
            x: 0
        }));
        ut.test(s + "lfp2", !this.hasExtraProperty({
            byr: 0
        }));
        // let failed = false;
        // a = problems.d4p1.recsToArray(this.givenInputData);
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

problems.d5p1 = {
    givenInputData: AOC_Input_Data.d5p1,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        let hi = 0;
        for (let i = 0; i < a.length; i++) {
            if (this.seatId(a[i]) > hi) hi = this.seatId(a[i]);
        }

        writeOutput("The answer is: " + hi);
    },
    unitTest: function(ut) {
        const s = " T-d5p1.";

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

problems.d5p2 = {
    givenInputData: problems.d5p1.givenInputData,
    solve: function() {
        let a = stringToStringArrayNewline(readInput());
        a.forEach((v, i, a) => (a[i] = problems.d5p1.seatId(v)));
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
        const s = " T-d5p2.";

        1 == 1 ? ut.p++ : (ut.f += s + "10");
    },
};

problems.d6p1 = {
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
        const s = " T-d6p1.";

        1 == 1 ? ut.p++ : (ut.f += s + "1");
    },
};

problems.d6p2 = {
    givenInputData: problems.d6p1.givenInputData,
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
        const s = " T-d6p2.";

        1 == 1 ? ut.p++ : (ut.f += s + "10");

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

class Matrix2d {
    constructor() {
        this.matrix = [];
    }
    get(x, y) {
        if (this.matrix[x] === undefined) this.matrix[x] = [];
        if (this.matrix[x] === null) this.matrix[x] = [];
        if (this.matrix[x][y] === undefined) this.matrix[x][y] = null;
        return this.matrix[x][y];
    }
    set(x, y, value) {
        this.get(x, y); //used to ensure slot is alotted.
        this.matrix[x][y] = value;
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

problems.d7p1 = {
    givenInputData: AOC_Input_Data.d7p1,
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
        const s = " T-d7p1.";

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

problems.d7p2 = {
    givenInputData: problems.d7p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-d7p2.";

        ut.test(s + "10", 1 == 1);
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
problems.d8p1 = {
    givenInputData: ``,
    solve: function() {
        let p = new Puter();
        p.loadProgram(readInput());
        p.runProgram();

        writeOutput("The answer is: " + p.accumulator);
        log('pc=' + p.pc + ', accumulator=' + p.accumulator);
    },
    unitTest: function(ut) {
        const s = " T-d8p1.";

        1 == 1 ? ut.p++ : (ut.f += s + "1");
    },
};

problems.d8p2 = {
    givenInputData: problems.d8p1.givenInputData,
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
        const s = " T-d8p2.";

        ut.test(s + "10", 1 == 1);
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

problems.d9p1 = {
    givenInputData: ``,
    solve: function() {
        let xnl = new XmasNumList(25);
        xnl.load(readInput());
        let fi = xnl.findFirstInvalid();
        writeOutput("The answer is: " + xnl.nums[fi] + ' and the weakness is ' + xnl.findWeakness(xnl.nums[fi]));
    },
    unitTest: function(ut) {
        const s = " T-d9p1.";
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

problems.d9p2 = {
    givenInputData: problems.d9p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-d9p2.";

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
    //Calc the max number of paths for sequence frm 0 to n.
    maxPathsData = [1, 1, 2]; //Used for memoization.
    maxPaths(n) {
        // if (n === 0) return 1;
        // if (n === 1) return 1;
        // if (n === 2) return 2;
        if (this.maxPathsData[n]) return this.maxPathsData[n];
        let mp = this.maxPaths(n - 1) + this.maxPaths(n - 2) + this.maxPaths(n - 3);
        this.maxPathsData[n] = mp;
        return mp;
    }
    numHoles() {
        if (this.nums.length <= 1) return 0;
        let current = this.nums[0];
        let missing = 0;
        for (let i = 1; i < this.nums.length; i++) {
            missing += this.nums[i] - (current + 1);
            current = this.nums[i];
        }
        return missing;
    }
    calcPaths6() {
        let contiguousSizes = [];
        let holeSizes = [];
        let wasAdapter = true;
        let runSize = 0;
        for (let n = 0; n <= this.nums[this.nums.length - 1]; n++) {
            let isAdapter = this.nums.includes(n);
            if (isAdapter !== wasAdapter) {
                if (wasAdapter) {
                    contiguousSizes.push(runSize);
                } else {
                    holeSizes.push(runSize);
                }
                runSize = 1;
                wasAdapter = isAdapter;
            } else {
                runSize++;
            }
        }
        contiguousSizes.push(runSize - 1);
        // log("holeSizes.length=" + holeSizes.length);
        // for (let x = 0; x < holeSizes.length; x++) {
        //     log("x=" + x + " hs=" + holeSizes[x]);
        // }
        // log("contiguousSizes.length=" + contiguousSizes.length);
        // for (let x = 0; x < contiguousSizes.length; x++) {
        //     log("x=" + x + " cs=" + contiguousSizes[x]);
        // }
        let currentRegion = 0;
        let p = this.maxPaths(contiguousSizes[0]);
        for (let i = 1; i < contiguousSizes.length; i++) {
            if (holeSizes[i - 1] > 2) return 0; //no paths possible thru a gap this size.
            if (holeSizes[i - 1] === 1) {
                if (contiguousSizes[i - 1] > 1 && contiguousSizes[i] > 1) {
                    p *= 3;
                } else if (contiguousSizes[i - 1] > 1 || contiguousSizes[i] > 1) {
                    p *= 2;
                }
            }
            p *= this.maxPaths(contiguousSizes[i]);

        }
        return p;
    }
    calcPaths5() {
        let max = this.nums[this.nums.length - 1];
        return this.maxPaths(max);
    }
    calcPaths2() {
        let max = this.nums[this.nums.length - 1];
        return this.maxPaths(max) / Math.pow(2, this.numHoles());
    }
    calcPaths3() {
        return Math.pow(2, this.nums[this.nums.length - 1] - this.numHoles() - 1);
    }
    calcPaths4(n) {
        return -603;
        if (n === 0) return 1;
        if (n === 1) return 1;
        if (n === 2) return 2;
        return this.calcPaths4(n - 1) + this.calcPaths4(n - 2) + this.calcPaths4(n - 3);
    }
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
problems.d10p1 = {
    givenInputData: AOC_Input_Data.d10p1,
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
        const s = " T-d10p1.";
        let ac = new AdChain();
        ac.load(this.td1);
        ut.test(s + "1", ac.calc1() === 35);
        ac.load(this.td2);
        ut.test(s + "2", ac.calc1() === 220);
    },
};

problems.d10p2 = {
    givenInputData: problems.d10p1.givenInputData,
    solve: function() {
        let ac = new AdChain();
        ac.load(readInput());

        writeOutput("The answer is: " + ac.calcPaths());
    },
    unitTest: function(ut) {
        const s = " T-d10p2.";
        let ac = new AdChain();
        ac.load(problems.d10p1.td1);
        ut.test(s + "1b", ac.calcPaths() === 8);
        ut.test(s + "1b6", ac.calcPaths6() === 8);
        // ut.test(s + "1b2", ac.calcPaths2() === 8);
        // ut.test(s + "1b3", ac.calcPaths3() === 8);
        // ut.test(s + "1b4", ac.numHoles() === 10);
        log('1b ac.calcPaths()=' + ac.calcPaths());
        log('1b6 ac.calcPaths6()=' + ac.calcPaths6());
        // log('1b2 ac.calcPaths2()=' + ac.calcPaths2());
        // log('1b2 ac.calcPaths3()=' + ac.calcPaths3());
        // log('1b2 ac.calcPaths3()=' + ac.calcPaths3());
        // log('1b3 ac.calcPaths4()=' + ac.calcPaths4());
        // log('1b4 ac.numHoles()=' + ac.numHoles());
        ac.load(problems.d10p1.td2);
        log('2b ac.calcPaths()=' + ac.calcPaths());
        ut.test(s + "2b", ac.calcPaths() === 19208);
        // ut.test(s + "2b2", ac.calcPaths2() === 19208);



        let ac2 = new AdChain();
        for (let i = 0; i <= 50; i++) {
            ac2.nums.push(i);
            // log("i=" + i + " paths=" + ac2.calcPaths() + " paths2=" + ac2.calcPaths2());
            log("i=" + i + " paths=" + ac2.calcPaths() + " paths6=" + ac2.calcPaths6());
            // log("i=" + i + " paths6=" + ac2.calcPaths6());
        }

        let td = "1";
        ac.loadX(td);
        log("***maxa=1 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n2";
        ac.loadX(td);
        log("***maxa=2 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n4";
        ac.loadX(td);
        log("***maxa=3 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n5";
        ac.loadX(td);
        log("***maxa=4 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n6";
        ac.loadX(td);
        log("***maxa=5 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n7";
        ac.loadX(td);
        log("***maxa=6 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

        td += "\n10";
        ac.loadX(td);
        log("***maxa=7 paths6=" + ac.calcPaths6() + " paths=" + ac.calcPaths());

    },
};

problems.d11p1 = {
    givenInputData: ``,
    solve: function() {
        stringToStringArrayNewline(readInput());

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-d11p1.";

        1 == 1 ? ut.p++ : (ut.f += s + "1");
    },
};

problems.d11p2 = {
    givenInputData: problems.d9p1.givenInputData,
    solve: function() {
        readInput();

        writeOutput("The answer is: TBD");
    },
    unitTest: function(ut) {
        const s = " T-d11p2.";

        ut.test(s + "11", 1 == 1);
    },
};