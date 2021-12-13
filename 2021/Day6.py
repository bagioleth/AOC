f = open("Day6Input.txt", "r")

fish = f.readline().strip().split(',')
for e in range(len(fish)):
    fish[e] = int(fish[e])

#print(fish)

numIterations = 80
for i in range(numIterations):
    fishListLength = len(fish)
    for e in range(fishListLength):
        if fish[e] == 0:
            fish[e] = 6
            fish.append(8)
        else:
            fish[e] = fish[e] -1

print("Part 1: " + str(len(fish)))

f = open("Day6Input.txt", "r")

fish = f.readline().strip().split(',')
numFish = [0,0,0,0,0,0,0,0,0]
for e in range(len(fish)):
    fish[e] = int(fish[e])
    numFish[fish[e]] += 1
print(numFish)

#print(fish)

numIterations = 256
newNumFish = [0,0,0,0,0,0,0,0,0]
for i in range(numIterations):
    newNumFish = [0,0,0,0,0,0,0,0,0]
    for j in range(len(numFish) - 1):
        newNumFish[j] = numFish[j + 1]
    newNumFish[6] += numFish[0]
    newNumFish[8] = numFish[0]
    numFish = newNumFish

            
print("Part 2: " + str(sum(numFish)))