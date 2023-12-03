#game board uses spaces 1-10
#code represents these by numbers 0-9

p1Pos = 6 #player 1 Position
p2Pos = 5 #player 2 Position
p1Score = 0 #player 1 Score
p2Score = 0 #player 2 Score

dRoll = 0 #dice Roll


while True:
    #player 1 turn

    #roll Dice 3 times
    dRollTotal = (dRoll % 100) + 1 
    dRoll += 1
    dRollTotal += (dRoll % 100) + 1
    dRoll += 1
    dRollTotal += (dRoll % 100) + 1
    dRoll += 1

    #move Player 1 piece
    p1Pos += dRollTotal
    p1Pos = p1Pos % 10

    #add value to Player 1's score
    p1Score += p1Pos + 1

    #check if Player 1 wins
    if p1Score >= 1000:
        break
    
    #player 2 turn

    #roll Dice 3 times
    dRollTotal = (dRoll % 100) + 1 
    dRoll += 1
    dRollTotal += (dRoll % 100) + 1
    dRoll += 1
    dRollTotal += (dRoll % 100) + 1
    dRoll += 1

    #move Player 2 piece
    p2Pos += dRollTotal
    p2Pos = p2Pos % 10

    #add value to Player 2's score
    p2Score += p2Pos + 1

    #check if Player 2 wins
    if p2Score >= 1000:
        break

print(p1Score)
print(p2Score)
print("Part 1: " + str(dRoll * min(p1Score, p2Score)))

#reset the game

p1Pos = 3 #player 1 Position
p2Pos = 7 #player 2 Position
p1Score = 0 #player 1 Score
p2Score = 0 #player 2 Score

dRoll = 0 #dice Roll


while True:
    #player 1 turn

    #roll Dice 3 times
    dRollTotal = (dRoll % 100) + 1 
    dRoll += 1
    dRollTotal += (dRoll % 100) + 1
    dRoll += 1
    dRollTotal += (dRoll % 100) + 1
    dRoll += 1

    #move Player 1 piece
    p1Pos += dRollTotal
    p1Pos = p1Pos % 10

    #add value to Player 1's score
    p1Score += p1Pos + 1

    #check if Player 1 wins
    if p1Score >= 1000:
        break
    
    #player 2 turn

    #roll Dice 3 times
    dRollTotal = (dRoll % 100) + 1 
    dRoll += 1
    dRollTotal += (dRoll % 100) + 1
    dRoll += 1
    dRollTotal += (dRoll % 100) + 1
    dRoll += 1

    #move Player 2 piece
    p2Pos += dRollTotal
    p2Pos = p2Pos % 10

    #add value to Player 2's score
    p2Score += p2Pos + 1

    #check if Player 2 wins
    if p2Score >= 1000:
        break

print(p1Score)
print(p2Score)
print("Part 1: " + str(dRoll * min(p1Score, p2Score)))