
start = 197487
end = 673251

numValid = 0

password = ""
for i in range(start, end + 1):
    password = str(i)
    testsPassed = 0

    for j in range(len(password) - 1):
        if password[j] == password[j + 1]:
            if j > 0:
                if password[j] == password[j - 1]:
                    continue
            if j < len(password) - 2:
                if password[j] == password[j + 2]:
                    continue
            testsPassed += 1
            break

    for j in range(len(password) - 1):
        if password[j] > password[j + 1]:
            break
        if j == len(password) - 2:
            testsPassed += 1
            break

    if testsPassed == 2:
        numValid += 1

print("Part 1: ", numValid)