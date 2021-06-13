from os import remove


f = open("Day24Input.txt", "r")
instructions = []

for l in f:
    instructions.append(l.strip())

lines = []
i = 0
while (i < len(instructions)):
    directions = []
    j = 0
    while (j < len(instructions[i])):
        #print(i)
        #print(j)
        if(instructions[i][j] == 'n'):
            j += 1
            if(instructions[i][j] == 'e'):
                directions.append("ne")
                j += 1
                continue
            elif(instructions[i][j] == 'w'):
                directions.append("nw")
                j += 1
                continue
        elif(instructions[i][j] == 's'):
            j += 1
            if(instructions[i][j] == 'e'):
                directions.append("se")
                j += 1
                continue
            elif(instructions[i][j] == 'w'):
                directions.append("sw")
                j += 1
                continue
        elif(instructions[i][j] == 'e'):
            directions.append("e")
            j += 1
            continue
        elif(instructions[i][j] == 'w'):
            directions.append("w")
            j += 1
            continue
        else:
            print("Invalid Input") 
    i += 1
    lines.append(directions)    

#print(instructions[0])
#print(sorted(lines[0]))

for l in lines:#simplifies each instruction to find matches
    changeMade = True
    while(changeMade):
        changeMade = False
        if (("e" in l) and ("w" in l)):
            changeMade = True
            l.remove("e")
            l.remove("w")
            continue
        if (("ne" in l) and ("sw" in l)):
            changeMade = True
            l.remove("ne")
            l.remove("sw")
            continue
        if (("se" in l) and ("nw" in l)):
            changeMade = True
            l.remove("se")
            l.remove("nw")
            continue
        if (("se" in l) and ("ne" in l) and ("w" in l)):
            changeMade = True
            l.remove("se")
            l.remove("ne")
            l.remove("w")
            continue
        if (("sw" in l) and ("nw" in l) and ("e" in l)):
            changeMade = True
            l.remove("sw")
            l.remove("nw")
            l.remove("e")
            continue
        if (("sw" in l) and ("nw" in l)):
            changeMade = True
            l.remove("sw")
            l.remove("nw")
            l.append("w")
            continue
        if (("se" in l) and ("ne" in l)):
            changeMade = True
            l.remove("se")
            l.remove("ne")
            l.append("e")
            continue
        if (("nw" in l) and ("e" in l)):
            changeMade = True
            l.remove("nw")
            l.remove("e")
            l.append("ne")
            continue
        if (("sw" in l) and ("e" in l)):
            changeMade = True
            l.remove("sw")
            l.remove("e")
            l.append("se")
            continue
        if (("ne" in l) and ("w" in l)):
            changeMade = True
            l.remove("ne")
            l.remove("w")
            l.append("nw")
            continue
        if (("se" in l) and ("w" in l)):
            changeMade = True
            l.remove("se")
            l.remove("w")
            l.append("sw")
            continue
    #l = sorted(l)

#print(lines[0])
for i in range(len(lines)):
    lines[i] = sorted(lines[i])
    #print(lines[i])
#print(lines[0])

sortedLines = sorted(lines)
for l in sortedLines:
    print(l)

tempLines = lines.copy()#saves origional values of lines

numBlack = 0
while(len(lines) > 0):
    tempVal = lines[0]
    if (lines.count(tempVal) % 2 == 1):
        numBlack += 1
        while(tempVal in lines):
            lines.remove(tempVal)
    else:
        while(tempVal in lines):
            lines.remove(tempVal)

    #print(numBlack)

print("Part 1: " + str(numBlack))

print(tempLines)
lines = tempLines.copy() #sets lines to origional values



#print(lines[0])
#print(sorted(lines[0]))