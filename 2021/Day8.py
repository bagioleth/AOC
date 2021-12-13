

f = open("Day8Input.txt", "r")

count = 0
for l in f:
    l = l[l.index('|'):]
    outputValue = l.strip().split()
    for e in outputValue:
        if len(e) in [2,3,4,7]:
            count += 1

print("Part 1: " + str(count))