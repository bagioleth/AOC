import math
f = open("Day7Input.txt", "r")

crabSubs = f.readline().strip().split(',')
for e in range(len(crabSubs)):
    crabSubs[e] = int(crabSubs[e])

crabSubs.sort()
averageHPos = crabSubs[round(len(crabSubs)/2)]
#print(crabSubs)

#averageHPos = round(sum(crabSubs)/len(crabSubs))
print(averageHPos)
#print(round(50.5))
#print(round(51.5))

fuel = 0

for c in crabSubs:
    diff = c - averageHPos
    if diff > 0:
        fuel += diff
    else:
        fuel -= diff

print("Part 1: " + str(fuel))

averageHPos = crabSubs[0]
fuel = 0
bestFuel = math.inf
while True:
    fuel = 0

    for c in crabSubs:
        diff = ((abs(c - averageHPos)) * (abs(c - averageHPos) + 1))//2
        fuel += diff

    if fuel < bestFuel:
        bestFuel = fuel
        averageHPos += 1
    else:
        break

print("Part 2: " + str(bestFuel))