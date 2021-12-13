class BingoCard:

    def __init__(self, values):
        self.val = values

    def isWon(self):
        for r in self.val:#check horizontal
            if r.count(-1) == 5:
                #print(r)
                #print("horizontal win")
                return True
            
        for c in range(0, len(self.val[:][0])):#check vertical
            #print([row[c] for row in self.val])
            if [row[c] for row in self.val].count(-1) == 5:
                #print([row[c] for row in self.val])
                #print("vertical win")
                return True

        return False

    def callNumber(self,num):
        for r in range(0,len(self.val)):
            for c in range(0,len(self.val[r])):
                if self.val[r][c] == num:
                    self.val[r][c] = -1

    def printBoard(self):
        print(self.val)


f = open("Day4Input.txt", "r")

numbers = f.readline().strip().split(',')
for n in range(len(numbers)):
    numbers[n] = int(numbers[n])
#print(numbers)

boards = []
newBoard = []
for l in f:
    if l.strip() == '':
        continue

    line = l.strip().split(' ')
    while '' in line:
        line.remove('')
    newBoard.append(line)

    if len(newBoard) == 5:
        for r in range (len(newBoard)):
            for c in range (len(newBoard[r])):
                #print(newBoard[r][c])
                newBoard[r][c] = int(newBoard[r][c])
        boards.append(BingoCard(newBoard))
        newBoard = []

#for b in boards:
#    b.printBoard()

winnerFound = False
winningNumber = -1
winningBoard = None
for n in numbers:
    for b in boards:
        b.callNumber(n)
        if(b.isWon()):
            winnerFound = True
            winningNumber = n
            winningBoard = b
            break
    if winnerFound:
        break

boardVal = 0
for r in range(len(winningBoard.val)):
    for c in range(len(winningBoard.val[r])):
        if winningBoard.val[r][c] >= 0:
            boardVal += winningBoard.val[r][c]

boardVal *= winningNumber

print("Part 1: " + str(boardVal))


#for b in boards:
#    b.printBoard()

winningNumber = -1
winningBoard = None
for n in numbers:
    boardsToRemove = []
    for b in boards:
        b.callNumber(n)
        if(b.isWon()):
            winningNumber = n
            winningBoard = b
            boardsToRemove.append(b)
            #print(b.printBoard())
    for b in boardsToRemove:
        boards.remove(b)

boardVal = 0
for r in range(len(winningBoard.val)):
    for c in range(len(winningBoard.val[r])):
        if winningBoard.val[r][c] >= 0:
            boardVal += winningBoard.val[r][c]

boardVal *= winningNumber

#print(winningNumber)
print("Part 2: " + str(boardVal))