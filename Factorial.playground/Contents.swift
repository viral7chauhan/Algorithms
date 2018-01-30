//: Playground - noun: a place where people can play

import UIKit

func factorialOfValue(value: UInt) -> UInt {
    
    if value == 0 { return 1 }
    var product: UInt = 1
    for num in 1...value {
        product = product * num
    }
    return product
}

print(factorialOfValue(value: 8))

func recursionFactorialOfValue (value: UInt) -> UInt {
    
    if value == 0 {
        return 1
    }
    
    return value * factorialOfValue(value: value-1)
}

print(recursionFactorialOfValue(value: 8))
