f = open("Day2Input.txt", "r")
depth = 0
horizontal = 0

for l in f:
    line = l.split()
    if "forward" in line:
        horizontal += int(line[1])
    elif "down" in line:
        depth += int(line[1])
    elif "up" in line:
        depth -= int(line[1])

print("Part 1: " + str(depth * horizontal))

f = open("Day2Input.txt", "r")
depth = 0
aim = 0
horizontal = 0

for l in f:
    line = l.split()
    if "forward" in line:
        horizontal += int(line[1])
        depth += (aim * int(line[1]))
    elif "down" in line:
        aim += int(line[1])
    elif "up" in line:
        aim -= int(line[1])

        
print("Part 2: " + str(depth * horizontal))