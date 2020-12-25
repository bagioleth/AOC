import time

f = open("Day7Input.txt", "r")

colors = []
colors.append("shiny gold")
isFinished = False

startTime = time.time()
while(not isFinished):
    f = open("Day7Input.txt", "r")
    isFinished = True
    for l in f:
        l = l.strip()
        for i in range(len(colors)):
            if ((colors[i] in l.split("contain")[1]) and (l.split("bags")[0].strip() not in colors)):
                colors.append(l.split("bags")[0].strip())
                isFinished = False #need to read through input again to see what bags can contain the newly added bag

print("Part 1: " + str(len(colors) - 1))
print("time: " + str((time.time() - startTime) * 1000))

bags = []
numColors = [] #reflects the number of each color is in the parent bag
colors.append("shiny gold")

class Bag:
    def __init__(self, color):
        self.color = color
        self.subBags = []
        self.numSubBags = []

    def addSubBags(self, color, number):
        self.subBags.append(color)
        self.numSubBags.append(number)

    def getNumOfBags(self):#includes itself (must subtract 1 from return value to get inner bags)
        sumBags = 1
        print("Bag Color: " + str(self.color))
        for i in range(len(self.subBags)):
            sumBags += self.numSubBags[i] * self.subBags[i].getNumOfBags()
        return sumBags



    


startTime = time.time()
bagsRemaining = [Bag("shiny gold")]
goldBag = bagsRemaining[0]
bagsToAppend = []
bagsToRemove = []

while(bagsRemaining != []):
    f = open("Day7InputTest.txt", "r")

    for l in f:#loop through file
        l = l.strip()

        for i in range(len(bagsRemaining)):
            print("Bag being found: " + str(bagsRemaining[i].color))
            if ((bagsRemaining[i].color in l.split("contains")[0])):
                print("Bag found")
                if (str("no other bags") not in l):
                    l = l.split("contain ")[1]
                    while(l != "."):
                        number = int(l.split(" ")[0])
                        l = l.split(" ", 1)[1]
                        color = l.split(" bags")[0]
                        l = l.split(" bags")[1]
                        if l[0] == ",":
                            print("another subbag found")
                            l = l.split(",")[1]

                        bagsRemaining[i].addSubBags(Bag(color), number)# sub bag not being added
                        bagsToAppend.append(Bag(color))
                
                bagsToRemove.append(bagsRemaining[i])

                for i in range(len(bagsToRemove)):
                    print("removing bag: " + str(bagsToRemove[i].color))
                    bagsRemaining.remove(bagsToRemove[i])
                bagsToRemove = []
                for i in range(len(bagsToAppend)):
                    print("adding bag: " + str(bagsToAppend[i].color))
                    bagsRemaining.append(bagsToAppend[i])
                bagsToAppend = []

print("Part 2: " + str(goldBag.getNumOfBags() - 1))
print("time: " + str((time.time() - startTime) * 1000))

