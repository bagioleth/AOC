
f = open("Day10Input.txt", "r")
myInput = []

for l in f:
    myInput.append(int(l.strip()))

myInput = sorted(myInput)

lastJoltReading = 0
numOneJumps = 0
numThreeJumps = 1

for i in myInput:
    if(i - lastJoltReading > 3):
        break
    if(i - lastJoltReading == 1):
        numOneJumps += 1
    if(i - lastJoltReading == 3):
        numThreeJumps += 1
    lastJoltReading = i

print("Part 1: " + str(numOneJumps * numThreeJumps))

endJoltage = lastJoltReading + 3 #183

def adder(subList):
    if(len(subList) < 3):
        return 1
    i = 0
    sumSoFar = 0
    if(subList[i] and i < len(subList) - 2):
        if(subList[i + 1]):
            sumSoFar += adder(subList[i + 1:])
        if(subList[i + 2]):
            sumSoFar += adder(subList[i + 2:])
        if(subList[i + 3]):
            sumSoFar += adder(subList[i + 3:])
    return sumSoFar
    

#add the endpoints of the jolt reading
myInput.append(0)
myInput.append(endJoltage)
myInput = sorted(myInput)
print(myInput)

isPresent = [0] * (endJoltage + 1)

for i in range(0, endJoltage + 1):
    if(i in myInput):
        isPresent[i] = 1

totalPossibilities = 0
connections = 0


#totalPossibilities = adder(isPresent)              

for i in range(3, len(isPresent) + 1):
    if(isPresent[(-i)] == 1):
        isPresent[-i] = 0
        isPresent[-i] += isPresent[(-i)+1]
        isPresent[-i] += isPresent[(-i)+2]
        isPresent[-i] += isPresent[(-i)+3]
        #print(isPresent[-i])

print(isPresent)
totalPossibilities = isPresent[0]
print("Part 2: " + str(totalPossibilities))      
