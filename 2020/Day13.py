

f = open("Day13Input.txt", "r")
instructions = []

for l in f:
    instructions.append(l.strip())

estimatedDeparture = int(instructions[0])

busses = instructions[1].split(',')
arrivalTimes = []
busNumbers = []
counter = 1

for bus in busses:
    if(bus != 'x'):
        counter = 1
        val = int(bus)
        #print(val)
        while(val * counter < estimatedDeparture):
            counter += 1
        arrivalTimes.append(val * counter)
        busNumbers.append(val)

#def readInput():
#    userInput = input('Enter your input for the rovers\' instructions (If passing a file, make sure the file name inds in ".txt"):\n' +
#        '\nNote: If you would like to use the sample test cases, leave the box blank and press enter.\n')
#    print(userInput)
#readInput()

#print(arrivalTimes)
#print(busNumbers)
timeWaiting = min(arrivalTimes) - estimatedDeparture
print("Part 1: " + str(timeWaiting * busNumbers[arrivalTimes.index(min(arrivalTimes))]))

startTime = 0
busTimes = []
busIndexes = []

for i in range(len(busses)):
    if(busses[i] != 'x'):
        busTimes.append(int(busses[i]))  #list of bus times
        busIndexes.append(i)        #offset of time from start of list

maxVal = 0
maxValIndex = 0
for i in range(len(busTimes)):
    if (int(busTimes[i]) > maxVal):
        maxVal = busTimes[i]
        maxValIndex = busIndexes[i]


#moves largest value to front of list for faster evaluation
busTimes.remove(maxVal)
busTimes = [maxVal] + busTimes

busIndexes.remove(maxValIndex)
busIndexes = [maxValIndex] + busIndexes

print(busTimes)
print(busIndexes)

startTime = 0 - busIndexes[0]
isSatisfied = False
while(not isSatisfied):
    isSatisfied = True
    i = 0
    while (i < len(busTimes)):
        if((startTime + busIndexes[i]) % int(busTimes[i]) != 0):
            #print("test")
            isSatisfied = False
            startTime += (busTimes[0])
            break
        #else:
            #print("Possible candidate: " + str(startTime))
        i += 1


print("Part 2: " + str(startTime))
