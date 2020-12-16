f = open("Day9Input.txt", "r")

instructions = []
preamble = []
currInstruction = 25

for l in f:
    instructions.append(int(l.strip()))

for i in range(25):
    preamble.append(instructions[i])

#print(preamble)
isSatisfied = False
while (currInstruction < len(instructions)):
    for a in range(currInstruction - 25, currInstruction):
        for b in range(currInstruction - 25, currInstruction):
            if (instructions[currInstruction] == instructions[a] + instructions[b] and instructions[a] != instructions[b]):
                isSatisfied = True
            if(a == currInstruction - 1 and b == currInstruction - 1 and isSatisfied == False):
                print("Part 1: " + str(instructions[currInstruction]))
                break
    isSatisfied = False            
    currInstruction += 1
            
            
f = open("Day9Input.txt", "r")


startIndex = 0
endIndex = 0
partOneAnswer = 2089807806
sumSoFar = instructions[startIndex]
listRange = []

while True:
    if sumSoFar == partOneAnswer:
        print("Part 2: " + str(min(listRange) + max(listRange)))
        break
    elif sumSoFar > partOneAnswer:
        listRange.remove(instructions[startIndex])
        sumSoFar -= instructions[startIndex]
        startIndex += 1
    else:
        
        listRange.append(instructions[endIndex])
        endIndex += 1
        sumSoFar += instructions[endIndex]

    