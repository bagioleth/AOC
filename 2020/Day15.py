import time

startTime = time.time()
f = open("Day15Input.txt", "r")

numbers = [0] * 30000000
line = f.readline().strip().split(",")

for i in range(len(line)):
    numbers[i] = int(line[i])

#print(numbers)
numNumbers = 6
numAnalyzed = 0

while(numNumbers < 30000000):
    numAnalyzed = numbers[numNumbers - 1]
    #print(numAnalyzed)
    if(numAnalyzed not in numbers[:numNumbers - 1]):
        #print("not in")
        #print(numbers)
        #print(numbers[:numNumbers - 1][::-1])
        #numbers[numNumbers] = 0
        numNumbers += 1
    else:
        #print(numbers)
        #print(numbers[:numNumbers - 1][::-1])
        numbers[numNumbers] = ((numbers[:numNumbers - 1][::-1]).index(numAnalyzed)) + 1
        #numbers.append(((numbers[:numNumbers - 1][::-1]).index(numAnalyzed)) + 1)
        numNumbers += 1

#print(numbers)
print("Part 1: " + str(numbers[30000000 - 1]))
print("time: " + str((time.time() - startTime) * 1000))

startTime = time.time()
f = open("Day15Input.txt", "r")

numbers = f.readline().strip().split(",")

for i in range(len(numbers)):
    numbers[i] = int(numbers[i])

numNumbers = len(numbers)
numAnalyzed = 0

while(numNumbers < 2020):
    numAnalyzed = numbers[numNumbers - 1]
    #print(numAnalyzed)
    if(numAnalyzed not in numbers[:numNumbers - 1]):
        #print("not in")
        #print(numbers)
        #print(numbers[:numNumbers - 1][::-1])
        numbers.append(0)
        numNumbers += 1
    else:
        #print(numbers)
        #print(numbers[:numNumbers - 1][::-1])
        numbers.append(((numbers[:numNumbers - 1][::-1]).index(numAnalyzed)) + 1)
        numNumbers += 1

#print(numbers)
print("Part 2: " + str(numbers[2020 - 1]))
print("time: " + str((time.time() - startTime) * 1000))