

f = open("Day8Input.txt", "r")

count = 0
for l in f:
    l = l[l.index('|'):]
    outputValue = l.strip().split()
    for e in outputValue:
        if len(e) in [2,3,4,7]:
            count += 1

print("Part 1: " + str(count))  


f = open("Day8Input.txt", "r")

partTwoAnswer = 0
for l in f:
    oneSignal = set()
    twoSignal = set()
    threeSignal = set()
    fourSignal = set()
    fiveSignal = set()
    sixSignal = set()
    sevenSignal = set()
    eightSignal = set()
    nineSignal = set()
    zeroSignal = set()

    inputSignals = l[0:l.index('|')].strip().split()

    #decode 1, 4, 7, and, 8
    for s in inputSignals:
        if len(s) == 2:
            oneSignal = set(s)
        elif len(s) == 3:
            sevenSignal = set(s)
        elif len(s) == 4:
            fourSignal = set(s)
        elif len(s) == 7:
            eightSignal = set(s)

    #decode 3 (reliant on finding 1 first)
    for s in inputSignals:
        if len(s) == 5:
            if (set(s).union(oneSignal)) == set(s):#if adding set for signal one does nothing, then signal must be for 3
                threeSignal = set(s)

    nineSignal |= threeSignal
    nineSignal |= fourSignal
    zeroSignal = eightSignal - ((threeSignal - (eightSignal - fourSignal)) - oneSignal)

    
    for s in inputSignals:#decode 6
        if len(s) == 6:
            if set(s) != nineSignal and set(s) != zeroSignal:#if adding set for signal one does nothing, then signal must be for 3
                sixSignal = set(s)
                break

    fiveSignal = sixSignal - (eightSignal - nineSignal)
        
    twoSignal = eightSignal - (sixSignal.intersection(oneSignal)) - (fourSignal - threeSignal)

    #find value of output text
    outputSignals = l[l.index('|') + 1:].strip().split()
    counter = 3
    outVal = 0
    for s in outputSignals:
        #print(counter)
        if set(s) == oneSignal:
            outVal += 1 * (10 ** counter)
            counter -= 1
            #print(1)
        elif set(s) == twoSignal:
            outVal += 2 * (10 ** counter)
            counter -= 1
            #print(2)
        elif set(s) == threeSignal:
            outVal += 3 * (10 ** counter)
            counter -= 1
            #print(3)
        elif set(s) == fourSignal:
            outVal += 4 * (10 ** counter)
            counter -= 1
            #print(4)
        elif set(s) == fiveSignal:
            outVal += 5 * (10 ** counter)
            counter -= 1
            #print(5)
        elif set(s) == sixSignal:
            outVal += 6 * (10 ** counter)
            counter -= 1
            #print(6)
        elif set(s) == sevenSignal:
            outVal += 7 * (10 ** counter)
            counter -= 1
            #print(7)
        elif set(s) == eightSignal:
            outVal += 8 * (10 ** counter)
            counter -= 1
            #print(8)
        elif set(s) == nineSignal:
            outVal += 9 * (10 ** counter)
            counter -= 1
            #print(9)
        elif set(s) == zeroSignal:
            outVal += 0 * (10 ** counter)
            counter -= 1
            #print(0)
        else:
            print("unrecognized signal")
    print(outVal)
    partTwoAnswer += outVal

print("Part 2: " + str(partTwoAnswer))  


    #1 3 4 5 6 7 8 9 0



