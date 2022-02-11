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
for r in range(len(basin)):
    for c in range(len(basin[r])):
        if r == 0:#top
            if c == 0:#top left
                if basin[r][c] < basin[r+1][c] and basin[r][c] < basin[r][c+1]:
                    lowspots.append(basin[r][c])
            elif c == len(basin[r]) - 1:#top right
                if basin[r][c] < basin[r+1][c] and basin[r][c] < basin[r][c-1]:
                    lowspots.append(basin[r][c])
            else:
                if basin[r][c] < basin[r+1][c] and basin[r][c] < basin[r][c-1] and basin[r][c] < basin[r][c+1]:
                    lowspots.append(basin[r][c])
        elif r == len(basin) - 1:#bottom
            if c == 0:#bottom left
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c+1]:
                    lowspots.append(basin[r][c])
            elif c == len(basin[r]) - 1:#bottom right
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c-1]:
                    lowspots.append(basin[r][c])
            else:
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c-1] and basin[r][c] < basin[r][c+1]:
                    lowspots.append(basin[r][c])
        else:#middle
            if c == 0:#middle left
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c+1] and basin[r][c] < basin[r+1][c]:
                    lowspots.append(basin[r][c])
            elif c == len(basin[r]) - 1:#middle right
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c-1] and basin[r][c] < basin[r+1][c]:
                    lowspots.append(basin[r][c])
            else:
                if basin[r][c] < basin[r-1][c] and basin[r][c] < basin[r][c-1] and basin[r][c] < basin[r][c+1] and basin[r][c] < basin[r + 1][c]:
                    lowspots.append(basin[r][c])
                

print(lowspots)

print("Part 1: " + str(sum(lowspots) + len(lowspots)))