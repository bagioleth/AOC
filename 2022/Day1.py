#f = open("Day1Input.txt", "a")
#f.write("\n")
#f.close()

f = open("Day1Input.txt")

ElfSupplies = []

ElfCalories = []
for l in f:
    if l.strip() == "":
        ElfSupplies.append(ElfCalories.copy())
        ElfCalories = []
    else:
        ElfCalories.append(int(l.strip()))

#print(ElfSupplies)

elfSums = []
for e in ElfSupplies:
    elfSums.append(sum(e))

#print(elfSums)
print("Part 1: " + str(max(elfSums)))

elfSums.sort()
print("Part 2: " + str(elfSums[-1] + elfSums[-2] + elfSums[-3]))