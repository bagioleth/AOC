f = open("Day14Input.txt", "r")
instructions = []

for l in f:
    instructions.append(l.strip())

mask = ""
memLoc = 0 #memory location
val = 0 #value to be inserted

#memory = [0] * (2**32)<---friezes computer. Do not run
memory = [0] * 1000000

for l in instructions:
    if (l.split(' ')[0] == "mask"):
        mask = l.split('= ')[1]
        continue
    else:
        #print(l)
        memLoc = int(l.split("[")[1].split("]")[0])
        val = int(l.split('= ')[1])

        memory[memLoc] = val
        for c in range(len(mask)):
            if (mask[-(c + 1)] == 'X'):
                #print("x")
                continue
            else:
                #print("not x")
                valCopy = val >> (c - 0)
                if(valCopy % 2 == 1):
                    if(mask[-(c + 1)] == '0'):
                        memory[memLoc] -= 2 ** c
                else:
                    if(mask[-(c + 1)] == '1'):
                        memory[memLoc] += 2 ** c

#print(memory[:10])

print("Part 1: " + str(sum(memory)))

# function to generate all the sub lists 
def sub_lists (l): 
    base = []
    lists = [base]
    for i in range(len(l)):
        orig = lists[:]
        new = l[i]
        for j in range(len(lists)): 
            lists[j] = lists[j] + [new] 
        lists = orig + lists 
          
    return lists 

memory = []
memoryAddresses = []
memLocations = []

for l in instructions:
    if (l.split(' ')[0] == "mask"):
        mask = l.split('= ')[1]
        continue
    else:
        #print(l)
        memLoc = int(l.split("[")[1].split("]")[0])
        val = int(l.split('= ')[1])
        memLocations = []
        #memory[memLoc] = val
        for c in range(len(mask)):
            if (mask[-(c + 1)] == 'X'):#floating bit
                memLocations.append(c)
                continue
            elif(mask[-(c + 1)] == '0'):#do nothing
                continue
                #print("not x")
            else:#if "1", overwrite bit
                valCopy = memLoc >> (c - 0)
                if(valCopy % 2 == 0):
                    if(mask[-(c + 1)] == '1'):
                        memLoc += 2 ** c

        subLists = sub_lists(memLocations)
        compLists = []
        for sL in subLists:
            compLists.append(list(set(memLocations).difference(set(sL))))
        #print(subLists)
        #print(compLists)

        for i in range(len(subLists)):
            memLocCopy = memLoc
            #print(memLoc)

            #print("Test1")
            for e in range(len(subLists[i])):# sets all bits in subList to 1
                #print("Bit changed to 1: " + str(subLists[i][e]))
                if((memLocCopy >> (subLists[i][e])) % 2 == 0):
                    #print("Bit changed")
                    memLocCopy += 1 << ((subLists[i][e]))

            #print("Test2")
            #print(len(compLists[i]))
            for e in range(len(compLists[i])):#sets all bits in compList to 0
                #print("Bit changed to 0: " + str(compLists[i][e]))
                if((memLocCopy >> (compLists[i][e])) % 2 == 1):
                    #print("Bit changed")
                    #print("Bit changed to 0: " + str(compLists[i][e]))
                    memLocCopy -= 1 << ((compLists[i][e]))
      
            #print("Test3")
            #while(memLocCopy > (2 ** 32) - 1):
            #    memLocCopy = memLocCopy >> 1
            #print(memLocCopy)

            if(memLocCopy in memoryAddresses):
                #print("overwriting value")
                memory[memoryAddresses.index(memLocCopy)] = val
            else:
                #print("new value")
                memoryAddresses.append(memLocCopy)
                memory.append(val)



print("Part 2: " + str(sum(memory)))
