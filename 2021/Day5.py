f = open("Day5Input.txt", "r")

x1 = []
y1 = []
x2 = []
y2 = []
numLines = 0

for l in f:
    numLines += 1
    x1.append(int(l[0:l.index(',')]))
    l = l[l.index(',') + 1:]
    y1.append(int(l[0:l.index(" -> ")]))
    l = l[l.index(' -> ')+4:]

    x2.append(int(l[0:l.index(',')]))
    l = l[l.index(',')+1:]
    y2.append(int(l.strip()))

field = [ [0] * (max(x1+x2) + 1) for _ in range((max(y1+y2)+1))]


for i in range(numLines):
    if ((x1[i] == x2[i]) or (y1[i] == y2[i])):
        if (x1[i] == x2[i]):#vertical line
            for j in range(min([y1[i], y2[i]]), max([y1[i], y2[i]]) + 1):
                field[j][x1[i]] += 1
        else:#horizontal line
            for j in range(min([x1[i], x2[i]]), max([x1[i], x2[i]]) + 1):
                field[y1[i]][j] += 1

#for x in range(len(field)):
#    print(field[x])

count = 0
for i in range(len(field)):
    for j in range(len(field[i])):
        if field[i][j] > 1:
            count += 1

print("Part 1: " + str(count))

for i in range(numLines):
    if ((x1[i] != x2[i]) and (y1[i] != y2[i])):#diagonal line

        if(x1[i] < x2[i] and y1[i] < y2[i]):#top left to bottom right
            #print("one")
            for j in range(max([y1[i], y2[i]]) - min([y1[i], y2[i]]) + 1):
                field[y1[i] + j][x1[i] + j] += 1
        elif(x1[i] > x2[i] and y1[i] < y2[i]):#top right to bottom left
            #print("two")
            for j in range(max([y1[i], y2[i]]) - min([y1[i], y2[i]]) + 1):
                field[y1[i] + j][x1[i] - j] += 1
        elif(x1[i] > x2[i] and y1[i] > y2[i]):#bottom right to top left
            #print("three")
            for j in range(max([y1[i], y2[i]]) - min([y1[i], y2[i]]) + 1):
                field[y1[i] - j][x1[i] - j] += 1
        elif(x1[i] < x2[i] and y1[i] > y2[i]):#bottom left to top right
            #print("four")
            for j in range(max([y1[i], y2[i]]) - min([y1[i], y2[i]]) + 1):
                field[y1[i] - j][x1[i] + j] += 1
        else:
            continue
            #print("fail")



count = 0
for i in range(len(field)):
    for j in range(len(field[i])):
        if field[i][j] > 1:
            count += 1

#for x in range(len(field)):
#    print(field[x])

print("Part 2: " + str(count))