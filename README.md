# AOC
Tom's Solutions to the Advent of Code (TSAOC)

BUILD INSTRUCTIONS
This project requires Node.js to build.
From a command window in the top-level folder type:
node build.js
The build system will produce a "TSAOC.html" file in the bld folder.
This file is self-contained:  it contains all the html, javascript, and data needed.

DESIGN
The aoc folder contains copies of the html and data from the Advent of Code website.
The file fomat is y<year>d<day>p<part>.<html or dat>.
The src folder contains the source code used to create the TSAOC.html file.
The TCAOC.html file contains all the html, javascript, and data needed to present and solve the Advent of Code problems.
The build.js constructs the TSAOC.html file from the files in the aoc and src folders.

build.js depends (via the require statement) on the following:
fs -- javascripts filesystem API.
src/ydp.js -- exporting some static functions for handling the year-day-part problem ids.

TSAOC is self-contained.  It contains the contents of following files verbatim:
src/style.css -- the style sheet used for the html page.
src/ydp.js
src/tool.js
src/classes.js
src/problems.js -- contains the code that solves each AOC problem.

It also incorporates the contents of following files, processed by the build system to become internal datastructures and html elements.
aoc/*.html -- used for the article problem descriptions.
aoc/*.dat -- used for the problem data.


USAGE
After running the build, open the TSAOC.html file in a browser.  
Click on Menu and select the problem to run.
Read the problem description in the top part of the window.  
Enter your own data in the bottom part of the window, or load the AOC data.
Click the button to solve the problem.




