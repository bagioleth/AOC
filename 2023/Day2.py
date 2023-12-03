f = open("Day2Input.txt")


totalRed = 12
totalGreen = 13
totalBlue = 14
sumGameID = 0

numValidGames = 0

for l in f:
    maxRed = 0
    maxGreen = 0
    maxBlue = 0
    gameID = int(l[l.index(' ') + 1: l.index(':')])

    game = l[l.index(':') + 1:].strip().split(";")
    for set in game:
        numRed = 0
        numGreen = 0
        numBlue = 0

        splitSet = set.split(',')
        for s in splitSet:
            s = s.strip()
            if "red" in s:
                numRed = int(s[0:s.index(' ')])
            if "green" in s:
                numGreen = int(s[0:s.index(' ')])
            if "blue" in s:
                numBlue = int(s[0:s.index(' ')])

        maxRed = max(maxRed, numRed)
        maxGreen = max(maxGreen, numGreen)
        maxBlue = max(maxBlue, numBlue)
                
    if totalRed >= maxRed and totalBlue >= maxBlue and totalGreen >= maxGreen:
        numValidGames += 1
        sumGameID += gameID

print("Part 1: " + str(sumGameID))


f = open("Day2Input.txt")


sumPowers = 0

for l in f:
    maxRed = 0
    maxGreen = 0
    maxBlue = 0

    game = l[l.index(':') + 1:].strip().split(";")
    for set in game:
        numRed = 0
        numGreen = 0
        numBlue = 0

        splitSet = set.split(',')
        for s in splitSet:
            s = s.strip()
            if "red" in s:
                numRed = int(s[0:s.index(' ')])
            if "green" in s:
                numGreen = int(s[0:s.index(' ')])
            if "blue" in s:
                numBlue = int(s[0:s.index(' ')])

        maxRed = max(maxRed, numRed)
        maxGreen = max(maxGreen, numGreen)
        maxBlue = max(maxBlue, numBlue)

    sumPowers += maxRed * maxGreen * maxBlue

print("Part 2: " + str(sumPowers))