nums = [2,5,1,3,4,7]
n = 3

num1 = 0
num2 = n
numTemp = 0
        
while (num1 < n):
    num1 += 1
    
    numTemp = nums[num2]
    nums[num2] = nums[num1]
    nums[num1] = numTemp
            
    if(num1 % 2 == 0):
        num2 += 1

print(nums)