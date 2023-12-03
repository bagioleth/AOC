
class Card:
    def __init__(self, val):
        self.val = val
        self.nextCard = None
        
class StackOfCards:
    #acts as a queue
    def __init__(self):
        self.head = None

    def isEmpty(self):
        return (self.head == None)

    def getTopCard(self):
        #returns the top card and removes it from the stack
        if(not self.isEmpty()):
            temp = self.head
            self.head = self.head.nextCard
            return temp
        else:#returns a card with -1 val if stack is empty
            return Card(-1)

    def addCard(self, card):
        #adds the card to the bottom of the stack
        if self.head == None:
            self.head = card
        else:#finds the bottem of the stack
            tail = self.head
            while (tail.nextCard != None):
                tail = tail.nextCard
            tail.nextCard = card

#testDeck = StackOfCards()
#print(testDeck.isEmpty())
#testDeck.addCard(Card(1))
#print(testDeck.isEmpty())
#testDeck.addCard(Card(2))
#testDeck.addCard(Card(3))
#testDeck.addCard(Card(4))

#print(testDeck.getTopCard().val)
#print(testDeck.getTopCard().val)
#print(testDeck.getTopCard().val)
#print(testDeck.getTopCard().val)
#print(testDeck.getTopCard().val)

f = open("Day22Input.txt", "r")

p1Deck = StackOfCards()
p2Deck = StackOfCards()
numCards = 0

#builds the decks
for l in f:
    if "Player 1" in l:#switch deck
        deckToAddTo = p1Deck
    elif "Player 2" in l:#switch deck
        deckToAddTo = p2Deck
    elif l.strip() == "":
        continue
    else:
        deckToAddTo.addCard(Card(int(l.strip())))
        numCards += 1

while (not p1Deck.isEmpty() and not p2Deck.isEmpty()):
    p1Card = p1Deck.getTopCard()
    p2Card = p2Deck.getTopCard()
    if(p1Card.val > p2Card.val):#p1 wins the round
        #print("p1 wins the round")
        p1Deck.addCard(Card(p1Card.val))
        p1Deck.addCard(Card(p2Card.val))
    else:                       #p2 wins the round
        #print("p2 wins the round")
        p2Deck.addCard(Card(p2Card.val))
        p2Deck.addCard(Card(p1Card.val))

if(p1Deck.isEmpty()):
    print("p2 wins the game")
    winnerDeck = p2Deck
else:
    print("p1 wins the game")
    winnerDeck = p1Deck

winnerScore = 0
cardsRemaining = numCards
while(not winnerDeck.isEmpty()):
    winnerScore += winnerDeck.getTopCard().val * cardsRemaining
    cardsRemaining -= 1

print("Part 1: " + str(winnerScore))