import time

f1 = open("Day1Input.txt", "r")
f2 = open("Day1Input.txt", "r")

isSolved = False
inputs = []

for l in f1:
    inputs.append(int(l))

#print(inputs)
startTime = time.time()
for n1 in inputs:
    for n2 in inputs:
        if(n1 + n2 == 2020):
            print("Part 1")
            print("number 1: " + str(n1))
            print("number 2: " + str(n2))
            print("product: " + str(n1 * n2))
            print("time: " + str((time.time() - startTime) * 1000))
            isSolved = True
            break
    if(isSolved):
        break

isSolved = False
startTime = time.time()
for n1 in inputs:
    for n2 in inputs:
        for n3 in inputs:
            if(n1 + n2 + n3 == 2020):
                print("Part 2")
                print("number 1: " + str(n1))
                print("number 2: " + str(n2))
                print("number 3: " + str(n3))
                print("product: " + str(n1 * n2 * n3))
                print("time: " + str((time.time() - startTime) * 1000))
                isSolved = True
                break
        if(isSolved):
            break
    if(isSolved):
        break

#for num1 in f1:
#    for num2 in f2:
#        print(str((int(num1) + int(num2))))
#        if ((int(num1) + int(num2)) == 2020):
#            print("number 1: " + num1)
#            print("number 2: " + num2)
#            print("product: " + str((int(num1) * int(num2))))
#            isSolved = True
#            break
#    if(isSolved):
#        break

if(isSolved == False):
    print("No Answer")