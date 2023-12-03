f = open("Day13Input.txt", 'r')

xs = []
ys = []
foldDir = []
foldAmount = []
gettingPoints = True
for l in f:
    l = l.strip()
    if l == '':
        gettingPoints = False
        continue

    if gettingPoints:
        xs.append(int(l[:l.index(',')])) 
        ys.append(int(l[l.index(',')+1:]))
    else:
        if 'x' in l:
            foldDir.append('x')
        else:
            foldDir.append('y')
        foldAmount.append(int(l[l.index('=')+1:]))

#print(xs)
#print(ys)
#print(foldDir)
#print(foldAmount)


paper = [[0] * (max(xs) + 1) for _ in range((max(ys) + 1))]

for i in range(len(xs)):
    paper[ys[i]][xs[i]] = 1

#for i in paper:
#    print(i)

for i in range(1):
    if(foldDir[i] == 'x'):#horizontal fold
        for j in range(len(paper[0]) - foldAmount[i]):
            for r in range(len(paper)):
                if paper[r][foldAmount[i] + j] == 1:
                    paper[r][foldAmount[i] - j] = 1
                    paper[r][foldAmount[i] + j] = 0
    else:#vertical fold
        for j in range(len(paper) - foldAmount[i]):
            for c in range(len(paper[0])):
                if paper[foldAmount[i] + j][c] == 1:
                    paper[foldAmount[i] - j][c] = 1
                    paper[foldAmount[i] + j][c] = 0


#print()
#for i in paper:
#    print(i)

sumDots = 0
for r in paper:
    sumDots += r.count(1)

print("Part 1: " + str(sumDots))

for i in range(1,len(foldDir)):
    if(foldDir[i] == 'x'):#horizontal fold
        for j in range(len(paper[0]) - foldAmount[i]):
            for r in range(len(paper)):
                if paper[r][foldAmount[i] + j] == 1:
                    paper[r][foldAmount[i] - j] = 1
                    paper[r][foldAmount[i] + j] = 0
    else:#vertical fold
        for j in range(len(paper) - foldAmount[i]):
            for c in range(len(paper[0])):
                if paper[foldAmount[i] + j][c] == 1:
                    paper[foldAmount[i] - j][c] = 1
                    paper[foldAmount[i] + j][c] = 0

print("Part 2: ")  

for r in range(6):
    print(paper[r][:40])