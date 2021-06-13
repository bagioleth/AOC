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

print(instructions[0])
print(sorted(lines[0]))

for l in lines:
    changeMade = True
    while(changeMade):
        changeMade = False
        if (("e" in l) and ("w" in l)):
            changeMade = True
            l.remove("e")
            l.remove("w")
        if (("ne" in l) and ("sw" in l)):
            changeMade = True
            l.remove("ne")
            l.remove("sw")
        if (("se" in l) and ("nw" in l)):
            changeMade = True
            l.remove("se")
            l.remove("nw")
    #l = sorted(l)

#print(lines[0])
for i in range(len(lines)):
    lines[i] = sorted(lines[i])
    #print(lines[i])
print(lines[0])

sortedLines = sorted(lines)
for l in sortedLines:
    print(l)


numBlack = 0
while(lines != []):
    counter = 1
    #print("test")
    #print(lines[0])
    #print(lines[1:])
    while(lines[0] in lines[1:] and len(lines) > 1):
        counter += 1
        print("removing line")
        lines[1:].remove(lines[0])
        if(counter % 2 == 1):
            numBlack += 1
    lines.remove(lines[0])

print("Part 1: " + str(numBlack))

#print(lines[0])
#print(sorted(lines[0]))