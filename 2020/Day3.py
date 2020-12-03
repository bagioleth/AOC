
f = open("Day3Input.txt", "r")


numTrees = 0
counter = 0

for l in f:
    l = l.strip()
    if (l[((3 * counter) % len(l))] == "#"):
        numTrees += 1
    counter += 1

print("Part 1:" + str(numTrees))

numOne = 0 
numTwo = numTrees
numThree = 0
numFour = 0
numFive = 0

numTrees = 0
counter = 0
f = open("Day3Input.txt", "r")

for l in f:
    l = l.strip()
    if (l[((1 * counter) % len(l))] == "#"):
        numTrees += 1
    counter += 1

numOne = numTrees
numTrees = 0
counter = 0
f = open("Day3Input.txt", "r")

for l in f:
    l = l.strip()
    if (l[((5 * counter) % len(l))] == "#"):
        numTrees += 1
    counter += 1

numThree = numTrees
numTrees = 0
counter = 0
f = open("Day3Input.txt", "r")

for l in f:
    l = l.strip()
    if (l[((7 * counter) % len(l))] == "#"):
        numTrees += 1
    counter += 1

numFour = numTrees
numTrees = 0
counter = 0
f = open("Day3Input.txt", "r")

for l in f:
    l = l.strip()
    if ((l[(int((1 * (counter/2))) % len(l))] == "#") and (counter % 2 == 0)):
        numTrees += 1
    
    counter += 1

numFive = numTrees

print(numOne)
print(numTwo)
print(numThree)
print(numFour)
print(numFive)

print("Part 2: " + str(numOne * numTwo * numThree * numFour * numFive))