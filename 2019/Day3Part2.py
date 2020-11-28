

f = open("Day3Input.txt", "r")

upperBound = 0
lowerBound = 0
rightBound = 0
leftBound = 0
currentXPos = 0
currentYPos = 0

#finds the bounds of the array
for x in f.readline().split(","):
    if(x[0] == 'D'):
        currentYPos += int(x[1:])
        if currentYPos > lowerBound:
            lowerBound = currentYPos
    elif(x[0] == 'U'):
        currentYPos -= int(x[1:])
        if currentYPos < upperBound:
            upperBound = currentYPos
    elif(x[0] == 'L'):
        currentXPos -= int(x[1:])
        if currentXPos < leftBound:
            leftBound = currentXPos
    elif(x[0] == 'R'):
        currentXPos += int(x[1:])
        if currentXPos > rightBound:
            rightBound = currentXPos
    else:
        print("unrecognized input")

#reset coordinants
currentXPos = 0
currentYPos = 0

for x in f.readline().split(","):
    if(x[0] == 'D'):
        currentYPos += int(x[1:])
        if currentYPos > lowerBound:
            lowerBound = currentYPos
    elif(x[0] == 'U'):
        currentYPos -= int(x[1:])
        if currentYPos < upperBound:
            upperBound = currentYPos
    elif(x[0] == 'L'):
        currentXPos -= int(x[1:])
        if currentXPos < leftBound:
            leftBound = currentXPos
    elif(x[0] == 'R'):
        currentXPos += int(x[1:])
        if currentXPos > rightBound:
            rightBound = currentXPos
    else:
        print("unrecognized input")

print("Upper Bound: ", upperBound)
print("Lower Bound: ", lowerBound)
print("Left Bound: ", leftBound)
print("Right Bound: ", rightBound)




f.close()
f = open("Day3Input.txt", "r")

circuitBoard = [[0] * (rightBound - leftBound) for _ in range(0, (lowerBound - upperBound))]

originXPos = -1 * leftBound - 1
originYPos = -1 * upperBound - 1

print("numRows: ", len(circuitBoard))
print("numCols: ", len(circuitBoard[0]))


currentXPos = originXPos
currentYPos = originYPos

print("First Wire: ")

counter = 0
for x in f.readline().split(","):
    if(x[0] == 'D'):
        value = int(x[1:])
        for x in range(1, value + 1):
            counter += 1
            circuitBoard[currentYPos + x][currentXPos] = counter
        currentYPos += value
        
    elif(x[0] == 'U'):
        value = int(x[1:])
        for x in range(1, value + 1):
            counter += 1
            circuitBoard[currentYPos - x][currentXPos] = counter
        currentYPos -= value

    elif(x[0] == 'L'):
        value = int(x[1:])
        for x in range(1, value + 1):
            counter += 1
            circuitBoard[currentYPos][currentXPos - x] = counter
        currentXPos -= value

    elif(x[0] == 'R'):
        value = int(x[1:])
        for x in range(1, value + 1):
            counter += 1
            circuitBoard[currentYPos][currentXPos + x] = counter
        currentXPos += value

    else:
        print("unrecognized input")



        
currentXPos = originXPos
currentYPos = originYPos


print("Second Wire: ")

counter = 0
index = 0
arrayOfIntersections = [0] * 20

for x in f.readline().split(","):
    if(x[0] == 'D'):
        value = int(x[1:])
        for x in range(1, value + 1):
            counter += 1
            if circuitBoard[currentYPos + x][currentXPos] > 0:
                arrayOfIntersections[index] = circuitBoard[currentYPos + x][currentXPos] + counter
                index += 1
        currentYPos += value
        
    elif(x[0] == 'U'):
        value = int(x[1:])
        for x in range(1, value + 1):
            counter += 1
            if circuitBoard[currentYPos - x][currentXPos] > 0:
                arrayOfIntersections[index] = circuitBoard[currentYPos + x][currentXPos] + counter
                index += 1
        currentYPos -= value

    elif(x[0] == 'L'):
        value = int(x[1:])
        for x in range(1, value + 1):
            counter += 1
            if circuitBoard[currentYPos][currentXPos - x] > 0:
                arrayOfIntersections[index] = circuitBoard[currentYPos + x][currentXPos] + counter
                index += 1
        currentXPos -= value

    elif(x[0] == 'R'):
        value = int(x[1:])
        for x in range(1, value + 1):
            counter += 1
            if circuitBoard[currentYPos][currentXPos + x] > 0:
                arrayOfIntersections[index] = circuitBoard[currentYPos + x][currentXPos] + counter
                index += 1
        currentXPos += value

    else:
        print("unrecognized input")

min = arrayOfIntersections[0]
for x in arrayOfIntersections:
    print(x)
    if x != 0:
        if x < min:
            min = x

print("Part 2: ", min)

#circuitBoard[originYPos][originXPos] = 9
#for row in range(-50, 50):
#    for col in range(-50,50):
#        print(circuitBoard[originYPos + row][originXPos + col], end="")
#    print("")

