f = open("Day11Input.txt", "r")
chairs = []
newSetOfChairs = []

for l in f:
    chairs.append(list(l.strip()))
#newSetOfChairs = [[0 for x in range(len(chairs))] for y in range(len(chairs[0]))]
#print(chairs)
iteration = 0
isChanged = True
for i in range(0, len(chairs)):
    newSetOfChairs.append(chairs[i].copy())

while (isChanged):
    
    iteration += 1
    isChanged = False
    #print("Iteration: " + str(iteration))
    for i in range(0, len(chairs)):
        #print(newSetOfChairs[i])
        chairs[i] = newSetOfChairs[i].copy()
    #chairs = newSetOfChairs.copy()
    for r in range(0, len(chairs)):
        for c in range(0, len(chairs[r])):
            if(chairs[r][c] == '.'):#floor
                #print("floor")
                continue

            if(chairs[r][c] == 'L'):#empty seat
                #print("empty")

                if(r > 0):#checking seats above
                    if(c > 0):#check seat above to the left
                        if(chairs[r - 1][c - 1] == '#'):
                            continue
                    if(chairs[r - 1][c] == '#'):#check seat above
                        continue
                    if(c < len(chairs[r]) - 1):#check seat above to the right
                        if(chairs[r - 1][c + 1] == '#'):
                            continue

                if(r < len(chairs) - 1):#checking seats below
                    if(c > 0):#check seat below to the left
                        if(chairs[r + 1][c - 1] == '#'):
                            continue
                    if(chairs[r + 1][c] == '#'):#check seat below
                        continue
                    if(c < len(chairs[r]) - 1):#check seat below to the right
                        if(chairs[r + 1][c + 1] == '#'):
                            continue

                if(c > 0):#check seat to the left
                    if(chairs[r][c - 1] == '#'):
                        continue

                if(c < len(chairs[r]) - 1):#check seat to the right
                    if(chairs[r][c + 1] == '#'):
                        continue

                #no chairs adjacent to chair are occupied
                newSetOfChairs[r][c] = '#'
                isChanged = True

            if(chairs[r][c] == '#'):#occupied seat
                #print("occupied")
                counter = 0

                if(r > 0):#checking seats above
                    if(c > 0):#check seat above to the left
                        if(chairs[r - 1][c - 1] == '#'):
                            counter += 1
                    if(chairs[r - 1][c] == '#'):#check seat above
                        counter += 1
                    if(c < len(chairs[r]) - 1):#check seat above to the right
                        if(chairs[r - 1][c + 1] == '#'):
                            counter += 1

                if(r < len(chairs) - 1):#checking seats below
                    if(c > 0):#check seat below to the left
                        if(chairs[r + 1][c - 1] == '#'):
                            counter += 1
                    if(chairs[r + 1][c] == '#'):#check seat below
                        counter += 1
                    if(c < len(chairs[r]) - 1):#check seat below to the right
                        if(chairs[r + 1][c + 1] == '#'):
                            counter += 1

                if(c > 0):#check seat to the left
                    if(chairs[r][c - 1] == '#'):
                        counter += 1

                if(c < len(chairs[r]) - 1):#check seat to the right
                    if(chairs[r][c + 1] == '#'):
                        counter += 1

                #at least 5 adjacent chairs are occupied
                if(counter >= 4):
                    isChanged = True
                    newSetOfChairs[r][c] = 'L'

counter = 0
for r in chairs:
    for c in r:
        if(c == '#'):
            counter += 1

print("Part 1: " + str(counter))

f = open("Day11Input.txt", "r")
chairs = []
newSetOfChairs = []

for l in f:
    chairs.append(list(l.strip()))
#newSetOfChairs = [[0 for x in range(len(chairs))] for y in range(len(chairs[0]))]
#print(chairs)
iteration = 0
isChanged = True
for i in range(0, len(chairs)):
    newSetOfChairs.append(chairs[i].copy())

