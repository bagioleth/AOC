f = open("Day9Input.txt", "r")

basin = []
row = []
for l in f:
    row = []
    for c in l.strip():
        row.append(int(c))
    basin.append(row)

#for r in basin:
#    print(r)

lowspots = []
lowspotLocations = []
for r in range(len(basin)):
    for c in range(len(basin[r])):
        if r == 0:#top
            if c == 0:#top left
                if basin[r][c] < basin[r+1][c] and basin[r][c] < basin[r][c+1]:
                    lowspots.append(basin[r][c])
                    lowspotLocations.append([r,c])
            elif c == len(basin[r]) - 1:#top right
                if basin[r][c] < basin[r+1][c] and basin[r][c] < basin[r][c-1]:
                    lowspots.append(basin[r][c])
                    lowspotLocations.append([r,c])
            else:
                if basin[r][c] < basin[r+1][c] and basin[r][c] < basin[r][c-1] and basin[r][c] < basin[r][c+1]:
                    lowspots.append(basin[r][c])
                    lowspotLocations.append([r,c])
        elif r == len(basin) - 1:#bottom
            if c == 0:#bottom left
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c+1]:
                    lowspots.append(basin[r][c])
                    lowspotLocations.append([r,c])
            elif c == len(basin[r]) - 1:#bottom right
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c-1]:
                    lowspots.append(basin[r][c])
                    lowspotLocations.append([r,c])
            else:
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c-1] and basin[r][c] < basin[r][c+1]:
                    lowspots.append(basin[r][c])
                    lowspotLocations.append([r,c])
        else:#middle
            if c == 0:#middle left
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c+1] and basin[r][c] < basin[r+1][c]:
                    lowspots.append(basin[r][c])
                    lowspotLocations.append([r,c])
            elif c == len(basin[r]) - 1:#middle right
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c-1] and basin[r][c] < basin[r+1][c]:
                    lowspots.append(basin[r][c])
                    lowspotLocations.append([r,c])
            else:
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c-1] and basin[r][c] < basin[r][c+1] and basin[r][c] < basin[r + 1][c]:
                    lowspots.append(basin[r][c])
                    lowspotLocations.append([r,c])
                

#print(lowspots)
#print(lowspotLocations)
print("Part 1: " + str(sum(lowspots) + len(lowspots)))


#part 2

basinTracker = []
counter = 1
for r in basin:
    basinTracker.append([0] * len(r))
for i in lowspotLocations:
    basinTracker[i[0]][i[1]] = counter
    counter += 1



changeMade = True
while changeMade:
    changeMade = False
    for r in range(len(basinTracker)):
        for c in range(len(basinTracker[r])):
            if basin[r][c] == 9 or basinTracker[r][c] != 0:
                continue
            else:
                if basinTracker[r][c] == 0:
                    if r != 0:#check up
                        if(basinTracker[r-1][c] != 0):
                            basinTracker[r][c] = basinTracker[r-1][c]
                            changeMade = True
                            continue
                    if c != 0:#check left
                        if(basinTracker[r][c-1] != 0):
                            basinTracker[r][c] = basinTracker[r][c-1]
                            changeMade = True
                            continue
                    if c != len(basinTracker[r]) - 1:#check right
                        if(basinTracker[r][c+1] != 0):
                            basinTracker[r][c] = basinTracker[r][c+1]
                            changeMade = True
                            continue
                    if r != len(basinTracker) -1:#check down
                        if(basinTracker[r+1][c] != 0):
                            basinTracker[r][c] = basinTracker[r+1][c]
                            changeMade = True
                            continue


#get size of basins
basinSizes = []
basinNumber = 1
counter = 0
while(True):
    counter = 0
    for r in basinTracker:
        for c in r:
            if c == basinNumber:
                counter += 1
    if(counter == 0):
        break
    basinSizes.append(counter)
    basinNumber += 1

basinSizes.sort(reverse=True)
#print(basinSizes)

print("Part 2: " + str(basinSizes[0] * basinSizes[1] * basinSizes[2]))