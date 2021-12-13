f = open("Day3Input.txt", "r")
numOnes = [0,0,0,0,0,0,0,0,0,0,0,0]
#numOnes = [0,0,0,0,0]
numLines = 0

for l in f:
    numLines += 1
    for c in range(0,len(l)):
        if l[c] == '1':
            numOnes[c] += 1


gRate = 0
eRate = 0

numOnes.reverse()
for e in range(0, len(numOnes)):
    if (numOnes[e] > numLines - numOnes[e]):
        gRate += 2**e
    else:
        eRate += 2**e

#print(numOnes)
#print(numLines)
#print(gRate)
#print(eRate)
print("Part 1: " + str(gRate * eRate))

f = open("Day3Input.txt", "r")
lines = []
for l in f:
    lines.append(l.strip())

oGenRating = ''
cO2ScrubRating = ''

counter = 0
for i in range(0, len(lines[0])):
    newLines = []
    counter = 0
    for j in range(0, len(lines)):
        if lines[j][i] == '1':
            counter += 1
    if counter >= len(lines) - counter:#add 1s
        for j in range(0, len(lines)):
            if lines[j][i] == '1':
                newLines.append(lines[j])
    else:#add 0s
        for j in range(0, len(lines)):
            if lines[j][i] == '0':
                newLines.append(lines[j])

    lines = newLines

oGenRating = lines[0]

f = open("Day3Input.txt", "r")
lines = []
for l in f:
    lines.append(l.strip())

for i in range(0, len(lines[0])):
    if(len(lines) == 1):
        break
    newLines = []
    counter = 0
    for j in range(0, len(lines)):
        if lines[j][i] == '1':
            counter += 1
    if counter >= len(lines) - counter:#add 0s
        for j in range(0, len(lines)):
            if lines[j][i] == '0':
                newLines.append(lines[j])
    else:#add 1s
        for j in range(0, len(lines)):
            if lines[j][i] == '1':
                newLines.append(lines[j])

    lines = newLines
    #print(lines)

cO2ScrubRating = lines[0]

oGenRating = oGenRating[::-1]
oGenRatingDec = 0
for e in range(0, len(oGenRating)):
    if (oGenRating[e] == '1'):
        oGenRatingDec += 2**e

cO2ScrubRating = cO2ScrubRating[::-1]
cO2ScrubRatingDec = 0
for e in range(0, len(cO2ScrubRating)):
    if (cO2ScrubRating[e] == '1'):
        cO2ScrubRatingDec += 2**e


print("Part 2: " + str(oGenRatingDec * cO2ScrubRatingDec))