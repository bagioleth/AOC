problems.y2021d1p1.solve = function() {
    let a = stringToIntArrayNewline(readInput());
    if (a.length < 2) {
        writeOutput("There are too few inputs.");
        return;
    }
    let count = 0;
    let current = a[0];
    for (let i = 1; i < a.length; i++) {
        if (a[i] > current) {
            count++;
        }
        current = a[i];
    }

    writeOutput("The answer is: " + count);
}