f = open("Day25Input.txt", 'r')

print("This will take about 7 seconds...")

seaFloor = []

for l in f:
    seaFloor.append(list(l.strip()))


#for l in seaFloor:
#    print(l)

changeMade = True
numIterations = 0
while changeMade:
    numIterations += 1
    changeMade = False
    seaFloorChanges = [[0] * (len(seaFloor[0])) for _ in range(len(seaFloor))]

    for r in range(len(seaFloor)):#check to move right cucumbers
        for c in range(len(seaFloor[r])):
            if seaFloor[r][c] == '>':
                if seaFloor[r][(c + 1) % len(seaFloor[r])] == '.':
                    changeMade = True
                    seaFloorChanges[r][c] = 1

    for r in range(len(seaFloor)):#move right cucumbers
        for c in range(len(seaFloor[r])):
            if seaFloorChanges[r][c] == 1:
                seaFloor[r][(c + 1) % len(seaFloor[r])] = '>'
                seaFloor[r][c] = '.'

    seaFloorChanges = [[0] * (len(seaFloor[0])) for _ in range(len(seaFloor))]

    for r in range(len(seaFloor)):#check to move down cucumbers
        for c in range(len(seaFloor[r])):
            if seaFloor[r][c] == 'v':
                if seaFloor[(r + 1) % len(seaFloor)][c] == '.':
                    changeMade = True
                    seaFloorChanges[r][c] = 1

    for r in range(len(seaFloor)):#move down cucumbers
        for c in range(len(seaFloor[r])):
            if seaFloorChanges[r][c] == 1:
                seaFloor[(r + 1) % len(seaFloor)][c] = 'v'
                seaFloor[r][c] = '.'
    

#print()

#for l in seaFloor:
#    print(l)

print("Part 1: " + str(numIterations))