while (isChanged):
    
    iteration += 1
    isChanged = False
    #print("Iteration: " + str(iteration))
    for i in range(0, len(chairs)):
        #print(newSetOfChairs[i])
        chairs[i] = newSetOfChairs[i].copy()
    #chairs = newSetOfChairs.copy()
    for r in range(0, len(chairs)):
        for c in range(0, len(chairs[r])):
            if(chairs[r][c] == '.'):#floor
                #print("floor")
                continue

            if(chairs[r][c] == 'L'):#empty seat
                #print("empty")
                counter = 0

                i = 0
                while(r - i > 0):#check seat above
                    #print("1")
                    i += 1
                    if(chairs[r - i][c] == '#'):
                        counter += 1
                        break
                    elif(chairs[r - i][c] == 'L'):
                        break

                i = 0
                while(r + i < len(chairs) - 1):#check seat below
                    #print("2")
                    i += 1
                    if(chairs[r + i][c] == '#'):
                        counter += 1
                        break
                    elif(chairs[r + i][c] == 'L'):
                        break

                i = 0
                while(c - i > 0):#check seat to the left
                    #print("3")
                    i += 1
                    if(chairs[r][c - i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r][c - i] == 'L'):
                        break

                i = 0
                while(c + i < len(chairs[r]) - 1):#check seat to the right
                    #print("4")
                    i += 1
                    if(chairs[r][c + i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r][c + i] == 'L'):
                        break

                i = 0
                while(r - i > 0 and c - i > 0):#check up left
                    #print("5")
                    i += 1
                    if(chairs[r - i][c - i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r - i][c - i] == 'L'):
                        break

                i = 0
                while(r - i > 0 and c + i < len(chairs[r]) - 1):#check up right
                    #print("6")
                    i += 1
                    if(chairs[r - i][c + i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r - i][c + i] == 'L'):
                        break

                i = 0
                while(r + i < len(chairs) - 1 and c + i < len(chairs[r]) - 1):#check down right
                    #print("7")
                    i += 1
                    if(chairs[r + i][c + i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r + i][c + i] == 'L'):
                        break

                i = 0
                while(r + i < len(chairs) - 1 and c - i > 0):#check down left
                    #print("8")
                    i += 1
                    if(chairs[r + i][c - i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r + i][c - i] == 'L'):
                        break

                #no chairs adjacent to chair are occupied
                if(counter == 0):
                    newSetOfChairs[r][c] = '#'
                    isChanged = True

            if(chairs[r][c] == '#'):#occupied seat
                #print("occupied")
                counter = 0

                i = 0
                while(r - i > 0):#check seat above
                    #print("1")
                    i += 1
                    if(chairs[r - i][c] == '#'):
                        counter += 1
                        break
                    elif(chairs[r - i][c] == 'L'):
                        break

                i = 0
                while(r + i < len(chairs) - 1):#check seat below
                    #print("2")
                    i += 1
                    if(chairs[r + i][c] == '#'):
                        counter += 1
                        break
                    elif(chairs[r + i][c] == 'L'):
                        break

                i = 0
                while(c - i > 0):#check seat to the left
                    #print("3")
                    i += 1
                    if(chairs[r][c - i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r][c - i] == 'L'):
                        break

                i = 0
                while(c + i < len(chairs[r]) - 1):#check seat to the right
                    #print("4")
                    i += 1
                    if(chairs[r][c + i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r][c + i] == 'L'):
                        break

                i = 0
                while(r - i > 0 and c - i > 0):#check up left
                    #print("5")
                    i += 1
                    if(chairs[r - i][c - i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r - i][c - i] == 'L'):
                        break

                i = 0
                while(r - i > 0 and c + i < len(chairs[r]) - 1):#check up right
                    #print("6")
                    i += 1
                    if(chairs[r - i][c + i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r - i][c + i] == 'L'):
                        break

                i = 0
                while(r + i < len(chairs) - 1 and c + i < len(chairs[r]) - 1):#check down right
                    #print("7")
                    i += 1
                    if(chairs[r + i][c + i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r + i][c + i] == 'L'):
                        break

                i = 0
                while(r + i < len(chairs) - 1 and c - i > 0):#check down left
                    #print("8")
                    i += 1
                    if(chairs[r + i][c - i] == '#'):
                        counter += 1
                        break
                    elif(chairs[r + i][c - i] == 'L'):
                        break


                #at least 5 adjacent chairs are occupied
                if(counter >= 5):
                    isChanged = True
                    newSetOfChairs[r][c] = 'L'

counter = 0
for r in chairs:
    for c in r:
        if(c == '#'):
            counter += 1

print("Part 2: " + str(counter))