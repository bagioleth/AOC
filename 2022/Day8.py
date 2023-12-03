import copy


f = open("Day8Input.txt")

trees = []
for l in f:
    l = l.strip()
    row = []
    for c in l:
        row.append(int(c))
    trees.append(row)

#print(trees)

numNotVisible = 0
for r in range(1, len(trees)  -  1):
    for c in range(1, len(trees[r])  -  1):
        treeHeight = trees[r][c]
        if treeHeight <= max([x[c] for x in trees][r + 1:]) and treeHeight <= max([x[c] for x in trees][:r]) and treeHeight <= max(trees[r][:c]) and treeHeight <= max(trees[r][c + 1:]):
            numNotVisible += 1
            #print(str(r) + " "  + str(c))

numVisible = (len(trees) * len(trees[0])) - numNotVisible
print("Part 1: " + str(numVisible))

treeScenicScores = copy.deepcopy(trees)
for r in range(len(treeScenicScores)):
    for c in range(len(treeScenicScores[r])):
        treeScenicScores[r][c] = 0



for r in range(len(trees)):
    for c in range(len(trees[r])):
        numUp = 0
        numDown = 0
        numLeft = 0
        numRight = 0

        #finds trees above
        for i in range(1,r + 1):
            numUp += 1
            if trees[r][c] <= trees[r - i][c]:
                break

        #finds trees below
        for i in range(1,len(trees) - r):
            numDown += 1
            if trees[r][c] <= trees[r + i][c]:
                break

        #finds trees left
        for i in range(1,c + 1):
            numLeft += 1
            if trees[r][c] <= trees[r][c - i]:
                break

        #finds trees right
        for i in range(1,len(trees[r]) - c):
            numRight += 1
            if trees[r][c] <= trees[r][c + i]:
                break

        
            
        #print(str(numUp) + str(numDown) + str(numLeft) + str(numRight))
        #print()
        treeScenicScores[r][c] = (numUp * numDown * numLeft * numRight)

#for r in treeScenicScores:
#    print(r)
print("Part 2: " + str(max(map(max, treeScenicScores))))