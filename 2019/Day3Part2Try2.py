f = open("Day3Input.txt", "r")

wire1Length = 0
for x in f.readline().split(","):
    wire1Length += int(x[1:])

print("Total length of wire 1: ", wire1Length)

wire1Path = [[0] * 2 for _ in range(wire1Length + 1)]


f.seek(0)

xPos = 0
yPos = 0
numMoves = 0

#map wire 1

for x in f.readline().split(","):
    value = int(x[1:])
    if(x[0] == 'D'):
        for i in range(1, value + 1):
            wire1Path[numMoves + i] = [xPos, yPos - i]
        yPos -= value
    elif(x[0] == 'U'):
        for i in range(1, value + 1):
            wire1Path[numMoves + i] = [xPos, yPos + i]
        yPos += value
    elif(x[0] == 'L'):
        for i in range(1, value + 1):
            wire1Path[numMoves + i] = [xPos - i, yPos]
        xPos -= value
    elif(x[0] == 'R'):
        for i in range(1, value + 1):
            wire1Path[numMoves + i] = [xPos + i, yPos]
        xPos += value
    else:
        print("unrecognized input")
    numMoves += value

for i in range(50):
    print(wire1Path[i], end = " ")
print("")

#find if wire 2 intersects wire 1

numMoves = 0
intersections = [0] * 30
index = 0

for x in f.readline().split(","):
    value = int(x[1:])
    if(x[0] == 'D'):
        for i in range(1, value + 1):
            for j in range(wire1Length):
                if wire1Path[j] == [xPos, yPos - i]:
                    intersections[index] = j + numMoves + i
                    index += 1
        yPos -= value
    elif(x[0] == 'U'):
        for i in range(1, value + 1):
            for j in range(wire1Length):
                if wire1Path[j] == [xPos, yPos + i]:
                    intersections[index] = j + numMoves + i
                    index += 1
        yPos += value
    elif(x[0] == 'L'):
        for i in range(1, value + 1):
            for j in range(wire1Length):
                if wire1Path[j] == [xPos - i, yPos]:
                    intersections[index] = j + numMoves + i
                    print(j + numMoves + i)
        xPos -= value
    elif(x[0] == 'R'):
        for i in range(1, value + 1):
            for j in range(wire1Length):
                if wire1Path[j] == [xPos + i, yPos]:
                    intersections[index] = j + numMoves + i
                    index += 1
        xPos += value
    else:
        print("unrecognized input")
    numMoves += value
    print(numMoves)

min = intersections[0]
for x in intersections:
    print(x)
    if x != 0:
        if x < min:
            min = x

print("Part 2: ", min)