

f = open("Day12Input.txt", "r")

paths = []
for l in f:
    l = l.strip()
    paths.append([l[:l.index('-')], l[l.index('-') + 1:]])

#for p in paths:
#    print(p)

listOfPaths = [['start']]
newPathFound = True
while newPathFound:
    newPathFound = False
    for l in listOfPaths:
        for p in paths:
            if l[-1] == 'end':
                continue
            if l[-1] == p[0]:
                if p[1].isupper():
                    newPathFound = True
                    listOfPaths.append(l + [p[1]]) #adding a uppercase cave
                    #print("1")
                else:
                    if p[1] not in l:
                        newPathFound = True
                        listOfPaths.append(l + [p[1]]) #adding a lowercase small cave that is not already on the path
                        #print("2")
                continue
            if l[-1] == p[1]:
                if p[0].isupper():
                    newPathFound = True
                    listOfPaths.append(l + [p[0]]) #adding a uppercase cave
                    #print("3")
                else:
                    if p[0] not in l:
                        newPathFound = True
                        listOfPaths.append(l + [p[0]]) #adding a lowercase small cave that is not already on the path
                        #print("4")
                continue
            

        if 'end' not in l:#removes path if hasnt reached the exit
            #print("Discarded path: " + str(l))
            listOfPaths.remove(l)

i = 0
while True:
    if i >= len(listOfPaths):
        break
    if 'end' != listOfPaths[i][-1]:
        listOfPaths.remove(listOfPaths[i])
        i -= 1
    i += 1

#for l in listOfPaths:
#    print(l)

print("Part 1: " + str(len(listOfPaths)))




listOfPaths = [['start']]
newPathFound = True
while newPathFound:
    newPathFound = False
    for l in listOfPaths:
        for p in paths:
            if l[-1] == 'end':
                continue
            if l[-1] == p[0]:
                if p[1].isupper():
                    newPathFound = True
                    listOfPaths.append(l + [p[1]]) #adding a uppercase cave
                    #print("1")
                else:
                    if p[1] not in l:
                        newPathFound = True
                        listOfPaths.append(l + [p[1]]) #adding a lowercase small cave that is on the path at most once
                        #print("2")
                    else:
                        canVisit = True
                        if p[1] == 'start':
                            canVisit = False
                        for x in l:
                            if (not x.isupper()):
                                if l.count(x) > 1:
                                    canVisit = False
                                    break
                        if canVisit:
                            listOfPaths.append(l + [p[1]]) #adding a lowercase small cave that is on the path at most once

                continue
            if l[-1] == p[1]:
                if p[0].isupper():
                    newPathFound = True
                    listOfPaths.append(l + [p[0]]) #adding a uppercase cave
                    #print("3")
                else:
                    if p[0] not in l:
                        newPathFound = True
                        listOfPaths.append(l + [p[0]]) #adding a lowercase small cave that is on the path at most once
                        #print("4")
                    else:
                        canVisit = True
                        if p[0] == 'start':
                            canVisit = False
                        for x in l:
                            if (not x.isupper()):
                                if l.count(x) > 1:
                                    canVisit = False
                                    break
                        if canVisit:
                            listOfPaths.append(l + [p[0]]) #adding a lowercase small cave that is on the path at most once
                continue
            

        if 'end' not in l:#removes path if hasnt reached the exit
            #print("Discarded path: " + str(l))
            listOfPaths.remove(l)

i = 0
while True:
    if i >= len(listOfPaths):
        break
    if 'end' != listOfPaths[i][-1]:
        listOfPaths.remove(listOfPaths[i])
        i -= 1
    i += 1

#for l in listOfPaths:
#    print(l)
print("Part 2: " + str(len(listOfPaths)))