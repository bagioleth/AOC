
f = open("Day8Input.txt", "r")

instructions = []
hasBeenRan = []

for l in f:
    instructions.append(l.strip())
    hasBeenRan.append(False)

accumulator = 0
currInstruction = 0
while True:
    #print(currInstruction)
    if hasBeenRan[currInstruction]:
        break
    hasBeenRan[currInstruction] = True

    if "nop" in instructions[currInstruction]:
        currInstruction += 1
        continue
    elif "jmp" in instructions[currInstruction]:
        if "+" in instructions[currInstruction]:
            currInstruction += int(instructions[currInstruction].split("+")[1])
        else:
            currInstruction -= int(instructions[currInstruction].split("-")[1])
    else:
        if "+" in instructions[currInstruction]:
            accumulator += int(instructions[currInstruction].split("+")[1])
        else:
            accumulator -= int(instructions[currInstruction].split("-")[1])
        currInstruction += 1

print("Part 1: " + str(accumulator))

accumulator = 0
currInstruction = 0
f = open("Day8Input.txt", "r")

instructions = []
hasBeenRan = []
hasBeenChanged = []
isChanged = False
changedInstruction = 0

for l in f:
    instructions.append(l.strip())
    hasBeenRan.append(False)
    hasBeenChanged.append(False)

while True:
    if currInstruction == len(instructions):#goal
        break
    if currInstruction > len(instructions):#too far
        #print("gone too far")
        currInstruction = 0
        accumulator = 0
        hasBeenRan = [False] * len(instructions)#resets list
        isChanged = False
        continue

    if hasBeenRan[currInstruction]:#loop is found
        #print("loop detected")
        currInstruction = 0
        accumulator = 0
        hasBeenRan = [False] * len(instructions)#resets list
        isChanged = False
        continue
    hasBeenRan[currInstruction] = True

    if "nop" in instructions[currInstruction]:
        if(not isChanged and not hasBeenChanged[currInstruction]):#acts as a "jmp"
            changedInstruction = currInstruction
            hasBeenChanged[currInstruction] = True
            isChanged = True
            if "+" in instructions[currInstruction]:
                currInstruction += int(instructions[currInstruction].split("+")[1])
                continue
            else:
                currInstruction -= int(instructions[currInstruction].split("-")[1])
                continue
        currInstruction += 1
        continue
    elif "jmp" in instructions[currInstruction]:
        if(not isChanged and not hasBeenChanged[currInstruction]):#acts as a "nop"
            changedInstruction = currInstruction
            hasBeenChanged[currInstruction] = True
            isChanged = True
            currInstruction += 1
            continue
        if "+" in instructions[currInstruction]:
            currInstruction += int(instructions[currInstruction].split("+")[1])
        else:
            currInstruction -= int(instructions[currInstruction].split("-")[1])
    else:
        if "+" in instructions[currInstruction]:
            accumulator += int(instructions[currInstruction].split("+")[1])
        else:
            accumulator -= int(instructions[currInstruction].split("-")[1])
        currInstruction += 1

print("Part 2: " + str(accumulator))