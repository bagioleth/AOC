f = open("Day11Input.txt", "r")

cavern = []
for l in f:
    line = []
    for c in l.strip():
        line.append(int(c))
    cavern.append(line)

#for l in cavern:
#    print(l)

cavernFlashes = [ [0] * 10 for _ in range(10)]
numFlashes = 0
iterations = 100
for iteration in range(iterations):
    for r in range(len(cavern)):#increments everything by 1
        for c in range(len(cavern[r])):
            cavern[r][c] += 1

    flashOccured = True
    while flashOccured:
        flashOccured = False
        for r in range(len(cavern)):#checks for flashes
            for c in range(len(cavern[r])):
                if cavern[r][c] > 9 and cavernFlashes[r][c] == 0:#triggers a flash
                    flashOccured = True
                    numFlashes += 1
                    cavernFlashes[r][c] = 1
                    for i in range(-1,2):
                        for j in range(-1,2):
                            if not (r + i < 0 or r + i >= len(cavern) or c + j < 0 or c + j >= len(cavern[r])):
                                cavern[r + i][c + j] += 1

    
    for r in range(len(cavern)):#resets the jelifish that flashed to 0
        for c in range(len(cavern[r])):
            if cavernFlashes[r][c] == 1:
                cavernFlashes[r][c] = 0
                cavern[r][c] = 0

#print()
#for l in cavern:
#    print(l)

print("Part 1: " + str(numFlashes))

f = open("Day11Input.txt", "r")

cavern = []
for l in f:
    line = []
    for c in l.strip():
        line.append(int(c))
    cavern.append(line)

#for l in cavern:
#    print(l)

cavernFlashes = [ [0] * 10 for _ in range(10)]
numFlashes = 0
isSyncronized = False
counter = 0
while not isSyncronized:
    numFlashes = 0
    counter += 1
    for r in range(len(cavern)):#increments everything by 1
        for c in range(len(cavern[r])):
            cavern[r][c] += 1

    flashOccured = True
    while flashOccured:
        flashOccured = False
        for r in range(len(cavern)):#checks for flashes
            for c in range(len(cavern[r])):
                if cavern[r][c] > 9 and cavernFlashes[r][c] == 0:#triggers a flash
                    flashOccured = True
                    numFlashes += 1
                    cavernFlashes[r][c] = 1
                    for i in range(-1,2):
                        for j in range(-1,2):
                            if not (r + i < 0 or r + i >= len(cavern) or c + j < 0 or c + j >= len(cavern[r])):
                                cavern[r + i][c + j] += 1

    
    for r in range(len(cavern)):#resets the jellyfish that flashed to 0
        for c in range(len(cavern[r])):
            if cavernFlashes[r][c] == 1:
                cavernFlashes[r][c] = 0
                cavern[r][c] = 0

    if(numFlashes == 100):
        isSyncronized = True

print("Part 2: " + str(counter))

    
