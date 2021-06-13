
def solveEquation(equation):
    parts = equation

    if("(" in parts):#finds a subequation to solve
        subequation = parts.copy()
        subequationFound = False
        while(subequationFound == False):
            if("(" not in subequation and ")" not in subequation):
                subequationFound = True
                continue

            startIndex = 0
            endIndex = 0
            numParen = 0
            startFound = False
            endFound = False

            for i in range(subequation.indexOf("("), len(subequation)):
                if (subequation[i] == "(" and not startFound):
                    startFound = True
                    numParen += 1
                    startIndex = i
                elif (subequation[i] == ")" and not endFound):
                    endFound = True
                    numParen -= 1
                    endIndex = i
                if numParen == 0:
                    parts = parts[0:startIndex] + [solveEquation(subequation[startIndex+1:endIndex])] + parts[endIndex+1:]



    while (len(parts) > 1):
        if(parts[1] == "+"):
            parts = [(int(parts[0]) + int(parts[2]))] + (parts[3:])
        elif(parts[1] == "-"):
            parts = [(int(parts[0]) - int(parts[2]))] + (parts[3:])
        elif(parts[1] == "*"):
            parts = [(int(parts[0]) * int(parts[2]))] + (parts[3:])
    return int(parts[0])

f = open("Day18Input.txt", "r")
instructions = []

for l in f:
    instructions.append(l.strip())

sum = 0
for l in instructions:
    functionInput = []
    
    counter = 0
    for i in range(len(l)):
        if l[i] == "(":
            functionInput.append("(")
            counter += 1
        if l[i] == ")":
            functionInput.append(")")
            counter += 1
        elif l[i] == " ":
            functionInput.append(l[counter:i])
        else:
            counter += 1
            
    sum += solveEquation(functionInput)
    print(sum)    

print("Part 1: " + str(sum))



