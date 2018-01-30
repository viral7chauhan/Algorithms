//: Playground - noun: a place where people can play

import UIKit

let numbers = [1, 3, 25 ,5, 6, 9, 10, 12, 15, 18, 20]

var hundred = [Int]()
for num in 1...100 {
    hundred.append(num)
}

let searchValue = 71

func binarySearchForSearchValue(searchValue: Int, array: [Int]) -> Bool {
    
    let sortedArray = array.sorted{ $0<$1 }
    var leftIndex = 0
    var rightIndex = sortedArray.count - 1
    
    while leftIndex <= rightIndex {
        let middleIndex = (leftIndex + rightIndex) / 2
        let middleValue = sortedArray[middleIndex]
        
        print("middleValue:\(middleValue), leftValue:\(sortedArray[leftIndex]), rightvalue:\(sortedArray[rightIndex]) array:[\(sortedArray[leftIndex]), \(sortedArray[rightIndex])]")
        
        if middleValue == searchValue {
            return true
        }
        
        if searchValue < middleValue {
            rightIndex = middleIndex - 1
        }
        
        if searchValue > middleValue {
            leftIndex = middleIndex + 1
        }
        
    }
    return false
}
print(binarySearchForSearchValue(searchValue: searchValue, array: hundred))


//-----------

func linearSearchFor(searchValue: Int, inArray:[Int]) -> Bool {
    for num in inArray {
        print("linearSearch CurrentValue \(num)")
        if num == searchValue {
            return true
        }
    }
    return false
}

print(linearSearchFor(searchValue: searchValue, inArray: hundred))



