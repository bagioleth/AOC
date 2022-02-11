f = open("Day14Input.txt", 'r')

class Rule:
    def __init__(self, l, r, m) -> None:
        self.left = l
        self.right = r
        self.middle = m
        self.numUsed = 0

rules = []
sequence = []
for l in f:
    if sequence == []:
        sequence = l.strip()
    elif l.strip() == "":
        continue
    else:
        rules.append(Rule(l[0],l[1],l[6]))

numIterations = 10
for i in range(numIterations):
    newSequence = [sequence[0]]
    for j in range(1, len(sequence)):
        c1 = sequence[j - 1]
        c2 = sequence[j]

        for r in rules:#goes through rules to find the correct one
            if c1 == r.left and c2 == r.right:
                newSequence += [r.middle] + [c2]
                r.numUsed += 1
                break

    sequence = newSequence

part1 =  sequence.count(max(set(sequence), key = sequence.count)) - sequence.count(min(set(sequence), key = sequence.count))
print("Part 1: " + str(part1))


#sequence = ['C','F']
def sortFunc(r):
    return r.numUsed
rules.sort(key = sortFunc, reverse=True)
#for r in rules:
#    print(r.left + r.right + str(r.numUsed))

print(max(set(sequence), key = sequence.count))
print(min(set(sequence), key = sequence.count))

sequence = ['V','O','K','K','V','S','K','K','P','S','B','V','O','O','K','V','C','F','O','V']
numIterations = 40
for i in range(numIterations):
    print(i)
    newSequence = [sequence[0]]
    for j in range(1, len(sequence)):
        c1 = sequence[j - 1]
        c2 = sequence[j]

        for r in rules:#goes through rules to find the correct one
            if c1 == r.left and c2 == r.right:
                newSequence += [r.middle] + [c2]
                break

    sequence = newSequence

part2 =  sequence.count(max(set(sequence), key = sequence.count)) - sequence.count(min(set(sequence), key = sequence.count))
print("Part 2: " + str(part2))