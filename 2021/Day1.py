f = open("Day1Input.txt", "r")
inputList = []
counter = 0

for l in f:
    inputList.append(int(l.strip()))

for i in range(1, len(inputList)):
    if inputList[i] > inputList[i - 1]:
        counter += 1

print("Part 1: " + str(counter))

counter = 0
for i in range(3, len(inputList)):
    if inputList[i] > inputList[i - 3]:
        counter += 1
print("Part 2: " + str(counter))