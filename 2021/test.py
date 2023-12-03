def fizzBuzz(n):
    for i in range(1, n+1):
        #print(i)
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

def cardPackets (cardTypes):
    numCards2Packets = 0
    numCards3Packets = 0

    for i in range(len(cardTypes)):
        if cardTypes[i] % 2 != 0:
            numCards2Packets += 1
    
    for i in range(len(cardTypes)):
        if cardTypes[i] % 3 != 0:
            if (cardTypes[i] + 1) % 3 == 0:
                numCards3Packets += 1
            elif (cardTypes[i] + 2) % 3 == 0:
                numCards3Packets += 2

    return min(numCards2Packets, numCards3Packets)

def getMaxUnits(boxes, unitsPerBox, truckSize):
    maxUnits = 0
    numBoxes = 0
    boxesWithUnitsList = []

    while numBoxes < truckSize and boxes != []:
        numBoxes += 1
        biggestBox = max(unitsPerBox)
        maxUnits += biggestBox
        boxIndex = unitsPerBox.index(biggestBox)
        boxes[boxIndex] -= 1
        if boxes[boxIndex] == 0:
            boxes.pop(boxIndex)
            unitsPerBox.pop(boxIndex)

#    for i in range(len(boxes)): #creates a new list where every element represents a box and the value is the unitsPerBox of that box
#        for j in range(boxes[i]):
#            boxesWithUnitsList.append(unitsPerBox[i])

    #print(boxesWithUnitsList)

#    while numBoxes < truckSize and boxesWithUnitsList != []: #checks to see if truck is full with boxes or there is no more boxes to ship
#        biggestBox = max(boxesWithUnitsList) #chooses to take the biggest box first
#        maxUnits += biggestBox
#        boxesWithUnitsList.remove(biggestBox) #removes box from list as 1 box cannot be selected twice
#        numBoxes += 1

    return maxUnits

#fizzBuzz(20)
print(cardPackets([3,9,7,6,5,2]))
print(getMaxUnits([3,1,6], [2,7,4], 2))
print(getMaxUnits([3,9,7,6,5,2], [2,7,4], 2))