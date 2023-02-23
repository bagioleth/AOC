f = open("Day4Input.txt")

inputLines = []
for l in f:
    inputLines.append(l.strip())

counterOne = 0
counterTwo = 0
for l in inputLines:
    elfOneMin = int(l[0:l.index('-')])
    elfOneMax = int(l[l.index('-') + 1: l.index(',')])

    l = l[l.index(',') + 1:]
    
    elfTwoMin = int(l[0:l.index('-')])
    elfTwoMax = int(l[l.index('-') + 1:])

    #checks for any overlap
    if ((elfOneMin >= elfTwoMin and elfOneMin <= elfTwoMax) or (elfOneMax >= elfTwoMin and elfOneMax <= elfTwoMax) or (elfTwoMin >= elfOneMin and elfTwoMin <= elfOneMax or (elfTwoMin >= elfOneMax and elfTwoMax <= elfOneMax))):
        counterTwo += 1

    #elf One encompasses Elf two
    if elfOneMin <= elfTwoMin:
        if elfOneMax >= elfTwoMax:
            counterOne += 1
            continue

    #elf Two encompasses Elf one
    if elfTwoMin <= elfOneMin:
        if elfTwoMax >= elfOneMax:
            counterOne += 1
            continue


print("Part 1: " + str(counterOne))
print("Part 2: " + str(counterTwo))