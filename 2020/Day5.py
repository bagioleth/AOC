
f = open("Day5Input.txt", "r")

seats = [[0 for x in range(8)] for y in range(128)]
#print(seats[120][2])
row = 0
col = 0

for l in f:
    #l = l.strip()
    for x in range(len(l)):
        if (l[x] == 'F'):
            if(x == len(l) - 1):    
                l = l[0:x] + '0'
            else:
                l = l[0:x] + '0' + l[x + 1:]
        elif (l[x] == 'B'):
            if(x == len(l) - 1):    
                l = l[0:x] + '1'
            else:
                l = l[0:x] + '1' + l[x + 1:]
        elif (l[x] == 'L'):
            if(x == len(l) - 1):    
                l = l[0:x] + '0'
            else:
                l = l[0:x] + '0' + l[x + 1:]
        elif (l[x] == 'R'):
            if(x == len(l) - 1):    
                l = l[0:x] + '1'
            else:
                l = l[0:x] + '1' + l[x + 1:]

    row = (int(l[0]) * 64 + int(l[1]) * 32 + int(l[2]) * 16 + int(l[3]) * 8 + int(l[4]) * 4 + int(l[5]) * 2 + int(l[6]) * 1)
    col = (int(l[7]) * 4 + int(l[8]) * 2 + int(l[9] * 1))
    seats[row][col] = 1
print(seats)

maxSid = 0
for r in range(128):
    for c in range(8):
        if(seats[r][c] == 1):
            if (r*8+c > maxSid):
                maxSid = r*8+c

print("Part 1: " + str(maxSid))


for r in range(1, 127):
    for c in range(8):
        if(seats[r][c] == 0):
            if (c == 0):
                if(seats[r - 1][7] and seats[r][1]):
                    row = r
                    col = c
                    break
            elif(c == 7):
                if(seats[r][6] and seats[r + 1][0]):
                    row = r
                    col = c
                    break
            else:
                if(seats[r][c - 1] and seats[r][c + 1]):
                    row = r
                    col = c
                    break

print(row)
print(col)
print("Part 2: " + str(row * 8 + col))