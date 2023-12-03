f = open("Day2Input.txt")

score = 0
for l in f:
    if l[0] == 'A':
        if l[2] == 'X':
            score += 1 + 3
        elif l[2] == 'Y':
            score += 2 + 6
        elif l[2] == 'Z':
            score += 3 + 0
        else:
            print("Bad 2nd input")
    elif l[0] == 'B':
        if l[2] == 'X':
            score += 1 + 0
        elif l[2] == 'Y':
            score += 2 + 3
        elif l[2] == 'Z':
            score += 3 + 6
        else:
            print("Bad 2nd input")
    elif l[0] == 'C':
        if l[2] == 'X':
            score += 1 + 6
        elif l[2] == 'Y':
            score += 2 + 0
        elif l[2] == 'Z':
            score += 3 + 3
        else:
            print("Bad 2nd input")
    else:
        print("bad 1st input")

print("Part 1: " + str(score))

f = open("Day2Input.txt")

score = 0
for l in f:
    if l[0] == 'A':
        if l[2] == 'X':
            score += 3 + 0
        elif l[2] == 'Y':
            score += 1 + 3
        elif l[2] == 'Z':
            score += 2 + 6
        else:
            print("Bad 2nd input")
    elif l[0] == 'B':
        if l[2] == 'X':
            score += 1 + 0
        elif l[2] == 'Y':
            score += 2 + 3
        elif l[2] == 'Z':
            score += 3 + 6
        else:
            print("Bad 2nd input")
    elif l[0] == 'C':
        if l[2] == 'X':
            score += 2 + 0
        elif l[2] == 'Y':
            score += 3 + 3
        elif l[2] == 'Z':
            score += 1 + 6
        else:
            print("Bad 2nd input")
    else:
        print("bad 1st input")

print("Part 2: " + str(score))