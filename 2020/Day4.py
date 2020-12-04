import re


f = open("Day4Input.txt", "r")

numValid = 0
numPassports = 0
hasBYR = False
hasIYR = False
hasEYR = False
hasHGT = False
hasHCL = False
hasECL = False
hasPID = False
hapCID = False
value = ""

for l in f:
    l = l.strip()
    if (l == ""):
        #print("test0")
        if(hasBYR and hasIYR and hasEYR and hasHGT and hasHCL and hasECL and hasPID):
            #print("Valid")
            numValid += 1
        numPassports += 1
        hasBYR = False
        hasIYR = False           
        hasEYR = False
        hasHGT = False
        hasHCL = False
        hasECL = False
        hasPID = False
        hapCID = False
        continue
    if "byr:" in l:
        hasBYR = True
    if "iyr:" in l:
        hasIYR = True
    if "eyr:" in l:
        hasEYR = True
    if "hgt:" in l:
        hasHGT = True
    if "hcl:" in l:
        hasHCL = True
    if "ecl:" in l:
        hasECL = True
    if "pid:" in l:
        hasPID = True
    if "cid:" in l:
        hasCID = True


#last passport
if(hasBYR and hasIYR and hasEYR and hasHGT and hasHCL and hasECL and hasPID):
    #print("Valid")
    numValid += 1

print("Num Passports: " + str(numPassports))
print("Part 1: " + str(numValid))

f = open("Day4Input.txt", "r")

numValid = 0
numPassports = 0
hasBYR = False
hasIYR = False
hasEYR = False
hasHGT = False
hasHCL = False
hasECL = False
hasPID = False
hapCID = False
value = ""

for l in f:
    l = l.strip()
    if (l == ""):
        #print("test0")
        if(hasBYR and hasIYR and hasEYR and hasHGT and hasHCL and hasECL and hasPID):
            #print("Valid")
            numValid += 1
        numPassports += 1
        hasBYR = False
        hasIYR = False           
        hasEYR = False
        hasHGT = False
        hasHCL = False
        hasECL = False
        hasPID = False
        hapCID = False
        continue
    if "byr:" in l:
        value = l.split("byr:")[1].split(" ")[0]
        #print("test1")
        if(int(value) >= 1920 and int(value) <=2002):
            hasBYR = True
    if "iyr:" in l:
        value = l.split("iyr:")[1].split(" ")[0]
        #print("test2")
        if(int(value) >= 2010 and int(value) <= 2020):
            hasIYR = True
    if "eyr:" in l:
        value = l.split("eyr:")[1].split(" ")[0]
        #print("test3")
        if(int(value) >= 2020 and int(value) <=2030):
            hasEYR = True
    if "hgt:" in l:
        value = l.split("hgt:")[1].split(" ")[0]
        #print("test4")
        if "cm" in value:
            value = value.split("cm")[0]
            if(int(value) >= 150 and int(value) <= 193):
                hasHGT = True
        elif "in" in value:
            value = value.split("in")[0]
            if(int(value) >= 59 and int(value) <= 76):
                hasHGT = True
    if "hcl:" in l:
        value = l.split("hcl:")[1].split(" ")[0]
        #print("test5")
        if(len(value) == 7 and re.match(r"#([0-9]|[a-f])+", value)):
            hasHCL = True
    if "ecl:" in l:
        value = l.split("ecl:")[1].split(" ")[0]
        if(value == "amb" or value == "blu" or value == "brn" or value == "gry" or value == "grn" or value == "hzl" or value == "oth"):
            #print("test6")
            hasECL = True
    if "pid:" in l:
        value = l.split("pid:")[1].split(" ")[0]
        #print("test7")
        if(len(value) == 9 and re.match(r"[0-9]+", value)):
            hasPID = True
    if "cid:" in l:
        value = l.split("cid:")[1].split(" ")[0]
        #print("test8")
        hasCID = True


#last passport
if(hasBYR and hasIYR and hasEYR and hasHGT and hasHCL and hasECL and hasPID):
    #print("Valid")
    numValid += 1

print("Part 2: " + str(numValid))