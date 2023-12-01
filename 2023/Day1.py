f = open("Day1Input.txt")

calValSum = 0

for l in f:
    firstFound = False
    firstNum = 0
    lastNum = 0
    for c in l:
        #print(ord(c) - ord('0'))
        if (ord(c) - ord('0')) in [1,2,3,4,5,6,7,8,9,0]:
            if firstFound == False:
                firstNum = int(c)
                firstFound = True
            lastNum = int(c)
    calVal = firstNum * 10 + lastNum
    print(calVal)
    calValSum += calVal

print("Part 1: " + str(calValSum))


f = open("Day1Input.txt")

calValSum = 0

input = []

for l in f:
    input.append(str(l.strip()))

processedInput = []
for l in input:
    processedLine = []
    for c in range(len(l)):
        start = c
        if l[start: start + 3] == "one" :
            processedLine.append(1)
        elif l[start: start + 3] == "two" :
            processedLine.append(2)
        elif l[start: start + 5] == "three" :
            processedLine.append(3)
        elif l[start: start + 4] == "four" :
            processedLine.append(4)
        elif l[start: start + 4] == "five" :
            processedLine.append(5)
        elif l[start: start + 3] == "six" :
            processedLine.append(6)
        elif l[start: start + 5] == "seven" :
            processedLine.append(7)
        elif l[start: start + 5] == "eight" :
            processedLine.append(8)
        elif l[start: start + 4] == "nine" :
            processedLine.append(9)
        elif l[start] == "1" :
            processedLine.append(1)
        elif l[start] == "2" :
            processedLine.append(2)
        elif l[start] == "3" :
            processedLine.append(3)
        elif l[start] == "4" :
            processedLine.append(4)
        elif l[start] == "5" :
            processedLine.append(5)
        elif l[start] == "6" :
            processedLine.append(6)
        elif l[start] == "7" :
            processedLine.append(7)
        elif l[start] == "8" :
            processedLine.append(8)
        elif l[start] == "9" :
            processedLine.append(9)
        elif l[start] == "0" :
            processedLine.append(0)
    print(processedLine)
    processedInput.append(processedLine)

for l in processedInput:
    firstFound = False
    firstNum = -1
    lastNum = -1
    for c in l:
        if firstFound == False:
            firstNum = c
            firstFound = True
        lastNum = c
    calVal = firstNum * 10 + lastNum
    calValSum += calVal

print("Part 2: " + str(calValSum))
