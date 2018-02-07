//: Playground - noun: a place where people can play

import UIKit

//Higher order function and its use case

// FILTER function : [1, 2, 3, 4, 3, 5] -> filter [3, 3] or even number like [2, 4]
let numbers = [1, 2, 3, 4, 3, 5]

var filteredArray = [Int]()
for num in numbers {
    if num == 3 {
        filteredArray.append(num)
    }
}
filteredArray

let filteredBy3 = numbers.filter({ $0 == 3 })
print(filteredBy3)

let filterEvenNum = numbers.filter({ $0 % 2 == 0})
print(filterEvenNum)



// Transformation using MAP , [1, 2, 3, 4] -> [2, 4, 6, 8]

var mappedArray = [Int]()
for num in [1, 2, 3, 4] {
    mappedArray.append(num * 2)
}
mappedArray

let mappedBy2 = [1, 2, 3, 4].map({ $0 * 2 })
print(mappedBy2)



// REDUCE function like sum:[1, 2, 3, 4] = 10 , make one value of collection

var addition = 0
for num in [1, 2, 3, 4] {
    addition += num
}
addition

let reduceFunction = [1, 2, 3, 4].reduce(0, {sum, number in sum+number })
print(reduceFunction)



