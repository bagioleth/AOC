f = open("Day6Input.txt")

part1Output = -1
for l in f:
    l = l.strip()
    
    for i in range(3, len(l)):
        if (l[i] != l[i - 1] and l[i] != l[i - 2] and l[i] != l[i - 3] and l[i] != l[i - 4]) and (l[i-1] != l[i - 2] and l[i-1] != l[i - 3] and l[i-1] != l[i - 4]) and (l[i-2] != l[i - 3] and l[i-2] != l[i - 4]) and (l[i-3] != l[i - 4]):
            part1Output = i
            break

print("Part 1: " + str(part1Output))

f = open("Day6Input.txt")

part2Output = -1
for l in f:
    l = l.strip()
    
    for i in range(13, len(l)):
        #print(i)
        messageMarker = l[i - 13: i + 1]
        #determine if valid
        valid = True
        for j in range(0, len(messageMarker)):
            for k in range(j + 1, len(messageMarker)):
                if(messageMarker[k] == messageMarker[j]):
                    i = i + j
                    valid = False
                    break
            if valid == False:
                break
        if valid == True:
            part2Output = i + 1
            break



print("Part 2: " + str(part2Output))