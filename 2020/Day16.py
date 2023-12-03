

f = open("Day16Input.txt", "r")

rules = []
for l in f:
    if l == "\n":
        break
    rules.append(l.strip())

myTicket = []