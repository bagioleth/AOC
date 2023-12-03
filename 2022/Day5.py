f = open("Day5Input.txt")

stacks = []
inputLines = []
for l in f:
    inputLines.append(l)

#start with 9 empty stacks
for i in range(9):
    stacks.append([])

#populate stacks with starting input
for i in range(8):
    for j in range(9):
        if inputLines[i][(1 + 4 * j)] != ' ':
            stacks[j] = [inputLines[i][(1 + 4 * j)]] + stacks[j]

for i in range(10, len(inputLines)):
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    numToMove = int(inputLines[i][:inputLines[i].index(' ')])
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    sourceStack = int(inputLines[i][:inputLines[i].index(' ')])
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    destinationStack = int(inputLines[i])

    for j in range(numToMove):
        stacks[destinationStack - 1].append(stacks[sourceStack - 1].pop())

part1Output = []
for s in stacks:
    part1Output.append(s[-1])

print("Part 1: " + str(part1Output))

f = open("Day5Input.txt")

stacks = []
inputLines = []
for l in f:
    inputLines.append(l)

#start with 9 empty stacks
for i in range(9):
    stacks.append([])

#populate stacks with starting input
for i in range(8):
    for j in range(9):
        if inputLines[i][(1 + 4 * j)] != ' ':
            stacks[j] = [inputLines[i][(1 + 4 * j)]] + stacks[j]

for i in range(10, len(inputLines)):
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    numToMove = int(inputLines[i][:inputLines[i].index(' ')])
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    sourceStack = int(inputLines[i][:inputLines[i].index(' ')])
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    inputLines[i] = inputLines[i][inputLines[i].index(' ') + 1:]
    destinationStack = int(inputLines[i])

    subStackToMove = []
    for j in range(numToMove):
        subStackToMove.append(stacks[sourceStack - 1].pop())

    subStackToMove.reverse()
    stacks[destinationStack - 1] = stacks[destinationStack - 1] + subStackToMove

part2Output = []
for s in stacks:
    part2Output.append(s[-1])

print("Part 2: " + str(part2Output))
