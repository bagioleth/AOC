
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

#print(arrivalTimes)
#print(busNumbers)
timeWaiting = min(arrivalTimes) - estimatedDeparture
print("Part 1: " + str(timeWaiting * busNumbers[arrivalTimes.index(min(arrivalTimes))]))

timestamp = 0
busTimes = []
busIndexes = []

for i in range(len(busses)):
    if(busses[i] != 'x'):
        busTimes.append(busses[i])
        busIndexes.append(i)


isSatisfied = False
while(not isSatisfied):
    isSatisfied = True
    i = 0
    while (i < len(busTimes)):
        if((timestamp + busIndexes[i]) % int(busTimes[i]) != 0):
            isSatisfied = False
            timestamp += int(busses[0])
            break
        i += 1


print("Part 2: " + str(timestamp))