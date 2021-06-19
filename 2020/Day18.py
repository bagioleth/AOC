
def solveEquationPart1(parts):  #expects a list of operands and operators in order to be solved
                                #no priority between operators
    #print(parts)

    while ('(' in parts):#finds parenthesis and solved them first using recursion
        #print("test")
        subStart = 0
        startFound  = False
        endFound = False
        subEnd = 0
        numParen = 0

        for i in range(len(parts)):
            if parts[i] == '(': #start of subequation found
                numParen += 1
                if startFound == False:
                    subStart = i
                    startFound = True
            elif parts[i] == ')':
                numParen -= 1
                if(numParen == 0):  #end of subequation found
                    subEnd = i
                    break

        parts = parts[0:subStart] + [solveEquationPart1(parts[subStart + 1:subEnd])] + parts[subEnd + 1:]

    while (len(parts) > 1): #solves left to right
        if(parts[1] == "+"):
            parts = [(int(parts[0]) + int(parts[2]))] + (parts[3:])
        elif(parts[1] == "*"):
            parts = [(int(parts[0]) * int(parts[2]))] + (parts[3:])

    #print("Solution: " + str(parts[0]))
    return int(parts[0])

def solveEquationPart2(parts):  #expects a list of operands and operators in order to be solved
                                #addition takes priority over multiplication
    #print(parts)

    while ('(' in parts):#finds parenthesis and solved them first using recursion
        #print("test")
        subStart = 0
        startFound  = False
        subEnd = 0
        numParen = 0

        for i in range(len(parts)):
            if parts[i] == '(': #start of subequation found
                numParen += 1
                if startFound == False:
                    subStart = i
                    startFound = True
            elif parts[i] == ')':
                numParen -= 1
                if(numParen == 0):  #end of subequation found
                    subEnd = i
                    break

        parts = parts[0:subStart] + [solveEquationPart2(parts[subStart + 1:subEnd])] + parts[subEnd + 1:]

    if '*' in parts:    #separates equation into subequations to the left and right of the "*" operator
        parts = [solveEquationPart2(parts[0:parts.index('*')]) * solveEquationPart2(parts[parts.index('*') + 1:])]

    while (len(parts) > 1): #solves left to right
        if(parts[1] == "+"):
            parts = [(int(parts[0]) + int(parts[2]))] + (parts[3:])

    #print("Solution: " + str(parts[0]))
    return int(parts[0])



f = open("Day18Input.txt", "r")
instructions = []

for l in f:
    instruction = ""
    for c in l:     #adds spaces around the parenthesis for split() function to work
        if c == ')':
            instruction += ' '
            instruction += ')'
            continue
        elif c == '(':
            instruction += '('
            instruction += ' '
        else:
            instruction += c
    instructions.append(instruction.split())

#print(instructions)

sum = 0
for l in instructions:
    sum += solveEquationPart1(l)
    #print(sum)    

print("Part 1: " + str(sum))


sum = 0
for l in instructions:
    sum += solveEquationPart2(l)
    #print(sum)    

print("Part 1: " + str(sum))



