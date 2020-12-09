f = open("Day6Input.txt", "r")

sumOfCounts = 0
myList = []

for l in f:
    l = l.strip()
    if(l == ""):
        sumOfCounts += len(list(dict.fromkeys(myList)))
        myList = []
        continue
    for i in range(len(l)):
        myList.append(l[i])

print("Part 1: " + str(sumOfCounts))

#f = open("Day6InputTest.txt", "r")

#sumOfCounts = 0
#listOne = []
#listTwo = []

#print(len(list(set(['a','y','d']).intersection(['a']))))

#for l in f:
#    l = l.strip()
#    if(l == ""):
        #print(len(listOne))
#        sumOfCounts += len(listOne)
        #print("Sum: " + str(sumOfCounts))
#        listOne = []
#        continue
#    if(listOne == []):
#        for i in range(len(l)):
#            listOne.append(l[i])
#        listOne = list(dict.fromkeys(listOne))
        #print(sorted(listOne))
#    else:
#        for i in range(len(l)):
#            listTwo.append(l[i])
#        listTwo = list(dict.fromkeys(listTwo))
#        listOne = list(set(listOne).intersection(set(listTwo)))
#        listOne = list(dict.fromkeys(listOne))
        #print(sorted(listTwo))
#        listTwo = []
        #print(sorted(listOne))
        

#print("Part 2: " + str(sumOfCounts))


f = open("Day6Input.txt", "r")

sumOfCounts = 0
listOne = []
listTwo = []
isFirstPerson = True

for l in f:
    l = l.strip()
    if(l == ""):
        #print(len(listOne))
        sumOfCounts += len(listOne)
        isFirstPerson = True
        listOne = []
        continue
    if(isFirstPerson):
        isFirstPerson = False
        listOne = list(dict.fromkeys(list(l)))
        #print(sorted(listOne))
    else:
        listTwo = list(dict.fromkeys(list(l)))
        #print(sorted(listTwo))
        listOne = list(set(listOne).intersection(set(listTwo)))
        #print(sorted(listOne))

print("Part 2: " + str(sumOfCounts))