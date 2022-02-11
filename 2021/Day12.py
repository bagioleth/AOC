class cave:

    def __init__(self, n, isB) -> None:
        self.name = n
        self.connectedCaves = []
        self.isBig = isB 

class path:
    def __init__(self, cave1, cave2) -> None:
        self.caves = [cave1, cave2]

    def toString(self):
        return str(self.caves[0] + '-' + self.caves[1])

f = open("Day12Input.txt", "r")

paths = []
for l in f:
    l = l.strip()
    paths.append(path(l[:l.index('-')], l[l.index('-') + 1:]))

for p in paths:
    print(p.toString())

