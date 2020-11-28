
class orbiter:
    orbitee = None
    name = None

f = open("Day6Input.txt", "r")

numOrbiters = 0

for x in f.readline():
    numOrbiters += 1

print("Num Orbiters: ", numOrbiters)
f.seek(0)

orbiters = [orbiter()] * numOrbiters

for x in f.readline():
    for y in x.split(")"):
        orbiters[]