
xTargetMin = 137
xTargetMax = 171
yTargetMin = -98
yTargetMax = -73

xVel = 17#number found on paper
maxHeights = []

yStartVel = - 1 - yTargetMin 
answer = (yStartVel) * (yStartVel + 1) // 2
print("Part 1: " + str(answer))

validVels = []
for xVel in range(xTargetMax + 1):
    for yVel in range(yTargetMin - 1, -yTargetMin + 1):
        currX = 0
        currY = 0
        currXVel = xVel
        currYVel = yVel
        while currX <= xTargetMax and currY >= yTargetMin:#while it hasnt overshot

            #update xPos and xVel
            currX += currXVel
            if currXVel > 0:
                currXVel -= 1
            elif currXVel < 0:
                currXVel += 1

            #update yPos and yVel
            currY += currYVel
            currYVel -= 1

            if currX <= xTargetMax and currX >= xTargetMin and currY >= yTargetMin and currY <= yTargetMax:#valid velocity found
                validVels.append([xVel, yVel])
                break

print("Part 2: " + str(len(validVels)))