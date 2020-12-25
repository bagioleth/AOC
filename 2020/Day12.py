import math as m

f = open("Day12Input.txt", "r")

longitude = 0
latitude = 0
direction = 0

for line in f:
    l = line.strip()
    if(l[0] == 'N'):
        latitude += int(l[1:])
    elif(l[0] == 'S'):
        latitude -= int(l[1:])
    elif(l[0] == 'E'):
        longitude += int(l[1:])
    elif(l[0] == 'W'):
        longitude -= int(l[1:])
    elif(l[0] == 'R'):
        direction += int(l[1:])
    elif(l[0] == 'L'):
        direction -= int(l[1:])
    elif(l[0] == 'F'):
        if(direction % 360 == 0):#east
            longitude += int(l[1:])
        elif(direction % 360 == 90):#south
            latitude -= int(l[1:])
        elif(direction % 360 == 180):#west
            longitude -= int(l[1:])
        elif(direction % 360 == 270):#north
            latitude += int(l[1:])
    
    #print(longitude)   
    #print(latitude)

print("Part 1: " + str(abs(longitude) + abs(latitude)))

f = open("Day12Input.txt", "r")

longitude = 0
latitude = 0
waypointLongitude = 10
waypointLatitude = 1
direction = 0

for line in f:
    l = line.strip()
    if(l[0] == 'N'):
        waypointLatitude += int(l[1:])
    elif(l[0] == 'S'):
        waypointLatitude -= int(l[1:])
    elif(l[0] == 'E'):
        waypointLongitude += int(l[1:])
    elif(l[0] == 'W'):
        waypointLongitude -= int(l[1:])
    elif(l[0] == 'R'):
        val = int(l[1:]) / 90
        for i in range(0, int(val)):
            temp = waypointLatitude
            waypointLatitude = -waypointLongitude
            waypointLongitude = temp
    elif(l[0] == 'L'):
        val = int(l[1:]) / 90
        for i in range(0, int(val)):
            temp = waypointLongitude
            waypointLongitude = -waypointLatitude
            waypointLatitude = temp
    elif(l[0] == 'F'):
        longitude += int(l[1:]) * waypointLongitude
        latitude += int(l[1:]) * waypointLatitude
    
    print(longitude)   
    print(latitude)

print("Part 2: " + str(abs(longitude) + abs(latitude)))