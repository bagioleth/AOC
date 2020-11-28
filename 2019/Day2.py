


for noun in range (0, 99):

    for verb in range (0, 99):
        f = open("Day2Input.txt", "r")
        array = f.readline().split(",")
        array[1] = noun
        array[2] = verb
        index = 0


        while index < len(array):
            print(array[index])
            command = int(array[index])
            if command == 99:
                break
            elif command == 1:
                #print(int(array[int(array[index + 1])]) + int(array[int(array[index + 2])]))
                array[int(array[index + 3])] = int(array[int(array[index + 1])]) + int(array[int(array[index + 2])])
            elif command == 2:
                #print(int(array[int(array[index + 1])]) * int(array[int(array[index + 2])]))
                array[int(array[index + 3])] = int(array[int(array[index + 1])]) * int(array[int(array[index + 2])])
            else:
                print("Error")


            index += 4

        if int(array[0]) == 19690720:
            print("Part 2: ")
            print(noun)
            print(verb)
            exit()

print("Part 1: ")
print(array[0])
