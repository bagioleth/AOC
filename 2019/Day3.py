

f = open("Day3Input.txt", "r")

upperBound = 0
lowerBound = 0
rightBound = 0
leftBound = 0
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




f.close
f = open("Day3Input.txt", "r")

circuitBoard = [[0] * (rightBound - leftBound) for _ in range(0, (lowerBound - upperBound))]

originXPos = -1 * leftBound - 1
originYPos = -1 * upperBound - 1

print("numRows: ", len(circuitBoard))
print("numCols: ", len(circuitBoard[0]))


currentXPos = originXPos
currentYPos = originYPos

print("First Wire: ")


for x in f.readline().split(","):
    if(x[0] == 'D'):
        value = int(x[1:])
        for x in range(0, value):
            circuitBoard[currentYPos + x][currentXPos] = 1
        currentYPos += value
        
    elif(x[0] == 'U'):
        value = int(x[1:])
        for x in range(0, value):
            circuitBoard[currentYPos - x][currentXPos] = 1
        currentYPos -= value

    elif(x[0] == 'L'):
        value = int(x[1:])
        for x in range(0, value):
            circuitBoard[currentYPos][currentXPos - x] = 1
        currentXPos -= value

    elif(x[0] == 'R'):
        value = int(x[1:])
        for x in range(0, value):
            circuitBoard[currentYPos][currentXPos + x] = 1
        currentXPos += value

    else:
        print("unrecognized input")



        
currentXPos = originXPos
currentYPos = originYPos


print("Second Wire: ")

for x in f.readline().split(","):
    if(x[0] == 'D'):
        value = int(x[1:])
        for x in range(0, value):
            if circuitBoard[currentYPos + x][currentXPos] == 1:
                circuitBoard[currentYPos + x][currentXPos] = 3
            else:
                circuitBoard[currentYPos + x][currentXPos] = 2
        currentYPos += value
        
    elif(x[0] == 'U'):
        value = int(x[1:])
        for x in range(0, value):
            if circuitBoard[currentYPos - x][currentXPos] == 1:
                circuitBoard[currentYPos - x][currentXPos] = 3
            else:
                circuitBoard[currentYPos - x][currentXPos] = 2
        currentYPos -= value

    elif(x[0] == 'L'):
        value = int(x[1:])
        for x in range(0, value):
            if circuitBoard[currentYPos][currentXPos - x] == 1:
                circuitBoard[currentYPos][currentXPos - x] = 3
            else:
                circuitBoard[currentYPos][currentXPos - x] = 2
        currentXPos -= value

    elif(x[0] == 'R'):
        value = int(x[1:])
        for x in range(0, value):
            if circuitBoard[currentYPos][currentXPos + x] == 1:
                circuitBoard[currentYPos][currentXPos + x] = 3
            else:
                circuitBoard[currentYPos][currentXPos + x] = 2
        currentXPos += value

    else:
        print("unrecognized input")


#for row in range(-50, 50):
#    for col in range(-50,50):
#        print(circuitBoard[originYPos + row][originXPos + col], end="")
#    print("")

print("Finding Distance: ")

for distance in range(0, 250):
    for x in range(0, distance + 1):
        y = distance - x

        #print("(x, y): (", x, ", ", y, ")")
        #exit()
        
        if originXPos + x < len(circuitBoard[0]) and originYPos - y >= 0:
            if circuitBoard[originYPos - y][originXPos + x] == 3:
                print("Part 1: ", distance, " at: ", x, " ", y)
                #exit()
        elif originXPos + x < len(circuitBoard[0]) and originYPos + y < len(circuitBoard): 
            if circuitBoard[originYPos + y][originXPos + x] == 3:
                print("Part 1: ", distance, " at: ", x, " ", -y)
                #exit()
        elif originXPos - x >= 0 and originYPos + y < len(circuitBoard): 
            if circuitBoard[originYPos + y][originXPos - x] == 3:
                print("Part 1: ", distance, " at: ", -x, " ", y)
                #exit()
        elif originXPos - x >= 0 and originYPos - y >= 0:
            if circuitBoard[originYPos - y][originXPos - x] == 3:
                print("Part 1: ", distance, " at: ", -x, " ", -y)
                #exit()


