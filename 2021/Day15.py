
f = open("Day15Input.txt", 'r')

cavern = []

for l in f:
    line = []
    for c in l.strip():
        line.append(int(c))
    cavern.append(line)

#for l in cavern:
#    print(l)

cavernDistances = [[100000] * (len(cavern[0]))  for _ in range(len(cavern))]
cavernDistances[0][0] = 0

#print()
#for l in cavernDistances:
#    print(l)


updatedDistance = True
while(updatedDistance):
    updatedDistance = False
    for r in range(len(cavern)):
        for c in range(len(cavern[r])):
            if r == 0 and c == 0:#top left
                if cavernDistances[r][c] > cavernDistances[r + 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + cavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r + 1][c] + cavern[r][c], cavernDistances[r][c + 1] + cavern[r][c])
                    updatedDistance = True
                    continue
            elif r == 0 and c == len(cavern[0]) - 1:#top right
                if cavernDistances[r][c] > cavernDistances[r + 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + cavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r + 1][c] + cavern[r][c], cavernDistances[r][c - 1] + cavern[r][c])
                    updatedDistance = True
                    continue
            elif r == 0 and c != len(cavern[0]) - 1 and c != 0:#top middle
                if cavernDistances[r][c] > cavernDistances[r + 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + cavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r + 1][c] + cavern[r][c], cavernDistances[r][c + 1] + cavern[r][c], cavernDistances[r][c - 1] + cavern[r][c])
                    updatedDistance = True
                    continue
            elif r == len(cavern) - 1 and c == 0:#bottom left
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + cavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + cavern[r][c], cavernDistances[r][c + 1] + cavern[r][c])
                    updatedDistance = True
                    continue
            elif r == len(cavern) - 1 and c == len(cavern[0]) - 1:#bottom right
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + cavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + cavern[r][c], cavernDistances[r][c - 1] + cavern[r][c])
                    updatedDistance = True
                    continue
            elif r == len(cavern) - 1 and c != len(cavern[0]) - 1 and c != 0:#bottom middle
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + cavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + cavern[r][c], cavernDistances[r][c + 1] + cavern[r][c], cavernDistances[r][c - 1] + cavern[r][c])
                    updatedDistance = True
                    continue
            elif r != 0 and r != len(cavern) - 1 and c == 0:#left middle
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r + 1][c] + cavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + cavern[r][c], cavernDistances[r][c + 1] + cavern[r][c], cavernDistances[r + 1][c] + cavern[r][c])
                    updatedDistance = True
                    continue
            elif r != 0 and r != len(cavern) - 1 and c == len(cavern[0]) - 1:#right middle
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r + 1][c] + cavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + cavern[r][c], cavernDistances[r][c - 1] + cavern[r][c], cavernDistances[r + 1][c] + cavern[r][c])
                    updatedDistance = True
                    continue
            elif r != 0 and r != len(cavern) - 1 and c != 0 and c != len(cavern[0]) - 1:#middle
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r + 1][c] + cavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + cavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + cavern[r][c], cavernDistances[r][c + 1] + cavern[r][c], cavernDistances[r + 1][c] + cavern[r][c],  cavernDistances[r][c - 1] + cavern[r][c])
                    updatedDistance = True
                    continue
            else:
                print("Error")

#for l in cavernDistances:
#    print(l)
            
print("Part 1: " + str(cavernDistances[len(cavernDistances) - 1][len(cavernDistances[0]) - 1]))        

newCavern = [[0] * 5 * len(cavern) for _ in range(5 * len(cavern[0]))]

for r in range(len(newCavern)):
    for c in range(len(newCavern[0])):
        newCavern[r][c] = cavern[r % len(cavern)][c % len(cavern[0])] + r // len(cavern) + c // len(cavern[0])
        while newCavern[r][c] > 9:
            newCavern[r][c] -= 9


cavernDistances = [[10000000] * (len(newCavern[0]))  for _ in range(len(newCavern))]
cavernDistances[0][0] = 0

#print()
#for l in cavernDistances:
#    print(l)


updatedDistance = True
while(updatedDistance):
    updatedDistance = False
    for r in range(len(newCavern)):
        for c in range(len(newCavern[r])):
            if r == 0 and c == 0:#top left
                if cavernDistances[r][c] > cavernDistances[r + 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + newCavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r + 1][c] + newCavern[r][c], cavernDistances[r][c + 1] + newCavern[r][c])
                    updatedDistance = True
                    continue
            elif r == 0 and c == len(newCavern[0]) - 1:#top right
                if cavernDistances[r][c] > cavernDistances[r + 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + newCavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r + 1][c] + newCavern[r][c], cavernDistances[r][c - 1] + newCavern[r][c])
                    updatedDistance = True
                    continue
            elif r == 0 and c != len(newCavern[0]) - 1 and c != 0:#top middle
                if cavernDistances[r][c] > cavernDistances[r + 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + newCavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r + 1][c] + newCavern[r][c], cavernDistances[r][c + 1] + newCavern[r][c], cavernDistances[r][c - 1] + newCavern[r][c])
                    updatedDistance = True
                    continue
            elif r == len(newCavern) - 1 and c == 0:#bottom left
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + newCavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + newCavern[r][c], cavernDistances[r][c + 1] + newCavern[r][c])
                    updatedDistance = True
                    continue
            elif r == len(newCavern) - 1 and c == len(newCavern[0]) - 1:#bottom right
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + newCavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + newCavern[r][c], cavernDistances[r][c - 1] + newCavern[r][c])
                    updatedDistance = True
                    continue
            elif r == len(newCavern) - 1 and c != len(newCavern[0]) - 1 and c != 0:#bottom middle
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + newCavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + newCavern[r][c], cavernDistances[r][c + 1] + newCavern[r][c], cavernDistances[r][c - 1] + newCavern[r][c])
                    updatedDistance = True
                    continue
            elif r != 0 and r != len(newCavern) - 1 and c == 0:#left middle
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r + 1][c] + newCavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + newCavern[r][c], cavernDistances[r][c + 1] + newCavern[r][c], cavernDistances[r + 1][c] + newCavern[r][c])
                    updatedDistance = True
                    continue
            elif r != 0 and r != len(newCavern) - 1 and c == len(newCavern[0]) - 1:#right middle
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r + 1][c] + newCavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + newCavern[r][c], cavernDistances[r][c - 1] + newCavern[r][c], cavernDistances[r + 1][c] + newCavern[r][c])
                    updatedDistance = True
                    continue
            elif r != 0 and r != len(newCavern) - 1 and c != 0 and c != len(newCavern[0]) - 1:#middle
                if cavernDistances[r][c] > cavernDistances[r - 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c + 1] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r + 1][c] + newCavern[r][c] or cavernDistances[r][c] > cavernDistances[r][c - 1] + newCavern[r][c]:
                    cavernDistances[r][c] = min(cavernDistances[r - 1][c] + newCavern[r][c], cavernDistances[r][c + 1] + newCavern[r][c], cavernDistances[r + 1][c] + newCavern[r][c],  cavernDistances[r][c - 1] + newCavern[r][c])
                    updatedDistance = True
                    continue
            else:
                print("Error")
    
#for l in newCavern:
#    print(l)

print("Part 2: " + str(cavernDistances[len(cavernDistances) - 1][len(cavernDistances[0]) - 1])) 

