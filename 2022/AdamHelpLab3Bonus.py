
#loop input until valid response
inputVal = -1
while inputVal < 0:
    inputVal = int(input("enter a non-negative integer: "))

#find highest perfect square less than or equal to input 
while(inputVal >= 0):
    if int(inputVal**(1/2))**2 == inputVal:
        print("Perfect Square Found: " + str(inputVal))
        break
    else:
        inputVal -= 1

