//: Playground - noun: a place where people can play

import UIKit

func fibonacciSerices (toValue: Int) -> [Int] {
    var series = [0,1]
    if toValue <= 1 {
        return series
    }
    
    for _ in 0...toValue - 2 {
        let first = series[series.count - 2]
        let secound = series.last!
        series.append(first + secound)
    }
    return series
}

fibonacciSerices(toValue: 5)



func fibRecursion(toValue: Int, first: Int, secound: Int) -> [Int] {
    if toValue == 0 {
        return []
    }
    
    return [first + secound] + fibRecursion(toValue: toValue-1, first: secound, secound: first+secound )
}

[0, 1] + fibRecursion(toValue: 5, first: 0, secound: 1)



// 3index = 1st + 2nd
// My version
func fibonacci(value: Int) -> [Int] {
    
    var series = [Int]()
    for index in 0...value-1 {
        print(index)
        if index <= 1 {
            series.append(index)
        }
        else {
            series.append(series[index-1] + series[index-2])
        }
        
    }
    return series
}

print(fibonacci(value: 7))



