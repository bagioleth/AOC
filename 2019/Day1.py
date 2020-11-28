

f = open("Day1Input.txt", "r")

fuel = 0
for line in f:
    fuel += int(int(line) / 3) - 2
    fuelForFuel = int(int(line) / 3) - 2
    while fuelForFuel > 0:
        fuelForFuel = int(int(fuelForFuel) / 3) - 2
        print(fuelForFuel)
        if fuelForFuel > 0:
            fuel += fuelForFuel

print ("Part two: ")
print(fuel)



