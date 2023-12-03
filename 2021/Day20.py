f = open("Day20Input.txt", "r")

algo = list(f.readline().strip())
f.readline()
image = []
for l in f:
    image.append(list(l.strip()))

totalIterations = 2
numIterations = 0

#add border to image 
for i in range(totalIterations):
    image = ([['.'] * len(image[0])]) + image + [['.'] * len(image[0])]#top and bottom
    for l in range(len(image)):#left and right
        image[l] = ['.'] + image[l] + ['.']




while numIterations < totalIterations:

    #calculates new image
    newImage = [ ['.']*len(image[0]) for _ in range(len(image)) ]
    for r in range(len(image)):
        for c in range(len(image[r])):
            binString = ""

            binString = image[(r-1) % len(image)][(c-1)%len(image[0])]      #top left
            binString += image[(r-1) % len(image)][c]                       #top middle
            binString += image[(r-1) % len(image)][(c+1)%len(image[0])]     #top right

            binString += image[r][(c-1)%len(image[0])]                      #middle left
            binString += image[r][c]                                        #middle middle
            binString += image[r][(c+1)%len(image[0])]                      #middle right

            binString += image[(r+1) % len(image)][(c-1)%len(image[0])]     #bottom left
            binString += image[(r+1) % len(image)][c]                       #bottom middle
            binString += image[(r+1) % len(image)][(c+1)%len(image[0])]     #bottom right

            binValue = 0
            binString = binString[::-1]#reverse binString
            for b in range(len(binString)):
                if binString[b] == '#':
                    binValue += 2 ** b

            newImage[r][c] = algo[binValue]

    

    #set old image to new image
    image = newImage
    numIterations += 1


numPixels = 0
for l in image:
    for p in l:
        if p == '#':
            numPixels += 1

print("Part 1: " + str(numPixels))
print("Part 2 takes about 15 seconds")

#f = open("Day20Input.txt", "r")

#algo = list(f.readline().strip())
#f.readline()
#image = []
#for l in f:
#    image.append(list(l.strip()))

totalIterations = 50

#add border to image 
for i in range(numIterations, totalIterations):
    if numIterations % 2 == 0:
        image = ([['.'] * len(image[0])]) + image + [['.'] * len(image[0])]#top and bottom
        for l in range(len(image)):#left and right
            image[l] = ['.'] + image[l] + ['.']
    else:
        image = ([['#'] * len(image[0])]) + image + [['#'] * len(image[0])]#top and bottom
        for l in range(len(image)):#left and right
            image[l] = ['#'] + image[l] + ['#']

while numIterations < totalIterations:

    #calculates new image
    newImage = [ ['.']*len(image[0]) for _ in range(len(image)) ]
    for r in range(len(image)):
        for c in range(len(image[r])):
            binString = ""

            binString = image[(r-1) % len(image)][(c-1)%len(image[0])]     #top left
            binString += image[(r-1) % len(image)][c]      #top middle
            binString += image[(r-1) % len(image)][(c+1)%len(image[0])]    #top right

            binString += image[r][(c-1)%len(image[0])]      #middle left
            binString += image[r][c]        #middle middle
            binString += image[r][(c+1)%len(image[0])]      #middle right

            binString += image[(r+1) % len(image)][(c-1)%len(image[0])]    #bottom left
            binString += image[(r+1) % len(image)][c]      #bottom middle
            binString += image[(r+1) % len(image)][(c+1)%len(image[0])]    #bottom right


            binValue = 0
            binString = binString[::-1]#reverse binString
            for b in range(len(binString)):
                if binString[b] == '#':
                    binValue += 2 ** b

            newImage[r][c] = algo[binValue]

    #set old image to new image
    image = newImage

    numIterations += 1


numPixels = 0
for l in image:
    for p in l:
        if p == '#':
            numPixels += 1

print("Part 2: " + str(numPixels))

