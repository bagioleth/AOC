import time

f = open("Day2Input.txt", "r")

numValid = 0
minimum = 0
maximum = 0
counter = 0
character = ''
password = ""

startTime = time.time()
for l in f:
    minimum = int(l.split("-")[0])
    maximum = int(l.split("-")[1].split(" ")[0])
    character = l.split(" ")[1].split(":")[0]
    password = l.split(" ")[2]

    for n in range(0, len(password)):
        if (password[n] == character):
            counter += 1

    if(counter >= minimum and counter <= maximum):
        numValid += 1

    counter = 0

print("Part 1: " + str(numValid))
print("time: " + str((time.time() - startTime) * 1000))

f = open("Day2Input.txt", "r")

numValid = 0
indexOne = 0
indexTwo = 0
character = ''
password = ""

startTime = time.time()
for l in f:
    indexOne = int(l.split("-")[0]) - 1
    indexTwo = int(l.split("-")[1].split(" ")[0]) - 1
    character = l.split(" ")[1].split(":")[0]
    password = l.split(" ")[2]

    if((password[indexOne] != character and password[indexTwo] == character) or (password[indexOne] == character and password[indexTwo] != character)):
        numValid += 1


print("Part 2: " + str(numValid))
print("time: " + str((time.time() - startTime) * 1000))