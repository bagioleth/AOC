f = open("Day3Input.txt")

rucksackDups = []
for l in f:
    l=l.strip()
    rucksackDups.append(list(set(l[0:len(l)//2]).intersection(set(l[len(l)//2:])))[0])

#print(rucksackDups)

sumPriorities = 0
for i in rucksackDups:
    if ord(i) > 96:
        #print(ord(i) - 96)
        sumPriorities += (ord(i) - 96)
    else:
        #print(ord(i) - 64 + 26)
        sumPriorities += (ord(i) - 64 + 26)

print("Part 1: " + str(sumPriorities))

f = open("Day3Input.txt")

rucksacks = []
for l in f:
    rucksacks.append(l.strip())

elfBadges = []
for i in range(len(rucksacks)):
    if i%3 != 0:
        continue
    #print(set(list(rucksacks[i])))
    elfBadges.append(list((set(rucksacks[i][0:]).intersection(set(rucksacks[i+1]))).intersection(set(rucksacks[i+2])))[0])

#print(elfBadges)

sumBadges = 0
for i in elfBadges:
    if ord(i) > 96:
        #print(ord(i) - 96)
        sumBadges += (ord(i) - 96)
    else:
        #print(ord(i) - 64 + 26)
        sumBadges += (ord(i) - 64 + 26)

print("Part 2: " + str(sumBadges))