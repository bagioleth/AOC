f = open("Day9Input.txt")

inputLines = []
for l in f:
    inputLines.append(l.strip())

visitedLocations = [[0,0]]
headLoc = [0,0]
tailLoc = [0,0]

for l in inputLines:
    if l[0] == 'U':
        for i in range(int(l[1:])):
            headLoc[0] += 1
            if headLoc[0] - tailLoc[0] == 2:
                tailLoc[0] += 1
                tailLoc[1] = headLoc[1]#handles diagonal movement
            if tailLoc not in visitedLocations:
                visitedLocations.append(tailLoc.copy())

    elif l[0] == 'D':
        for i in range(int(l[1:])):
            headLoc[0] -= 1
            if headLoc[0] - tailLoc[0] == -2:
                tailLoc[0] -= 1
                tailLoc[1] = headLoc[1]#handles diagonal movement
            if tailLoc not in visitedLocations:
                visitedLocations.append(tailLoc.copy())

    elif l[0] == 'L':
        for i in range(int(l[1:])):
            headLoc[1] -= 1
            if headLoc[1] - tailLoc[1] == -2:
                tailLoc[1] -= 1
                tailLoc[0] = headLoc[0]#handles diagonal movement
            if tailLoc not in visitedLocations:
                visitedLocations.append(tailLoc.copy())

    elif l[0] == 'R':
        for i in range(int(l[1:])):
            headLoc[1] += 1
            if headLoc[1] - tailLoc[1] == 2:
                tailLoc[1] += 1
                tailLoc[0] = headLoc[0]#handles diagonal movement
            if tailLoc not in visitedLocations:
                visitedLocations.append(tailLoc.copy())

    else:
        print("Incorrect Input")
        break

print(len(visitedLocations))